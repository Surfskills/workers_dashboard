'use client';

import { useState } from 'react';

const VideoIntroductionSection = () => {
    const [videoUrl, setVideoUrl] = useState<string>(''); // Video URL state
    const [videoFile, setVideoFile] = useState<File | null>(null); // Video file state
    const [errorMessage, setErrorMessage] = useState<string>(''); // Error message state

    // Handle video URL input change
    const handleVideoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVideoUrl(event.target.value);
        setErrorMessage(''); // Reset error message when URL is changed
    };

    // Handle video file upload and validation
    const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (!file) return;

        // Check file type (allow only MP3, MP4, and AAC)
        const allowedTypes = ['audio/mp3', 'video/mp4', 'audio/aac']; // Only these types are allowed
        if (!allowedTypes.includes(file.type)) {
            setErrorMessage('Only MP3, MP4, and AAC video/audio formats are allowed.');
            setVideoFile(null);
            return;
        }

        // Check file size (limit: 20MB)
        const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes
        if (file.size > maxFileSize) {
            setErrorMessage('The video/audio file size exceeds the 20MB limit. Please upload a smaller file.');
            setVideoFile(null);
            return;
        }

        // Reset error message and set the selected file
        setErrorMessage('');
        setVideoFile(file);
    };

    return (
        <section className="p-4">
            <h2 className="text-xl font-semibold mb-2">Video Introduction</h2>
            <div className="space-y-4">
                {/* Video URL Section */}
                <div>
                    <label htmlFor="videoUrl" className="block text-sm font-medium">Video URL (YouTube/Vimeo)</label>
                    <input
                        type="url"
                        id="videoUrl"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={videoUrl}
                        onChange={handleVideoUrlChange}
                    />
                </div>

                {/* Video File Upload Section */}
                <div>
                    <p className="text-sm text-gray-500">Or upload a video/audio file (optional)</p>
                    <input
                        type="file"
                        id="videoFile"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        accept="audio/mp3, video/mp4, audio/aac" // Adjusted to only accept MP3, MP4, and AAC
                        onChange={handleVideoFileChange}
                    />
                </div>

                {/* Display error messages */}
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

                {/* Display selected video file details */}
                {videoFile && !errorMessage && (
                    <div className="mt-4">
                        <h3 className="text-lg font-medium">Selected Video/Audio:</h3>
                        <p className="text-gray-700">{videoFile.name}</p>
                        <p className="text-sm text-gray-500">Size: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default VideoIntroductionSection;
