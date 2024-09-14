import logo from "./assets/logo-in-orbit.svg";
import letsStart from "./assets/lets-start-illustration.svg";
import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";

export function App() {
  return (
    // JSX JavaScript XML -> HTML

    /*
      flex => define como um ítem será posicionado no espaço 
      disponível dentro de seu container
    */

    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="Logo da aplicação in.orbit" />
      <img src={letsStart} alt="imagem página inicial aplicação in.orbit" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>

      <Button>
        <Plus className="size-4" />
        Cadastrar meta
      </Button>
    </div>
  );
}
