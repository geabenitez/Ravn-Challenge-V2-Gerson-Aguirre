import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  ObjectIdentifier,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
  S3ClientConfig,
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v1 as uuid } from 'uuid';
import { AWS } from '../../config/types';

@Injectable()
export class AWSS3Service {
  private readonly logger = new Logger(AWSS3Service.name);
  private awsConfig: AWS;
  private client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.awsConfig = this.configService.get<AWS>('aws');

    const { region, accessKeyId, secretAccessKey } = this.awsConfig;
    const S3Config: S3ClientConfig = {
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    };

    // Required for development environment
    const environment = configService.get('env');
    if (environment === 'development') {
      S3Config.endpoint = 'http://chicken_stack:4566';
      S3Config.forcePathStyle = true;
    }

    this.client = new S3Client(S3Config);
  }

  async uploadFiles(
    productId: string,
    files: Express.Multer.File[],
  ): Promise<any> {
    this.logger.log(
      `Requests the upload of ${files.length} files for product with id: ${productId}`,
    );
    const bucketName = this.awsConfig.bucket;
    const uploadPromises = files.map((file) => {
      const key = `products/${productId}/${uuid()}.${
        file.mimetype.split('/')[1]
      }`;
      const uploadParams: PutObjectCommandInput = {
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
      };
      return this.client
        .send(new PutObjectCommand(uploadParams))
        .then(() => `${bucketName}/${key}`);
    });

    const uploadResults = await Promise.all(uploadPromises);

    return uploadResults;
  }

  async deleteFiles(productId: string): Promise<void> {
    this.logger.log(`Deleting objects in folder: ${productId}`);
    const bucketName = this.awsConfig.bucket;

    const listedObjects = await this.client.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: `products/${productId}/`,
      }),
    );

    if (listedObjects.Contents) {
      const objectsToDelete: ObjectIdentifier[] = listedObjects.Contents.map(
        (object) => ({ Key: object.Key }),
      );

      try {
        await this.client.send(
          new DeleteObjectsCommand({
            Bucket: bucketName,
            Delete: {
              Objects: objectsToDelete,
              Quiet: true,
            },
          }),
        );
      } catch (error) {}
    }
  }
}
