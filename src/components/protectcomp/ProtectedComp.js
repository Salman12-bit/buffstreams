
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProtectedComp = ({ children }) => {
    const router = useRouter();
    let auth = typeof window !== 'undefined' ? localStorage.getItem("key") : null;

    useEffect(() => {
        if (!auth) {
           
            router.push('/login');
        }
    }, [auth, router]);

    
    return auth ? <>{children}</> : null; 
};

export default ProtectedComp;
