'use client';

import { useState } from 'react';

const FileUploadSection = () => {
    const [files, setFiles] = useState<File[]>([]); // Typing the state as File[]
    const [errorMessage, setErrorMessage] = useState<string>(''); // Typing the error message

    // Handle file selection and validation
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;

        if (!selectedFiles) return;

        const filesArray = Array.from(selectedFiles);
        const totalSize = filesArray.reduce((acc, file) => acc + file.size, 0);

        // Check file type and total size
        const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
        const invalidFiles = filesArray.filter(file => !allowedTypes.includes(file.type));
        if (invalidFiles.length > 0) {
            setErrorMessage('Only PDF, PNG, and JPG files are allowed.');
            setFiles([]); // Reset files if there are invalid files
            return;
        }

        if (totalSize > 10 * 1024 * 1024) { // 10MB limit
            setErrorMessage('The total file size exceeds the 10MB limit. Please select smaller files.');
            setFiles([]); // Reset files if the total size exceeds the limit
        } else {
            setErrorMessage('');
            setFiles(filesArray); // Set valid files
        }
    };

    return (
        <section className="p-4">
            <h2 className="text-xl font-semibold mb-2">Supporting Documents</h2>
            <input
                type="file"
                id="uploadFiles"
                className="w-full p-2 border border-gray-300 rounded-md"
                multiple
                onChange={handleFileChange}
            />
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            <div className="mt-4">
                <h3 className="text-lg font-medium">Selected Files:</h3>
                <ul className="list-disc pl-5">
                    {files.length > 0 ? (
                        files.map((file, index) => (
                            <li key={index} className="text-gray-700">{file.name}</li>
                        ))
                    ) : (
                        <li className="text-gray-500">No files selected</li>
                    )}
                </ul>
            </div>
        </section>
    );
};

export default FileUploadSection;
