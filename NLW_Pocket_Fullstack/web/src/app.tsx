import { Dialog } from "./components/ui/dialog";
import { RegisterGoal } from "./components/register-goal";
import { Summary } from "./components/summary";
// import { EmptyGoals } from "./components/empty-goals";

export function App() {
  return (
    <Dialog>
      {/* <EmptyGoals /> */}
      <Summary />
      <RegisterGoal />
    </Dialog>
  );
}
