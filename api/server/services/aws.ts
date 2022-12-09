import * as aws from 'aws-sdk';

const dev = process.env.NODE_ENV !== 'production';

const SPACES_BUCKET = dev ? process.env.SPACES_BUCKET_DEV : process.env.SPACES_BUCKET;

aws.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
});

const ses = new aws.SES({ apiVersion: 'latest' });

export function sendEmail(options) {
  return new Promise((resolve, reject) => {
    ses.sendEmail(
      {
        Source: options.from,
        Destination: {
          CcAddresses: options.cc,
          ToAddresses: options.to,
        },
        Message: {
          Subject: {
            Data: options.subject,
          },
          Body: {
            Html: {
              Data: options.body,
            },
          },
        },
        ReplyToAddresses: options.replyTo,
      },
      (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      },
    );
  });
}

const s3 = new aws.S3({
  endpoint: process.env.SPACES_ENDPOINT,
  accessKeyId: process.env.SPACES_ACCESS_KEY,
  secretAccessKey: process.env.SPACES_SECRET_KEY,
});

export function uploadFile({ key, file }) {
  return new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: SPACES_BUCKET, // Add bucket name here
        ACL: 'public-read', // Specify whether anyone with link can access the file
        Key: key, // Specify folder and file name
        Body: file,
      },
      {
        partSize: 10 * 1024 * 1024,
        queueSize: 10,
      },
    ).send((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export function deleteFile({ key }) {
  return new Promise((resolve, reject) => {
    s3.deleteObject({
      Bucket: SPACES_BUCKET, // Add bucket name here
      Key: key, // Specify folder and file name
    }).send((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
