

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import removeMarkdown from 'remove-markdown';


import { GoogleGenerativeAI , HarmCategory , HarmBlockThreshold } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";

// Use the environment variable for the API key
const apiKey = "AIzaSyAZZiGYA_S9YV1e_lt3q6OzXoib9-nK3yY";


async function runChat(prompt){
    const genAI = new GoogleGenerativeAI(apiKey);
    const model  = genAI.getGenerativeModel({model: MODEL_NAME});

    const generationConfig = {
        temperature : 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens:2048,
    };

    const safetySettings = [
        {
            category:HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        },
        {
            category:HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        },
        {
            category:HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        }
    ];


    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history:[

        ],
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response.text();

    console.log(response);

    // Remove markdown formatting
    let cleanResponse = removeMarkdown(response).replace(/\*/g, '');

    // Add line breaks after sentences or specific delimiters
    cleanResponse = cleanResponse.replace(/([.?!])\s/g, '$1\n\n', '</br>'); // Adds two line breaks after each sentence
    

    // return numberedList;  // Return the numbered list
    return cleanResponse;  // Return the cleaned text with line breaks

}

export default runChat;