import React, { useState } from 'react';
import axios from 'axios';

export function Text() {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleSummary = async () => {
        setIsLoading(true);
        try {
            const result = await axios({
                method: "post",
                url: "http://127.0.0.1:8000/summary/",
                data: {
                    text: text,
                },
            });

            setSummary(result?.data?.summary || 'No summary available');
        } catch (error) {
            console.error("Error fetching summary:", error);
            setSummary("Error generating summary. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="container home">
                <div className="text-input">
                    <div className="input-text__area">
                        <h2 className='input-text__heading'>Enter Text</h2>
                        <div>
                            <textarea
                                value={text}
                                onChange={handleTextChange}
                                placeholder="Type your text here..."
                            />
                        </div>
                        <div>
                            <button className="input-btn" onClick={handleSummary}>Summarize</button>
                        </div>
                    </div>
                </div>
                <div className="text-summary">
                    <div className="text-summary__content">
                        <h2 className='input-text_heading'>Summary</h2>
                        <div className="summary-box">
                            <textarea name="" id="" placeholder='Your summary will appear here...' value={isLoading ? "Loading..." : summary} />
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};