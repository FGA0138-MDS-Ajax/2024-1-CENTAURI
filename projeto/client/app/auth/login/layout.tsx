import Navbar from "@/components/Navbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen bg-custom-gradient">
            <Navbar />
            <main className="flex flex-col items-center justify-center flex-grow">
            {children}
            </main>
        </div>
    )
}

export default AuthLayout;