import React, { useEffect, useState } from "react";
const useAIQuestionGenerator = (transcript) => {
            const [aiQuestions, setAiQuestions] = useState([]);
            const [isGenerating, setIsGenerating] = useState(false);

            const newQuestions = [
                "Could you please confirm your full name?",
                "Could you please confirm your date of birth?",
                "I'll need the height and weight details for all members to be covered under this plan. Please provide them one by one",
                "Could please tell if anyone in the plan has been diagnosed with any medical conditions",
                "Has anyone been advised to undergo or has undergone hospitalization for any illness or surgery?",
                "Were there any post-surgery complications",
                "When was the last doctor consultation?",
                "Are medical reports available?"
             ];

            useEffect(() => {
                if (transcript.length >= 0 && transcript.length % 2 === 0) {
                    setIsGenerating(true);
                    setTimeout(() => {
                        console.log(newQuestions.slice(0,3))
                        setAiQuestions(newQuestions.slice(0,3));
                        setIsGenerating(false);
                    }, 2000);
                }
            }, [transcript]);

            return { aiQuestions, isGenerating };
        };

export default useAIQuestionGenerator;