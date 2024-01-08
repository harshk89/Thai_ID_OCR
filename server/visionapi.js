import dotenv from 'dotenv';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import fs from 'fs';

dotenv.config();

const CONFIG = {
    credentials: {
        private_key: process.env.PRIVATE_KEY.split(String.raw`\n`).join('\n'),
        client_email: process.env.CLIENT_EMAIL
    }
};

// Creates a client
const client = new ImageAnnotatorClient(CONFIG);

class CustomError extends Error {
    constructor(message, statusCode) {
      super();
      this.message = message;
      this.statusCode = statusCode || 500;
    }
}

const detectText = async (image) => {

    try {

        console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY.split(String.raw`\n`).join('\n'));
        console.log("CLIENT_EMAIL:", process.env.CLIENT_EMAIL)
        
        const index = image.indexOf("base64");
        // console.log("index: ", index);
        var newImage = image.substring(index+7);

        // console.log(newimage.substring(0,5));
        const buffer = Buffer.from(newImage, 'base64');

        // fs.writeFileSync('decoded_image.jpg', buffer);
        // console.log("buffer length: ", buffer.length)
        let [result] = await client.textDetection(buffer);
        // console.log(result);
        if(result.fullTextAnnotation === null)
            throw new CustomError("Invalid Image!, Please upload THAI NATIONAL ID CARD", 406);
        const text = result.fullTextAnnotation.text;
        // console.log(text);

        return text;
        
    } catch (error) {
        console.error('Error in visionapi: ', error);
        throw error;
    }
}

export default detectText;