'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const axios = require('axios')

module.exports.redirectmain = async (event, context, callback) => {

  let redirectAddress = event.path.slice(10);
  // let datastring = bodyobj.slice(10);

  let tk = "https://underdog-test-bucket-prod.s3.us-west-1.amazonaws.com/"+redirectAddress+"/image.json"

  var config = {
    method: 'get',
  maxBodyLength: Infinity,
    url: tk,
    headers: { }
  };

  let datastr = await axios(config)
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body: JSON.stringify(
      datastr.data,
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.redirectmainimg = async (event, context, callback) => {

  

  let redirectAddress = event.path.slice(9);
  // let datastring = bodyobj.slice(10);

  let tk = "https://underdog-test-bucket-prod.s3.us-west-1.amazonaws.com/"+redirectAddress+"/image.png"

  
  let imageBase64 = '';

  try {
    imageBase64 = await axios
    .get(tk, { responseType: 'arraybuffer' })
    .then((response) => Buffer.from(response.data, 'binary').toString('base64'));
    console.log('A small image successfully fetched');
  } catch (error) {
    console.error('Error fetching a small image', error);
    return reject(error);
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Content-Type": "image/png"
    },
    isBase64Encoded: true,
    body: imageBase64
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
