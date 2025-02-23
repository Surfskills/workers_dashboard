'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid'; // Correct path for Heroicons v2

const PortfolioSection = () => {
    const [projects, setProjects] = useState([{ title: '', description: '', link: '' }]);

    // Handle adding a new project
    const handleAddProject = () => {
        setProjects([...projects, { title: '', description: '', link: '' }]);
    };

    // Handle change in any project field
    const handleChange = (index: number, field: keyof typeof projects[0], value: string) => {
        const newProjects = [...projects];
        newProjects[index][field] = value;
        setProjects(newProjects);
    };

    // Handle removing a project
    const handleRemoveProject = (index: number) => {
        const newProjects = projects.filter((_, i) => i !== index);
        setProjects(newProjects);
    };

    return (
        <section className="space-y-4 p-4">
            <h2 className="text-2xl font-semibold">Portfolio Projects</h2>
            {projects.map((project, index) => (
                <div key={index} className="space-y-4 mb-4 border p-4 rounded-md shadow-sm">
                    {/* Project Title */}
                    <div>
                        <label htmlFor={`projectTitle-${index}`} className="block text-sm font-medium">Project Title</label>
                        <input
                            type="text"
                            id={`projectTitle-${index}`}
                            value={project.title}
                            onChange={(e) => handleChange(index, 'title', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Project Title"
                        />
                    </div>

                    {/* Project Description */}
                    <div>
                        <label htmlFor={`projectDescription-${index}`} className="block text-sm font-medium">Project Description</label>
                        <textarea
                            id={`projectDescription-${index}`}
                            rows={4}
                            value={project.description}
                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Describe the project"
                        />
                    </div>

                    {/* Project Link */}
                    <div>
                        <label htmlFor={`projectLink-${index}`} className="block text-sm font-medium">Project Link</label>
                        <input
                            type="url"
                            id={`projectLink-${index}`}
                            value={project.link}
                            onChange={(e) => handleChange(index, 'link', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="https://example.com"
                        />
                    </div>

                    {/* Remove Project Button */}
                    <button
                        type="button"
                        onClick={() => handleRemoveProject(index)}
                        className="text-red-600 mt-2 hover:text-red-800 text-sm sm:text-base"
                    >
                        Remove Project
                    </button>
                </div>
            ))}

            {/* Add More Project Button */}
            <button
                type="button"
                onClick={handleAddProject}
                className="flex items-center text-blue-600 mt-4 space-x-2 hover:text-blue-800"
            >
                <PlusIcon className="w-5 h-5" />
                <span>Add More Project</span>
            </button>
        </section>
    );
};

export default PortfolioSection;
