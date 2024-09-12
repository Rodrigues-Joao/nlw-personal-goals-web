import { DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { CheckCircle2, Plus } from 'lucide-react'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { OutlineButton } from './ui/outline-button'
export function Summary()
{
    return (
        <div className="flex flex-col  gap-6 py-10 max-w-[480px] px-5 mx-auto">
            <div className="flex  items-center justify-between ">
                <div className='flex items-center gap-3 '>
                    <InOrbitIcon />
                    <span>5 a 10 de agosto</span>
                </div>
                <DialogTrigger asChild>
                    <Button size='sm'>
                        <Plus className='size-4' />
                        Cadastrar meta
                    </Button>
                </DialogTrigger>
            </div>
            <div className='flex flex-col gap-3'>
                <Progress max={15} value={3}>
                    <ProgressIndicator style={{ width: "50 %" }} />
                </Progress>
                <div className='flex items-center justify-between text-xs text-zinc-400'>
                    <span>Você completou <span className='text-zinc-100'>8</span> de <span className='text-zinc-100'>15</span> metas nessa semana.</span>
                    <span>50%</span>

                </div>
                <Separator />
                <div className='flex gap-3 flex-wrap' >
                    <OutlineButton>
                        <Plus className='size-4 text-zinc-600' />
                        Meditar
                    </OutlineButton>
                    <OutlineButton>
                        <Plus className='size-4 text-zinc-600' />
                        Meditar
                    </OutlineButton>
                    <OutlineButton>
                        <Plus className='size-4 text-zinc-600' />
                        Meditar
                    </OutlineButton>
                    <OutlineButton>
                        <Plus className='size-4 text-zinc-600' />
                        Meditar
                    </OutlineButton>
                    <OutlineButton>
                        <Plus className='size-4 text-zinc-600' />
                        Exercício
                    </OutlineButton>
                </div>
                <div className='flex flex-col gap-36' >
                    <h2 className='text-xl font-medium'>Sua semana</h2>
                    <div className='flex flex-col gap-4'>
                        <h3 className='font-medium' >Domingo <span className='text-zinc-400 text-xs'>(10 de setembro)</span>

                        </h3>
                        <ul className='flex flex-col gap-3'>
                            <li className='flex items-center gap-2'>
                                <CheckCircle2 className='size-4 text-pink-500 ' />
                                <span className='text-sm text-zinc-400'>
                                    Você completou "<span className='text-zinc-100'>Acordar cedo</span>" às <span className='text-zinc-100'>08:13h</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}