import dotenv from 'dotenv';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import fs from 'fs';

dotenv.config();

const CONFIG = {
    credentials: {
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL
    }
};

// Creates a client
const client = new ImageAnnotatorClient(CONFIG);

const detectText = async (image) => {

    try {
        
        const index = image.indexOf("base64");
        // console.log("index: ", index);
        var newImage = image.substring(index+7);



        // console.log(newimage.substring(0,5));
        const buffer = Buffer.from(newImage, 'base64');

        // fs.writeFileSync('decoded_image.jpg', buffer);
        // console.log("buffer length: ", buffer.length)
        let [result] = await client.textDetection(buffer);
        const text = result.fullTextAnnotation.text;
        console.log(text);
        console.log("type: ", typeof(text));

        return text;
        
    } catch (error) {
        console.error('Error: ', error);
    }
}

// detectText(base64Image);

export default detectText;