import React from 'react'

const CookiesPolicy: React.FC = () => {
    return (
        <div className="max-w-screen-md mx-auto px-4 py-8 text-gray-800">
            <h1 className="text-3xl font-bold text-center mb-6">Cookies Policy</h1>
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">1. Introduction</h2>
                <p>
                    This Cookies Policy explains how I use cookies and similar technologies to collect information when you visit our website.
                </p>

                <h2 className="text-2xl font-semibold">2. What Are Cookies?</h2>
                <p>
                    Cookies are small text files stored on your device that help us provide a better user experience.
                </p>

                <h2 className="text-2xl font-semibold">3. Types of Cookies We Use</h2>
                <p>
                    I use the following types of cookies:
                </p>
                <ul className="list-disc pl-5">
                    <li>Essential Cookies: Necessary for website functionality.</li>
                    <li>Performance Cookies: Help us analyze website traffic.</li>
                    <li>Functional Cookies: Allow us to remember your preferences.</li>
                </ul>

                <h2 className="text-2xl font-semibold">4. Managing Cookies</h2>
                <p>
                    You can manage your cookie preferences in your browser settings. However, disabling cookies may affect the functionality of some website features.
                </p>

                <h2 className="text-2xl font-semibold">5. Changes to This Policy</h2>
                <p>
                    I may update this Cookies Policy from time to time. Please check this page periodically for changes.
                </p>

                <h2 className="text-2xl font-semibold">6. Contact Us</h2>
                <p>
                    If you have any questions regarding this Cookies Policy, please contact me at ojjfred@gmail.com
                </p>
            </section>
        </div>
    )
}

export default CookiesPolicy
