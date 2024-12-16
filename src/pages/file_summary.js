import React, { useState } from "react";
import axios from "axios";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export function File() {
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState('');
    const [filePreview, setFilePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFilePreview(event.target.result);
            };
            reader.readAsText(selectedFile);
        }
    };

    const handleFileUpload = async () => {
        if (!file) {
            alert('Please select a file first.');
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const result = await axios.post('http://127.0.0.1:8000/summary/file/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(result)
            setSummary(result.data.summary || 'No summary available');
        } catch (error) {
            console.error('Error uploading file:', error);
            setSummary('Error processing the file. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrevPage = () => {
        (pageNumber > 1) ? setPageNumber(prev => prev - 1) : setPageNumber(1)
    }


    const handleNextPage = () => {
        (pageNumber < numPages) ? setPageNumber(prev => prev + 1) : setNumPages(numPages)
    }

    return (
        <>
            <div className="container home">
                <div className="file-input">
                    <div className="input-text__area">
                        <h2 className='input-text__heading'>Choose Your file</h2>
                        <div>
                            <div>
                                {file && (
                                    <>
                                        <Document className="file-preview" file={file} onLoadSuccess={onDocumentLoadSuccess}>
                                            <Page pageNumber={pageNumber} />
                                        </Document>
                                        <div className="pages-btn">
                                            <button type="submit" className="prev" onClick={handlePrevPage}>Prev</button>
                                            <p>
                                                Page {pageNumber} of {numPages}
                                            </p>
                                            <button type="submit" className="prev" onClick={handleNextPage}>Next</button>
                                        </div>
                                    </>
                                )}
                            </div>
                            <input type="file" onChange={handleFileChange} />
                        </div>
                        <div className="submit-btn">
                            <button className="input-btn" onClick={handleFileUpload}>Summarize</button>
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
}