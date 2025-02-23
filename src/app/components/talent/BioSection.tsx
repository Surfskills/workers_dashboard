'use client';
// components/recommendations/BioSection.tsx

const BioSection = () => {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Personal Bio</h2>
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Your First Name"
                />
            </div>
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium">Second Name</label>
                <input
                    type="text"
                    id="secondName"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Second Name"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Email Address"
                />
            </div>
        </section>
    );
};

export default BioSection;
