process.env.NODE_ENV = 'production';

const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const bucket = process.env.ASSETS_S3_BUCKET;
const uploadParams = {
  Bucket: bucket,
  Key: '',
  Body: '',
  ACL: 'public-read',
  // Sets Cache-Control header and in Metadata
  CacheControl: 'public, max-age=31536000',
};
const projectName = require(path.join(process.cwd(), 'package.json')).name;
const base_dir = './build/assets';

if (!bucket) {
  console.error('ASSETS_S3_BUCKET is empty. Exiting.');
  process.exit(1);
}

fs.readdir(base_dir, (err, files) => {
  files.forEach((file) => {
    const fileStream = fs.createReadStream(path.join(base_dir, file));
    fileStream.on('error', (err) => {
      console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = `${projectName}/assets/${file}`;

    // Sets Content-Type header and in Metadata
    const type = mime.getType(file);
    if (type) {
      uploadParams.ContentType = type;
    }
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.log('Error', err);
      }
      if (data) {
        console.log('Upload Success', data.Location);
      }
    });
  });
});
