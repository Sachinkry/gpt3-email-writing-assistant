// import 'Configuration' and  'OpenAIApi' classes from openai-api
import { Configuration, OpenAIApi } from "openai";

// create a new instance of the Configuration class by passing api key as an argument
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

// create a new instance of the OpenAIApi class to create an interface to the OpenAI API
// this provides access to all the api endpoints/methods
const openai = new OpenAIApi(configuration);

const basePromptPrefix = `You are an email writer bot, who writes email with the given properties on a subject. The email should contain\n1. A new clear subject line that accurately reflects the content of the email.\n2. A professional greeting.\n3. The main body of the email, which provides the necessary information or details in a logical and easy-to-follow manner.\n4. Provide a little more information on the main body with bullet points.\n5. A call to action, asking the recipient to reply or providing them with next steps, then a closing\nAdditionally, a good email should be well-written and free of grammar and spelling errors. It should also be formatted in a way that is easy to read, with appropriate use of paragraphs, bullet points, and other formatting tools as needed. Do a sentiment analysis of the email.\n`;

const generateAction = async (req, res) => {
    // run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)
    
    // calls the createCompletion method specifying the model, prompt, temperature and max tokens to use and 
    // then sends the request to the openai api
    const baseCompletion = await openai.createCompletion({
        model: `text-davinci-003`,
        prompt: `${basePromptPrefix}${req.body.userInput}`,
        temperature: 0.7,
        max_tokens: 410,
    });
    console.log("success: fdf", baseCompletion.data);

    // get the last element from choices array of the data object returned from the api
    const basePromptOutput = baseCompletion.data.choices.pop();

    // this sends a Json formatted response to the client
    res.status(200).json({ output: basePromptOutput });
}

export default generateAction;