import { useEffect, useState } from "react";

import { Dialog } from "./components/ui/dialog";
import { RegisterGoal } from "./components/register-goal";
import { Summary } from "./components/summary";
import { EmptyGoals } from "./components/empty-goals";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "./http/get-summary";

export function App() {
  const { data } = useQuery({
    //maneira de identificar essa requisição de maneira única(id)
    queryKey: ["summary"],
    queryFn: getSummary,
    /* 
      vai permanecer o resultado dessa query em cache por 60 segundos, ou seja,
      se na aplicação, for preciso desses dados em algum outro momento dentro de 60s, 
      não vai buscar no back e sim vai retornar esses mesmos dados e assim evita fazer outra requisição.
    */
    staleTime: 1000 * 60, //60 seconds
  });

  return (
    <Dialog>
      {data?.totalGoals && data.totalGoals > 0 ? <Summary /> : <EmptyGoals />}
      <RegisterGoal />
    </Dialog>
  );
}
