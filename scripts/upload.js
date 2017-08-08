'use strict';
process.env.NODE_ENV = 'production';

const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

let s3 = new AWS.S3({apiVersion: '2006-03-01'});
let env = process.env.FLM_ENV
let uploadParams = {Bucket: '', Key: '', Body: ''};
let project_name = require(path.join(process.cwd(), 'package.json')).name;
let base_dir = './build/assets';
console.log(process.cwd(), project_name);

if (!env) {
  env = "local";
  console.log("FLM_ENV is empty, setting to 'local'.");
}

switch (env) {
  case "development":
    uploadParams.Bucket = "assets.dev.flmcloud.net";
    break;
  case "staging":
    uploadParams.Bucket = "assets.staging.flmcloud.net";
    break;
  case "local":
    uploadParams.Bucket = "assets.test.flmcloud.net";
    break;
  case "test":
    uploadParams.Bucket = "assets.test.flmcloud.net";
    break;
  case "production":
    uploadParams.Bucket = "assets.prod.flmcloud.net";
    break;
  default:
    console.error("FLM_ENV is empty. Exiting.");
    break;
}

fs.readdir(base_dir, (err, files) => {
  files.forEach(file => {
    let fileStream = fs.createReadStream(path.join(base_dir, file));
    fileStream.on('error', function(err) {
      console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = `${project_name}/${file}`;
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } if (data) {
        console.log("Upload Success", data.Location);
      }
    });
  });
})
