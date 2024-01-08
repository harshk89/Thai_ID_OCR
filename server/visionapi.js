import dotenv from 'dotenv';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import fs from 'fs';

dotenv.config();

const CONFIG = {
    credentials: {
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDQZcYpPU15nm+f\nYFgNqL8eaYsoy3GhXqoyo0P5YRlHOsreQ+3ld6iaCfH5NB4A0PFjoLHXj2gQPWSI\nyB8BfNbJ3zEjBv4Sw4+rxnHxbQbOShOboT5/MIsGAuGlUfU51qsMYsLZ7E6AhaZk\nvV2JpGLpDDPHFZdk6oWjg90V6dVKXELxqbaG8P8qtevHdgETFTuh8MPKo9yK2ryX\nmDW/gLkOFxCl/DvKvgrsQJwuxKvkOMoeN0smWtPoZJ/uZe6eJV2und13Hlb8Wko/\nF9x6NNKGJTls3k7tYpsDMjrc0JsE+ZwJ3kMsOyPwcyYmqe8BmN939D1cBas6KIXc\n43AVksulAgMBAAECggEAT/UMj9wWcrhISZUUk8EP+yIxo2hTY7/He4BK307S/RJg\nreDQUP+VL+zq61uEu3lvdHM+aN975Oc5QIXP56k3W+MHnlHbf+WKpTSRmTjkqJeh\naE/4g6JjZN4MJ3sHpLZpkGoAKs7Q29zrl7FURzBMRvBImXT+TljxB2jblcHO9SU5\nla0ZlkTvKNtXoqO9l8UixYjI0OXFwUxkQ03nJ41Ygq+i+7mmHMSFY3HM7t+7bM7W\nrAYjWs7skIW8MWNr/44Qg+dw3xnuSZ3vU/wxXPcmXRpHw94UkEWu/l0tJ5trRGcA\nrm8fyRjEgksFYpU/MBeVleRMcMGsqqU/zwbTATKZ7QKBgQDyH9o7tcjcjtnuHWr6\n1qGbDPoFNTXjMP35QbuFWkg9+I4+nH4MJMzouh6xqiXJBSWNN9quZhCwK3X4qQs8\n6n6mjGuPHlOjX0SDW30KObu9SQPechwPbnYJBg81/+eq40ulcXvui3gunHMbCORe\nbakqsEzp/eOYpl91VvIlbcmd2wKBgQDcVx9/1Ryi87dAxF3/KlUUMzsylrTWREmU\n3MncG5Y/KKHmReusePyQsKY0GV4ke2vbsYuAfUaXxAkWBzlOj1XL5JJYYTalckMA\nUhVIzrIVL3DHQJ891SyyhtJ+GZKF/J4+Nrr760po4ZyemgDhnWL3znILnJ9itVKD\nT4TYBIc0fwKBgHNUis4gU/IDNXl/l8Kt08KYVst+QhHa907waZMmovyp1Y+rWTsN\nmHFOnmpAQslS40U2Ers5sL9JpGLymoDErdlFT8KXTn2mVms/e/sP7wZFrksaDZWo\nJx87PKmbIM28gP7oZIEG/BMvwIBjJux3zbmgyrI2ll/S9+tbo/ICLqQ7AoGAD0AY\ndgiSCtVDgcAVoWuUp+lD16SGr63aSeteLVXbeFOfoQiF31IgaQNQ/Zoj4fKI7JPF\nTAdfs3FmD5hAZyeUkKApYOSZm6nk6UjFIFzuBnlaHPBkFSuEBHdAamnqskthyHyR\nRI5sgAXdiTyvgu4Zw30Od69HeNWD+IKwdyMZGJECgYAdHkRDdgj5Jc/7fyftgOnF\nF7M0KMRf1ozQM69MJDX8N8PyS3H/n8aiXStn+JglwwMJZvx/qVrFCtZZdDcybIbV\nCkAQKs172FK0Bg+7kHY06zuW75g5P4lW0vE21+uuywHrAIWREZJRaApv4TXWwO0i\nlmojj7TlyEQnmvgzz98o+Q==\n-----END PRIVATE KEY-----\n",
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
        var newKey = process.env.PRIVATE_KEY.split(String.raw`\n`).join('\\n')
        console.log("PRIVATE_KEY:", "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDQZcYpPU15nm+f\nYFgNqL8eaYsoy3GhXqoyo0P5YRlHOsreQ+3ld6iaCfH5NB4A0PFjoLHXj2gQPWSI\nyB8BfNbJ3zEjBv4Sw4+rxnHxbQbOShOboT5/MIsGAuGlUfU51qsMYsLZ7E6AhaZk\nvV2JpGLpDDPHFZdk6oWjg90V6dVKXELxqbaG8P8qtevHdgETFTuh8MPKo9yK2ryX\nmDW/gLkOFxCl/DvKvgrsQJwuxKvkOMoeN0smWtPoZJ/uZe6eJV2und13Hlb8Wko/\nF9x6NNKGJTls3k7tYpsDMjrc0JsE+ZwJ3kMsOyPwcyYmqe8BmN939D1cBas6KIXc\n43AVksulAgMBAAECggEAT/UMj9wWcrhISZUUk8EP+yIxo2hTY7/He4BK307S/RJg\nreDQUP+VL+zq61uEu3lvdHM+aN975Oc5QIXP56k3W+MHnlHbf+WKpTSRmTjkqJeh\naE/4g6JjZN4MJ3sHpLZpkGoAKs7Q29zrl7FURzBMRvBImXT+TljxB2jblcHO9SU5\nla0ZlkTvKNtXoqO9l8UixYjI0OXFwUxkQ03nJ41Ygq+i+7mmHMSFY3HM7t+7bM7W\nrAYjWs7skIW8MWNr/44Qg+dw3xnuSZ3vU/wxXPcmXRpHw94UkEWu/l0tJ5trRGcA\nrm8fyRjEgksFYpU/MBeVleRMcMGsqqU/zwbTATKZ7QKBgQDyH9o7tcjcjtnuHWr6\n1qGbDPoFNTXjMP35QbuFWkg9+I4+nH4MJMzouh6xqiXJBSWNN9quZhCwK3X4qQs8\n6n6mjGuPHlOjX0SDW30KObu9SQPechwPbnYJBg81/+eq40ulcXvui3gunHMbCORe\nbakqsEzp/eOYpl91VvIlbcmd2wKBgQDcVx9/1Ryi87dAxF3/KlUUMzsylrTWREmU\n3MncG5Y/KKHmReusePyQsKY0GV4ke2vbsYuAfUaXxAkWBzlOj1XL5JJYYTalckMA\nUhVIzrIVL3DHQJ891SyyhtJ+GZKF/J4+Nrr760po4ZyemgDhnWL3znILnJ9itVKD\nT4TYBIc0fwKBgHNUis4gU/IDNXl/l8Kt08KYVst+QhHa907waZMmovyp1Y+rWTsN\nmHFOnmpAQslS40U2Ers5sL9JpGLymoDErdlFT8KXTn2mVms/e/sP7wZFrksaDZWo\nJx87PKmbIM28gP7oZIEG/BMvwIBjJux3zbmgyrI2ll/S9+tbo/ICLqQ7AoGAD0AY\ndgiSCtVDgcAVoWuUp+lD16SGr63aSeteLVXbeFOfoQiF31IgaQNQ/Zoj4fKI7JPF\nTAdfs3FmD5hAZyeUkKApYOSZm6nk6UjFIFzuBnlaHPBkFSuEBHdAamnqskthyHyR\nRI5sgAXdiTyvgu4Zw30Od69HeNWD+IKwdyMZGJECgYAdHkRDdgj5Jc/7fyftgOnF\nF7M0KMRf1ozQM69MJDX8N8PyS3H/n8aiXStn+JglwwMJZvx/qVrFCtZZdDcybIbV\nCkAQKs172FK0Bg+7kHY06zuW75g5P4lW0vE21+uuywHrAIWREZJRaApv4TXWwO0i\nlmojj7TlyEQnmvgzz98o+Q==\n-----END PRIVATE KEY-----\n");
        console.log("newKey", newKey);
        console.log("CLIENT_EMAIL:", CONFIG.credentials.client_email);
        if(newKey === CONFIG.credentials.private_key)
            console.log("same");
        else
            console.log("different");
        
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