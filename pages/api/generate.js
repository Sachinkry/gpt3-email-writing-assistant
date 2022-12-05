// import 'Configuration' and  'OpenAIApi' classes from openai-api
import { Configuration, OpenAIApi } from "openai";

// create a new instance of the Configuration class by passing api key as an argument
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

// create a new instance of the OpenAIApi class to create an interface to the OpenAI API
// this provides access to all the api endpoints/methods
const openai = new OpenAIApi(configuration);

const basePromptPrefix = "";
const generateAction = async (req, res) => {
    // run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    // calls the createCompletion method specifying the model, prompt, temperature and max tokens to use and 
    // then sends the request to the openai api
    const baseCompletion = await openai.createCompletion({
        model: `text-davinci-003`,
        prompt: `${basePromptPrefix}${req.body.userInput}`,
        temperature: 0.7,
        max_tokens: 250,
    });

    // get the last element from choices array of the data object returned from the api
    const basePromptOutput = baseCompletion.data.choices.pop();

    // this sends a Json formatted response to the client
    res.status(200).json({ output: basePromptOutput });
}

export default generateAction;