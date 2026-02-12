const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    console.log("Fetching available models...");
    try {
        // Note: The SDK might not expose listModels directly on the main class in all versions,
        // but typically it's under the model manager or confirmed via documentation.
        // However, for this SDK version, we might have to just try/catch or assume standard ones.
        // Actually, looking at the error message: "Call ListModels to see the list..."
        // The node SDK doesn't always have a direct listModels helper exposed easily in the main entry.
        // Let's try to use the model, if it fails we see the error.
        // But we CAN'T easily list models with the high-level SDK sometimes. 
        // Let's try a direct REST call if SDK fails, but let's try to instantiate a model and see.

        // Actually, asking the model to generate content is what we are doing.
        // Let's try to fetch a known working legacy model like 'gemini-pro'.

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello");
        console.log("gemini-pro works:", result.response.text());
    } catch (error) {
        console.error("Error with gemini-pro:", error.message);
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello");
        console.log("gemini-1.5-flash works:", result.response.text());
    } catch (error) {
        console.error("Error with gemini-1.5-flash:", error.message);
    }
}

listModels();
