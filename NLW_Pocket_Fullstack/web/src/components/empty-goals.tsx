import logo from "../assets/logo-in-orbit.svg";
import letsStart from "../assets/lets-start-illustration.svg";
import { DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export function EmptyGoals() {
  return (
    /*
      flex => define como um ítem será posicionado no espaço 
      disponível dentro de seu container
    */
    // JSX JavaScript XML -> HTML
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="Logo da aplicação in.orbit" />
      <img src={letsStart} alt="imagem página inicial aplicação in.orbit" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  );
}
