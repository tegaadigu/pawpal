"use client"; 
import React from "react";

interface AuthContextI {
    user: any;
    login: (data: LoginI) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextI | any>({});

interface AuthProviderI {
    children: React.ReactNode
}

interface LoginI {
    email?: string,
    password?: string,
    phoneNumber?: string,
}

export const AuthProvider = ({ children }: AuthProviderI) => {
    const [user, setUser] = React.useState(null);

		console.log('aye aye auth provider --->', user);

    React.useEffect(() => {
        // Fetch the current user from local storage or API
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        console.log('hey hey stored user -->', user)
      }, []);

    const loginWithPhoneNumber = React.useCallback(async (phoneNumber: string) => {

    }, []);

    const loginWithUserNameAndPassword = React.useCallback(async (email: string, password: string) => {
        
    }, [])

    const login = React.useCallback(async ({
        email,
        password,
        phoneNumber
    }: LoginI) => {
        let userObj = null;
        if(!email && !phoneNumber) {
            throw new Error('Must enter email or phone number');
        }
        try{
        if ( phoneNumber ) {
            userObj = await loginWithPhoneNumber(phoneNumber);
        } else if(email && password ){
            userObj = await loginWithUserNameAndPassword(email, password);
        }
        
        if(userObj) {
            setUser(userObj);
            localStorage.setItem('user', JSON.stringify(user));
        }} catch(e) {
            throw e;
        }
    }, [])

    const logout = React.useCallback(() => {
        setUser(null);
        localStorage.removeItem('user');
    }, [])

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextI => {
  const context = React.useContext(AuthContext);
	console.log('context over here --->', context)
  return context;
}
