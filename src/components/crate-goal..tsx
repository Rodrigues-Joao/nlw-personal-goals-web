import { RadioGroup, RadioGroupItem, RadioGroupIndicator } from "./ui/radio-group";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateGoalRequest } from "../http/create-goal";
import { useQueryClient } from "@tanstack/react-query";

const CreateGoalFormSchema = z.object( {
    title: z.string().min( 1, 'Informe a atividade que deseja relizar!' ),
    desiredWeeklyFrequency: z.coerce.number().min( 1 ).max( 7 )
} )

type CreateGoalType = z.infer<typeof CreateGoalFormSchema>
export function CreateGoal()
{
    const queryClient = useQueryClient()
    const { control, register, handleSubmit, formState, reset } = useForm<CreateGoalType>( {
        resolver: zodResolver( CreateGoalFormSchema )
    } )
    async function handleCreateGoal( data: CreateGoalType )
    {
        const { title, desiredWeeklyFrequency } = data
        await CreateGoalRequest( {
            title,
            desiredWeeklyFrequency
        } )
        queryClient.invalidateQueries( { queryKey: ['peding-goals'] } )
        queryClient.invalidateQueries( { queryKey: ['summary'] } )
        reset()
    }
    return (
        <DialogContent>
            <div className='flex flex-col gap-6 h-full'>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center justify-between'>
                        <DialogTitle>
                            Cadastrar Meta
                        </DialogTitle>
                        <DialogClose>
                            <X className='size-5 text-zinc-600' />
                        </DialogClose>

                    </div>
                    <DialogDescription>Adicione atividades que te fazem bem e que você quer continuar praticando toda semana.</DialogDescription>
                </div>
                <form onSubmit={handleSubmit( handleCreateGoal )} className='flex-1 flex flex-col justify-between'>
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='title'>Qual a atividade?</Label>
                            <Input {...register( 'title' )} id="title" autoFocus placeholder='Praticar exercícios, nadar, etc...' />
                            {formState.errors.title && (
                                <p className="text-red-400 text-sm">{formState.errors.title.message}</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='title'>Quantas vezes na semana?</Label>
                            <Controller

                                control={control}
                                name="desiredWeeklyFrequency"
                                defaultValue={5}

                                render={( { field } ) =>
                                {
                                    return (
                                        <RadioGroup onValueChange={field.onChange} value={String( field.value )}>
                                            <RadioGroupItem value="1">
                                                <RadioGroupIndicator />
                                                <span className='text-zinc-300 text-sm font-medium leading-none'>1x na semana</span>
                                                <span className='leading-none text-lg'>🥱</span>
                                            </RadioGroupItem>
                                            <RadioGroupItem value='2'>
                                                <RadioGroupIndicator />
                                                <span className='text-zinc-300 text-sm font-medium leading-none'>2x na semana</span>
                                                <span className='leading-none text-lg'>🙂</span>
                                            </RadioGroupItem>
                                            <RadioGroupItem value="3">
                                                <RadioGroupIndicator />
                                                <span className='text-zinc-300 text-sm font-medium leading-none'>3x na semana</span>
                                                <span className='leading-none text-lg'>😎</span>
                                            </RadioGroupItem>
                                            <RadioGroupItem value="4">
                                                <RadioGroupIndicator />
                                                <span className='text-zinc-300 text-sm font-medium leading-none'>4x na semana</span>
                                                <span className='leading-none text-lg'>😜</span>
                                            </RadioGroupItem>
                                            <RadioGroupItem value="5">
                                                <RadioGroupIndicator />
                                                <span className='text-zinc-300 text-sm font-medium leading-none'>5x na semana</span>
                                                <span className='leading-none text-lg'>🤨</span>
                                            </RadioGroupItem>
                                            <RadioGroupItem value="6">
                                                <RadioGroupIndicator />
                                                <span className='text-zinc-300 text-sm font-medium leading-none'>6x na semana</span>
                                                <span className='leading-none text-lg'>🤯</span>
                                            </RadioGroupItem>
                                            <RadioGroupItem value="7">
                                                <RadioGroupIndicator />
                                                <span className='text-zinc-300 text-sm font-medium leading-none'>Todos os dias da semana</span>
                                                <span className='leading-none text-lg'>🔥</span>
                                            </RadioGroupItem>
                                        </RadioGroup>
                                    )
                                }}
                            />
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>

                        <DialogClose asChild>
                            <Button type='button' className='flex-1 ' variant='secondary'>Fechar</Button>
                        </DialogClose>
                        <Button className='flex-1 '>Salvar</Button>
                    </div>
                </form>
            </div>
        </DialogContent>
    )
}