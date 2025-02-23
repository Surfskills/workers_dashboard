// pages/contact.tsx
'use client';
import { useState } from "react";
import ContactForm from "../components/auth/ContactForm";

const ContactPage: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingStatus, setRecordingStatus] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);

    const startRecording = () => {
        setIsRecording(true);
        setRecordingStatus("Listening...");
    };

    const stopRecording = () => {
        setIsRecording(false);
        setRecordingStatus("Processing your input...");
        // Simulate AI response
        setTimeout(() => {
            setAnalysisResult("Here’s the response from Fred’s AI Assistant!");
            setRecordingStatus(null);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <div className="max-w-6xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Form Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <ContactForm />
                </div>

                {/* AI Assistant Section */}
                <div className="p-8 md:p-12 flex flex-col items-center space-y-8 bg-gray-50 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
                        Converse with Fred&apos;s AI Assistant
                    </h2>

                    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100">
                        <div className="flex flex-col items-center space-y-6">
                            <button
                                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${isRecording
                                    ? "bg-red-500 animate-pulse shadow-red-500/50"
                                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/50"
                                    }`}
                                onClick={isRecording ? stopRecording : startRecording}
                                aria-label={isRecording ? "Stop recording" : "Start recording"}
                            >
                                <svg
                                    className="w-10 h-10 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    {isRecording ? (
                                        <rect x="6" y="6" width="8" height="8" />
                                    ) : (
                                        <circle cx="10" cy="10" r="5" />
                                    )}
                                </svg>
                            </button>

                            <div className="text-base text-gray-600 font-medium">
                                {recordingStatus || "Click to start conversation"}
                            </div>

                            {isRecording && (
                                <div className="flex items-center space-x-1 h-8">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1.5 bg-gradient-to-t from-blue-600 to-purple-600 rounded-full animate-wave"
                                            style={{
                                                height: `${Math.random() * 24 + 12}px`,
                                                animationDelay: `${i * 0.1}s`,
                                            }}
                                        />
                                    ))}
                                </div>
                            )}

                            {analysisResult && (
                                <div className="mt-6 p-6 bg-gray-50 rounded-xl w-full border border-gray-100">
                                    <h3 className="font-semibold mb-3 text-gray-900">AI Response:</h3>
                                    <p className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed">
                                        {analysisResult}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
