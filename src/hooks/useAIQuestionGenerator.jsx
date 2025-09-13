import React, { useEffect, useState } from "react";
const useAIQuestionGenerator = (transcript) => {
            const [aiQuestions, setAiQuestions] = useState([]);
            const [isGenerating, setIsGenerating] = useState(false);

            useEffect(() => {
                if (transcript.length > 0 && transcript.length % 2 === 0) {
                    setIsGenerating(true);
                    setTimeout(() => {
                        const newQuestions = [
                            "What does the pain feel like on a scale of 1 to 10?",
                            "How long has the chest pain been ongoing?",
                            "Have you ever experienced this kind of pain before?",
                            "Could you describe the sensation of shortness of breath?"
                        ];
                        setAiQuestions(newQuestions);
                        setIsGenerating(false);
                    }, 2000);
                }
            }, [transcript]);

            return { aiQuestions, isGenerating };
        };

export default useAIQuestionGenerator;