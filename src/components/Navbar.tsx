import { useAppState } from "@/context/AppStateContext";
import { Button } from "components/ui/button";

export function Navbar() {
  const { state, setAppState } = useAppState();
  return (
    <>
      <nav className="w-full bg-[#2b2f32] flex py-9">
        <section className="mx-30 flex justify-between w-full">
          <h1 className="text-2xl font-bold text-[#ffc107]">
            {state.id === 1 ? (
              <a href="#">🎨 Galería Virtual de Arte</a>
            ) : (
              <button
                onClick={() => setAppState({ id: 1 })}
                className="cursor-pointer"
              >
                🎨 Galería Virtual de Arte
              </button>
            )}
          </h1>
          {state.id === 1 && (
            <ul className="flex justify-between">
              <li>
                <Button variant={"link"} className="text-white" asChild>
                  <a href="#">Inicio</a>
                </Button>
              </li>
              <li>
                <Button variant={"link"} className="text-white" asChild>
                  <a href="#featured-works">Obras Destacadas</a>
                </Button>
              </li>
            </ul>
          )}
        </section>
      </nav>
    </>
  );
}
