import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { getPendingGoals } from "../http/get-pending-goals";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createGoalCompletion } from "../http/create-goal-completion";

export function PendingGoals() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    //maneira de identificar essa requisição de maneira única(id)
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, //60 seconds
  });

  if (!data) {
    return null;
  }

  /*
    Padrão pessoal - Ao ser relizado alguma ação através/apartir do usuário,
    é iniciado o nome da function com handle
  */
  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId);

    queryClient.invalidateQueries({
      queryKey: ["summary"],
    });

    queryClient.invalidateQueries({
      queryKey: ["pending-goals"],
    });
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            {" "}
            <Plus className="size-4 text-zinc-600" /> {goal.title}
          </OutlineButton>
        );
      })}
    </div>
  );
}
