import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import exp from 'constants';


const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY, 
});



export default google;