import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../Utils/firebase-config'

export const AuthContext = createContext([])

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('No hay auth provider')
    return context
}

// proveedor
export const AuthProvider = ({ children }) => {
    // estados
    const [user, setUser] = useState({ email: 'Invitado', password: 'Invitado' })
    const [loading, setLoading] = useState(true) //inicialmente esta cargando

    const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const logOut = () => {
        signOut(auth);
        // al hacer el logout, el usuario pasa a ser "Invitado"
        setUser({ email: 'Invitado', password: 'Invitado' });
    };

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser == null) setUser({ email: 'Invitado', password: 'Invitado' })
            setLoading(false);
        });
        return () => unsuscribe();
    }, []);

    return <AuthContext.Provider value={{ signUp, login, user, logOut, loading }}>
        {/* componentes adentro del provider, o sea los consultores */}
        {children}
    </AuthContext.Provider>;
}