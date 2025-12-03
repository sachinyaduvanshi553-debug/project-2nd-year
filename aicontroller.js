const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

exports.predictDisease = async (req, res) => {
    try {
        const { message } = req.body;

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an AI medical assistant. Never give dangerous advice. Provide possible disease predictions and safe suggestions."
                },
                {
                    role: "user",
                    content: message
                }
            ]
        });

        res.json({
            reply: completion.choices[0].message.content
        });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "AI error", details: error });
    }
};
