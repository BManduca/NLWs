import { X } from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "./ui/radio-group";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerGoal } from "../http/register-goal";
import { useQueryClient } from "@tanstack/react-query";

const registerGoalForm = z.object({
  title: z.string().min(1, "Informe a atividade que deseja realizar"),
  /*
    o value para o desiredWeeklyFrequency, 
    como é um check-box, 'chegara' como uma string
    e para ressolver isso, usaremos o z.coerce.number, pois, desta
    forma, não interessa se chegar como uma string, o mesmo será convertido.
  */
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

type RegisterGoalForm = z.infer<typeof registerGoalForm>;

export function RegisterGoal() {
  const queryClient = useQueryClient();
  /*
    register -> serve para registrar quais campos farão parte do formulario
    control -> forma de controlar o formulario como um todo, ou seja, todas as 
    formulas do form, estão dentro do control
  */
  const { register, control, handleSubmit, formState, reset } =
    useForm<RegisterGoalForm>({
      resolver: zodResolver(registerGoalForm),
    });

  async function handleRegisterGoal(data: RegisterGoalForm) {
    await registerGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    });

    queryClient.invalidateQueries({
      queryKey: ["summary"],
    });

    queryClient.invalidateQueries({
      queryKey: ["pending-goals"],
    });

    reset();
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(handleRegisterGoal)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, Meditar, etc..."
                {...register("title")}
              />

              {/* 
                no react quando temos um if aonde nao tem o else, vai ter
                somente o then no caso, usamos dois &, deta forma so vai executar o que
                vier depois dos &&, se caso a validacao anterior for verdadeira.
              */}
              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Quantas vezes na semana?</Label>
              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                /*
                  campos do render:
                  formState -> para buscar dados do meu formulário
                  fieldState -> buscar informações do campo especifico como o desiredWeeklyFrequency e 
                  por exemplo, informações como valor atual, se ele esta com erro ou não...
                  field -> da acesso para modificar o valor do campo de maneira manual.
                */
                defaultValue={1}
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <RadioGroupItem value="1">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          1x na semana
                        </span>
                        <span className="text-lg leading-none">🥱</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="2">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          2x na semana
                        </span>
                        <span className="text-lg leading-none">🙂</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="3">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          3x na semana
                        </span>
                        <span className="text-lg leading-none">😎</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="4">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          4x na semana
                        </span>
                        <span className="text-lg leading-none">😜</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="5">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          5x na semana
                        </span>
                        <span className="text-lg leading-none">🤨</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="6">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          6x na semana
                        </span>
                        <span className="text-lg leading-none">🤯</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="7">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          Todos os dias da semana
                        </span>
                        <span className="text-lg leading-none">🔥</span>
                      </RadioGroupItem>
                    </RadioGroup>
                  );
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" className="flex-1" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
            <Button className="flex-1">Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
