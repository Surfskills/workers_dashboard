
import Header from "../components/layout/Header";


export default function ServicesLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Header /> {/* Logo component on top left */}
            <main className="flex-grow">{children}</main> {/* Main content */}
        </>
    );
}
