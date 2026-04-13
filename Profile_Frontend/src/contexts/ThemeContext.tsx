import {createContext, useContext, useState, useEffect, ReactNode} from 'react';

interface ThemeContextType{
    lightMode: boolean;
    toggleTheme:()=> void;
}

const ThemeContext= createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({children}: {children: ReactNode}){
    const [lightMode, setLightMode]= useState(()=>{
        const saved= localStorage.getItem('lightMode');
        return saved=== 'true';
    });

    useEffect(()=>{
        if(lightMode){
            document.documentElement.classList.add('light');
        }else{
            document.documentElement.classList.remove('light');
        }
        localStorage.setItem('lightMode', String(lightMode));

    }, [lightMode]);

    const toggleTheme=()=>{
        setLightMode(prev=> !prev);
    };

    return(
        <ThemeContext.Provider value={{lightMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
    


export function useTheme(){
    const context= useContext(ThemeContext);
    if(context=== undefined){
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}