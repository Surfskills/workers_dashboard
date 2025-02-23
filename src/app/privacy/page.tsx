'use client';
import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="max-w-screen-md mx-auto px-4 py-8 text-gray-800">
            <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">1. Introduction</h2>
                <p>
                    I value your privacy and am committed to protecting your personal data. This Privacy Policy explains how I collect, use, and disclose your information when you visit my website.
                </p>

                <h2 className="text-2xl font-semibold">2. Information I Collect</h2>
                <p>
                    I may collect personal information such as your name, email address, and usage data through forms, cookies, and analytics tools.
                </p>

                <h2 className="text-2xl font-semibold">3. How I Use Your Information</h2>
                <p>
                    I use your information to improve my website, provide customer support, and send you updates or marketing materials.
                </p>

                <h2 className="text-2xl font-semibold">4. Data Security</h2>
                <p>
                    I implement industry-standard security measures to protect your personal information, but no method of transmission over the internet is 100% secure.
                </p>

                <h2 className="text-2xl font-semibold">5. Your Rights</h2>
                <p>
                    You have the right to access, correct, or delete your personal data. If you wish to exercise these rights, please contact me.
                </p>

                <h2 className="text-2xl font-semibold">6. Changes to This Policy</h2>
                <p>
                    I may update this Privacy Policy from time to time. I encourage you to review it periodically.
                </p>

                <h2 className="text-2xl font-semibold">7. Contact Me</h2>
                <p>
                    If you have any questions or concerns regarding this Privacy Policy, please contact me at ojjfred@gail.com.
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
