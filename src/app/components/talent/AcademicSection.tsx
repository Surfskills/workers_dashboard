'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid'; // Correct path for Heroicons v2

const AcademicSection = () => {
    const [qualifications, setQualifications] = useState([{ degree: '', institution: '', year: '' }]);

    // Handle adding a new qualification
    const handleAddQualification = () => {
        setQualifications([...qualifications, { degree: '', institution: '', year: '' }]);
    };

    // Handle changes in the fields of each qualification
    const handleChange = (index: number, field: keyof typeof qualifications[0], value: string) => {
        const newQualifications = [...qualifications];
        newQualifications[index][field] = value;
        setQualifications(newQualifications);
    };

    // Handle removing a qualification
    const handleRemoveQualification = (index: number) => {
        const newQualifications = qualifications.filter((_, i) => i !== index);
        setQualifications(newQualifications);
    };

    return (
        <section className="p-4">
            <h2 className="text-xl font-semibold mb-2">Academic & Training Qualifications</h2>
            {qualifications.map((qualification, index) => (
                <div key={index} className="space-y-4 mb-4">
                    {/* Degree or Certification */}
                    <div>
                        <label htmlFor={`degree-${index}`} className="block text-sm font-medium">Degree or Certification</label>
                        <input
                            type="text"
                            id={`degree-${index}`}
                            value={qualification.degree}
                            onChange={(e) => handleChange(index, 'degree', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Degree or Certification"
                        />
                    </div>

                    {/* Institution Name */}
                    <div>
                        <label htmlFor={`institution-${index}`} className="block text-sm font-medium">Institution Name</label>
                        <input
                            type="text"
                            id={`institution-${index}`}
                            value={qualification.institution}
                            onChange={(e) => handleChange(index, 'institution', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Institution Name"
                        />
                    </div>

                    {/* Year of Completion */}
                    <div>
                        <label htmlFor={`year-${index}`} className="block text-sm font-medium">Year of Completion</label>
                        <input
                            type="number"
                            id={`year-${index}`}
                            value={qualification.year}
                            onChange={(e) => handleChange(index, 'year', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Year of Completion"
                        />
                    </div>

                    {/* Remove Qualification Button */}
                    <button
                        type="button"
                        onClick={() => handleRemoveQualification(index)}
                        className="text-red-600 mt-2 text-sm sm:text-base hover:text-red-800"
                    >
                        Remove Qualification
                    </button>
                </div>
            ))}

            {/* Add More Qualification Button */}
            <button
                type="button"
                onClick={handleAddQualification}
                className="flex items-center text-blue-600 mt-4 space-x-2 hover:text-blue-800"
            >
                <PlusIcon className="w-5 h-5" />
                <span>Add More Qualification</span>
            </button>
        </section>
    );
};

export default AcademicSection;
