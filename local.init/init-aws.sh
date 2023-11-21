#!/bin/bash

# Variables
bucket_name=$AWS_BUCKET_NAME
region=$AWS_REGION

# Create the S3 Bucket
echo "Creating S3 bucket with name: $bucket_name"
awslocal s3api create-bucket --bucket $bucket_name --region $region

# Define the public access policy
policy='{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadForGetBucketObjects",
            "Effect": "Allow",
            "Principal": "*",
            "Action": ["s3:GetObject", "s3:GetObjectVersion"],
            "Resource": ["arn:aws:s3:::'"$bucket_name"'/*"]
        }
    ]
}'

# Apply the public access policy to the bucket
echo "Setting bucket policy to make it public"
awslocal s3api put-bucket-policy --bucket $bucket_name --policy "$policy"
