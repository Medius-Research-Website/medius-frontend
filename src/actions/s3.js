import axios from 'axios';
const ROOT_URL = 'http://localhost:9090/api';


function getSignedRequest(file) {
    const fileName = encodeURIComponent(file.name);
    // hit our own server to get a signed s3 url
    console.log('getSigned', fileName);
    return axios.get(`${ROOT_URL}/sign-s3?file-name=${fileName}&file-type=${file.type}`);
}

// return a promise that uploads file directly to S3
// note how we return the passed in url here rather than any return value
// since we already know what the url will be - just not that it has been uploaded
function uploadFileToS3(signedRequest, file, url) {
    return new Promise((fulfill, reject) => {
      axios.put(signedRequest, file, { headers: { 'Content-Type': file.type } }).then((response) => {
        console.log(response)
        console.log(url)
        fulfill(url);
      }).catch((error) => {
        console.log(error)
        reject(error);
      });
    });
}

// THIS IS THE ONLY FUNCTION YOU SHOULD CALL - THE OTHER TWO ARE HELPERS
export function uploadFile(file) {
  // returns a promise so you can handle error and completion in your component
  return getSignedRequest(file).then((response) => {
    console.log('uploadfine', response)
      return uploadFileToS3(response.data.signedRequest, file, response.data.url);
  });
}
