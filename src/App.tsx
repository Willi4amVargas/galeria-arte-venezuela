import "./index.css";
import { Navbar } from "components/Navbar";
import { Homepage } from "components/Homepage";
import { Footer } from "components/Footer";

export function App() {
  return (
    <>
      <main className="grid min-h-screen grid-rows-[auto_1fr_auto]">
        <Navbar />
        <Homepage />
        <Footer />
      </main>
    </>
  );
}

export default App;
