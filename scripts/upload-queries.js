process.env.NODE_ENV = 'production';

const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const queriesBucket = process.env.QUERIES_S3_BUCKET;
const persist = process.env.PERSIST_QUERIES === 'true';
const uploadParams = {
  Bucket: queriesBucket,
  Key: '',
  Body: '',
  ACL: 'public-read',
  // Sets Cache-Control header and in Metadata
  CacheControl: 'public, max-age=31536000',
};
const baseDir = './build/queries';

if (!persist) {
  console.error('Persist queries turned off. Exiting.');
  process.exit(0);
}

if (!queriesBucket) {
  console.error('QUERIES_S3_BUCKET is empty. Exiting.');
  process.exit(1);
}

fs.readdir(baseDir, (err, files) => {
  if (!files || files.length < 1) return;

  files.forEach((file) => {
    const fileStream = fs.createReadStream(path.join(baseDir, file));
    fileStream.on('error', (err) => {
      console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    // FIXME: remove STATIC_QUERY_SUFFIX when the following is resolved:
    // https://github.com/facebook/relay/pull/2641
    uploadParams.Key = `queries/${file}${process.env.STATIC_QUERY_SUFFIX}`;

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
        console.log('Queries upload Success', data.Location);
      }
    });
  });
});
