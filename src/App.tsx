import "./index.css";
import { Navbar } from "components/Navbar";
import { Homepage } from "components/Homepage";
import { Footer } from "components/Footer";
import { useAppState } from "./context/AppStateContext";
import { ArtWorkDetail } from "components/ArtWorkDetail";

export function App() {
  const { state } = useAppState();

  function RenderElement({ renderState }: { renderState: number }) {
    // here are magic numbers/state have to be change later
    switch (renderState) {
      case 1:
        return (
          <main className="grid min-h-screen grid-rows-[auto_1fr_auto]">
            <Navbar />
            <Homepage />
            <Footer />
          </main>
        );
      case 2:
        return (
          <main className="grid min-h-screen grid-rows-[auto_1fr_auto]">
            <Navbar />
            <ArtWorkDetail id={state.artwork_id} />
            <Footer />
          </main>
        );

      default:
        return (
          <main className="grid min-h-screen items-center justify-center">
            <h1>404 No Defined</h1>
          </main>
        );
    }
  }

  return (
    <>
      <RenderElement renderState={state.id} />
    </>
  );
}

export default App;
