import Image from 'next/image';
import Link from 'next/link';

export default function ServicesLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {/* Logo Component on Top Left */}
            <div className="sticky top-0 z-50 bg-white shadow-md" style={{ height: '70px' }}>
                <div className="max-w-7xl mx-auto px-4 flex items-center h-full">
                    <Link href="/" aria-label="Remote-CTIO Home" className="flex items-center">
                        {/* Logo */}
                        <Image src="/logo.svg" alt="Remote-CTIO Logo" width={24} height={24} priority />
                        {/* Logo Text */}
                        <span className="ml-2 text-sm font-bold sm:text-base bg-clip-text text-transparent bg-gradient-to-r from-black via-blue-700 to-blue-500">
                            Remote-CTIO
                        </span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow">{children}</main>
        </>
    );
}
