import { API_ENDPOINTS } from './constants';
class CoverLetterService {
    static async generate(vacancy, resume) {
        try {
            const response = await fetch(API_ENDPOINTS.OPENROUTER, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": window.location.origin,
                    "X-Title": "HR Job Bot"
                },
                body: JSON.stringify({
                    model: "anthropic/claude-3.5-sonnet",
                    max_tokens: 1000,
                    messages: [
                        {
                            role: "system",
                            content: "You are a professional HR assistant helping to write cover letters."
                        },
                        {
                            role: "user",
                            content: `Create a professional cover letter for this job:

JOB: ${vacancy.title} at ${vacancy.company}
Requirements: ${vacancy.requirements.join(', ')}
Description: ${vacancy.description}

CANDIDATE'S RESUME:
${resume}

Write a compelling 200–300 word cover letter that highlights relevant experience and skills. Return only the letter text.`
                        }
                    ]
                })
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error.message);

            // OpenRouter возвращает контент как data.choices[0].message.content
            return data.choices?.[0]?.message?.content || "No content returned";
        } catch (error) {
            throw new Error("Failed to generate cover letter: " + error.message);
        }
    }
}

export default CoverLetterService;

// class CoverLetterService {
//     static async generate(vacancy, resume) {
//         try {
//             const response = await fetch(
//                 // API_ENDPOINTS.ANTHROPIC,
//                 API_ENDPOINTS.OPENROUTER,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     model: "claude-sonnet-4-20250514",
//                     max_tokens: 1000,
//                     messages: [{
//                         role: "user",
//                         content: `Create a professional cover letter for this job:
//
// JOB: ${vacancy.title} at ${vacancy.company}
// Requirements: ${vacancy.requirements.join(', ')}
// Description: ${vacancy.description}
// ....
