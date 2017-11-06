'use strict';
process.env.NODE_ENV = 'production';

const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

let s3 = new AWS.S3({apiVersion: '2006-03-01'});
let bucket = process.env.ASSETS_S3_BUCKET;
let uploadParams = { Bucket: bucket, Key: '', Body: '', ACL: 'public-read' };
let projectName = require(path.join(process.cwd(), 'package.json')).name;
let base_dir = './build/assets';

if (!bucket) {
  console.error("ASSETS_S3_BUCKET is empty. Exiting.");
  process.exit(1)
}

fs.readdir(base_dir, (err, files) => {
  files.forEach(file => {
    let fileStream = fs.createReadStream(path.join(base_dir, file));
    fileStream.on('error', function(err) {
      console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = `${projectName}/assets/${file}`;

    let type = mime.getType(file);
    if (type) {
      uploadParams.ContentType = type;
    }
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } if (data) {
        console.log("Upload Success", data.Location);
      }
    });
  });
})
