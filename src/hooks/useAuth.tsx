import { useEffect, useState } from "react";

export default function useAuth() {
    const [session, setSession] = useState<string | null>(null);

    const updateSession = () => {
        const localstorageSession = localStorage.getItem('Session');
        if (!localstorageSession) {
            setSession(null);
        } else {
            setSession(localstorageSession);
        }
    };

    useEffect(() => {
        // Update session on component mount
        updateSession();

        // Set up storage event listener to track changes to localStorage
        const handleStorageChange = () => {
            console.log('updated storage')
            updateSession();
        };

        window.addEventListener('storage', handleStorageChange);
        console.log(session)

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // Empty dependency array means this effect only runs once on mount
    console.log(session)
    return [session];
}
