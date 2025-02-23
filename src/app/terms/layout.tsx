'use client';
import React from 'react';
import localFont from 'next/font/local';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../globals.css';

// Load fonts with 'display: swap' to avoid flashes of unstyled text
const geistSans = localFont({
    src: '../fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
    display: 'swap',
});

const geistMono = localFont({
    src: '../fonts/GeistMonoVF.woff', // Correct path
    variable: '--font-geist-mono',
    weight: '100 900',
    display: 'swap',
});

export default function DashboardLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className={`antialiased h-full flex flex-col ${geistSans.variable} ${geistMono.variable}`} style={{ fontFamily: `'Geist Sans', sans-serif, 'Geist Mono', monospace` }}>
            <Header /> {/* Custom header component */}
            <main className="min-h-screen bg-gray-50 flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children} {/* Main content */}
                </div>
            </main>
            <Footer /> {/* Custom footer component */}
        </div>
    );
}
