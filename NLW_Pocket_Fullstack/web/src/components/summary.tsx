import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { OutlineButton } from "./ui/outline-button";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../http/get-summary";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-BR";

dayjs.locale(ptBR); // Define o locale para PT-BR

export function Summary() {
  const { data } = useQuery({
    //maneira de identificar essa requisição de maneira única(id)
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60, //60 seconds
  });

  if (!data) {
    return null;
  }

  const firstDayOfWeek = dayjs().startOf("week").format("D MMM");
  const lastDayOfWeek = dayjs().endOf("week").format("D MMM");

  const completedPercentage = Math.round(
    (data.totalGoalsCompleted * 100) / data.totalGoals
  );

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{" "}
            <span className="text-zinc-100">{data?.totalGoalsCompleted}</span>{" "}
            de <span className="text-zinc-100">{data?.totalGoals}</span> metas
            nessa semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-3">
        <OutlineButton>
          {" "}
          <Plus className="size-4 text-zinc-600" /> Meditar
        </OutlineButton>

        <OutlineButton>
          {" "}
          <Plus className="size-4 text-zinc-600" /> Nadar
        </OutlineButton>

        <OutlineButton>
          {" "}
          <Plus className="size-4 text-zinc-600" /> Praticar exercícios
        </OutlineButton>

        <OutlineButton>
          {" "}
          <Plus className="size-4 text-zinc-600" /> Me alimentar bem
        </OutlineButton>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            Domingo{" "}
            <span className="text-zinc-400 text-xs">(10 de agosto)</span>
          </h3>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou "
                <span className="text-zinc-100">Acordar cedo</span>" às{" "}
                <span className="text-zinc-100">08:13h</span>
              </span>
            </li>

            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou "
                <span className="text-zinc-100">Acordar cedo</span>" às{" "}
                <span className="text-zinc-100">08:13h</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            Segunda-feira{" "}
            <span className="text-zinc-400 text-xs">(11 de agosto)</span>
          </h3>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou "
                <span className="text-zinc-100">Acordar cedo</span>" às{" "}
                <span className="text-zinc-100">08:13h</span>
              </span>
              {/* <span className="text-sm text-zinc-500">Desfazer</span> */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
