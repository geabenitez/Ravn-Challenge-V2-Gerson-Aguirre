export type SimpleResponse = {
  id?: string;
  message: string;
};

export type AWS = {
  accessKeyId: string;
  secretAccessKey: string;
  accountId: string;
  region: string;
  bucket: string;
};

export type MAILER = {
  port: number;
  host: string;
  user: string;
  pass: string;
};

export type JWT = {
  secret: string;
  expiration: string;
};
