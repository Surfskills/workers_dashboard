// 'use client';

// import { useState } from 'react';
// import BioSection from './BioSection';
// import FileUploadSection from './FileUpload';
// import VideoIntroductionSection from './VideoIntroduction';
// import PortfolioSection from './PortfolioProjects';
// import SpecialtySection from './SpecialtySection';
// import SubmitButton from './SubmitButton';

// const submitForm = async (data: any) => {
//     const response = await fetch('/submit_bio/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });

//     if (response.ok) {
//         alert('Your data has been submitted successfully!');
//     } else {
//         alert('There was an error submitting the form.');
//     }
// };

// type PortfolioProject = {
//     title: string;
//     description: string;
//     link: string;
// };

// type SpecialtyData = {
//     specialty: string;
//     how_to: string;
//     tools: string[];
//     steps: string[];
// };

// const FormComponent = () => {
//     const [bioData, setBioData] = useState({
//         first_name: '',
//         second_name: '',
//         email: '',
//     });
//     const [files, setFiles] = useState<File[]>([]);
//     const [videoUrl, setVideoUrl] = useState('');
//     const [videoFile, setVideoFile] = useState<File | null>(null);
//     const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([
//         { title: '', description: '', link: '' },
//     ]);
//     const [specialtyData, setSpecialtyData] = useState<SpecialtyData>({
//         specialty: '',
//         how_to: '',
//         tools: [],
//         steps: [],
//     });

//     // Handle changes to Bio data
//     const handleBioChange = (field: string, value: string) => {
//         setBioData({ ...bioData, [field]: value });
//     };

//     // Handle file selection
//     const handleFileChange = (newFiles: File[]) => {
//         setFiles(newFiles);
//     };

//     // Handle video URL input change
//     const handleVideoUrlChange = (url: string) => {
//         setVideoUrl(url);
//     };

//     // Handle video file change
//     const handleVideoFileChange = (file: File | null) => {
//         setVideoFile(file);
//     };

//     // Handle portfolio project changes
//     const handlePortfolioChange = (index: number, field: keyof PortfolioProject, value: string) => {
//         const updatedProjects = [...portfolioProjects];
//         updatedProjects[index][field] = value;
//         setPortfolioProjects(updatedProjects);
//     };

//     // Add new project to portfolio
//     const handleAddProject = () => {
//         setPortfolioProjects([...portfolioProjects, { title: '', description: '', link: '' }]);
//     };

//     // Handle changes to specialty data
//     const handleSpecialtyChange = (specialty: string, howTo: string, tools: string[], steps: string[]) => {
//         setSpecialtyData({ specialty, how_to: howTo, tools, steps });
//     };

//     // Handle form submission
//     const handleSubmit = () => {
//         const formData = {
//             bio: bioData,
//             files,
//             videoUrl,
//             videoFile,
//             portfolio: portfolioProjects,
//             specialty: specialtyData,
//         };
//         submitForm(formData);
//     };

//     return (
//         <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
//             <BioSection bioData={bioData} onBioChange={handleBioChange} />
//             <FileUploadSection onFileChange={handleFileChange} />
//             <VideoIntroductionSection 
//                 videoUrl={videoUrl} 
//                 videoFile={videoFile} 
//                 onVideoUrlChange={handleVideoUrlChange} 
//                 onVideoFileChange={handleVideoFileChange} 
//             />
//             <PortfolioSection 
//                 portfolioProjects={portfolioProjects} 
//                 onPortfolioChange={handlePortfolioChange} 
//                 onAddProject={handleAddProject} 
//             />
//             <SpecialtySection onSpecialtyChange={handleSpecialtyChange} />
//             <SubmitButton onClick={handleSubmit} />
//         </form>
//     );
// };

// export default FormComponent;
