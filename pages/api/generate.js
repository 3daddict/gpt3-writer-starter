import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = "I'm looking to create a profile summary of my skills or interests. I am interested in ";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log({
    prompt: `${basePromptPrefix}${req.body.userInput}.\nTone: write the summary in a ${req.body.tone} tone.\nLength: write a summary that is ${req.body.length} words long.\n\nSummary:`
  })

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}.\nTone: write the summary in a ${req.body.tone} tone.\nLength: write a summary that is ${req.body.length} words long.\n\nSummary:`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;