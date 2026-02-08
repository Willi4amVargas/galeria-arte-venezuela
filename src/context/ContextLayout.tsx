import type { ReactNode } from "react";
import { ArtProvider } from "./ArtContext";
import { AppStateProvider } from "./AppStateContext";

// This component is used for controll all context there are needed in all page
export function ContextLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppStateProvider>
        <ArtProvider>{children}</ArtProvider>
      </AppStateProvider>
    </>
  );
}
