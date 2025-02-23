'use client';

import { useState } from 'react';

interface SpecialtySectionProps {
    onSpecialtyChange: (specialty: string, howTo: string, tools: string[], steps: string[]) => void;
}

const SpecialtySection: React.FC<SpecialtySectionProps> = ({ onSpecialtyChange }) => {
    const [specialty, setSpecialty] = useState('');
    const [howTo, setHowTo] = useState('');
    const [tools, setTools] = useState<string[]>([]);
    const [steps, setSteps] = useState<string[]>(['']);

    const handleSpecialtyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpecialty(event.target.value);
    };

    const handleHowToChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHowTo(event.target.value);
    };

    const handleToolsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTool = event.target.value;
        if (newTool && !tools.includes(newTool)) {
            setTools([...tools, newTool]);
        }
    };

    const handleStepChange = (index: number, value: string) => {
        const updatedSteps = [...steps];
        updatedSteps[index] = value;
        setSteps(updatedSteps);
    };

    const handleAddStep = () => {
        setSteps([...steps, '']);
    };

    const handleSubmitSpecialty = () => {
        onSpecialtyChange(specialty, howTo, tools, steps);
    };

    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Specialty Information</h2>
            <div>
                <label htmlFor="specialty" className="block text-sm font-medium">What is your specialty?</label>
                <input
                    type="text"
                    id="specialty"
                    value={specialty}
                    onChange={handleSpecialtyChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Your specialty"
                />
            </div>

            <div>
                <label htmlFor="howTo" className="block text-sm font-medium">How do you do it?</label>
                <textarea
                    id="howTo"
                    value={howTo}
                    onChange={handleHowToChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Describe how you go about doing it."
                />
            </div>

            <div>
                <label htmlFor="tools" className="block text-sm font-medium">Tools you use</label>
                <input
                    type="text"
                    id="tools"
                    onBlur={handleToolsChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter a tool and press enter"
                />
                <div className="mt-2">
                    {tools.length > 0 ? (
                        <ul>
                            {tools.map((tool, index) => (
                                <li key={index} className="p-1">{tool}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tools added yet.</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium">Steps involved</label>
                {steps.map((step, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                        <input
                            type="text"
                            value={step}
                            onChange={(e) => handleStepChange(index, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder={`Step ${index + 1}`}
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddStep}
                    className="text-blue-600 hover:text-blue-800 mt-2"
                >
                    Add More Steps
                </button>
            </div>

            <button
                type="button"
                onClick={handleSubmitSpecialty}
                className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
            >
                Submit Specialty Information
            </button>
        </section>
    );
};

export default SpecialtySection;
