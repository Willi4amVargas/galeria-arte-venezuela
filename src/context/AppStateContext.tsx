import { createContext, useContext, useState, type ReactNode } from "react";

//Not the best way to manage state without react router
interface IStateParams {
  id: number;
  [key: string]: any;
}

export const AppStateContext = createContext<{
  state: IStateParams;
  setAppState: (value: IStateParams) => void;
}>({
  state: { id: 1 },
  setAppState: (value: IStateParams) => {},
});

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [appState, setAppState] = useState<IStateParams>({ id: 1 });

  return (
    <AppStateContext value={{ state: appState, setAppState }}>
      {children}
    </AppStateContext>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);

  if (!context)
    throw new Error("useAppState must be used within a appStateProvider");

  return context;
};
