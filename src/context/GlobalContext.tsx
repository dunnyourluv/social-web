import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
} from "react";

interface GlobalContextType {
    useTheme: () => [string | null, Dispatch<SetStateAction<string | null>>];
}

export const GlobalContext = createContext<GlobalContextType>({
    useTheme: () => [null, () => {}],
});

function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<string | null>(null);
    const useTheme = (): [
        string | null,
        Dispatch<SetStateAction<string | null>>,
    ] => [theme, setTheme];

    return (
        <GlobalContext.Provider value={{ useTheme }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;
