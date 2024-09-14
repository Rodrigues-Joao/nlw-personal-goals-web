import { DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { CheckCircle2, Plus } from 'lucide-react'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { useQuery } from '@tanstack/react-query'
import { GetSummary } from '../http/get-summary'
import dayjs from 'dayjs'
import { PendingGoals } from './pending-goals'

export function Summary()
{
    const { data } = useQuery( {
        queryKey: ['summary'],
        queryFn: GetSummary,
        staleTime: 1000 * 60, // 60 seconds
    } )
    if ( !data )
        return
    const completedPercentage = Math.round( data?.completed * 100 / data?.total )
    const firstDayOFWeek = dayjs().startOf( 'week' ).format( 'D MMM' )
    const lastDayOFWeek = dayjs().endOf( 'week' ).format( 'D MMM' )
    return (
        <div className="flex flex-col  gap-6 py-10 max-w-[480px] px-5 mx-auto">
            <div className="flex  items-center justify-between ">
                <div className='flex items-center gap-3 '>
                    <InOrbitIcon />
                    <span >{firstDayOFWeek} - {lastDayOFWeek}</span>
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
                    <ProgressIndicator style={{ width: `${ completedPercentage }%` }} />
                </Progress>
                <div className='flex items-center justify-between text-xs text-zinc-400'>
                    <span>Você completou <span className='text-zinc-100'>{data?.completed}</span> de <span className='text-zinc-100'>{data?.total}</span> metas nessa semana.</span>
                    <span>{completedPercentage}%</span>

                </div>
                <Separator />
                <PendingGoals />
                <div className='flex flex-col gap-6' >
                    <h2 className='text-xl font-medium'>Sua semana</h2>
                    {
                        data.goalsPerDay?.map( goal =>
                        {
                            const weekDay = dayjs( goal.date ).format( 'dddd' )
                            const formattedDate = dayjs( goal.date ).format( 'D [de] MMMM' )
                            return (
                                <div key={goal.date} className='flex flex-col gap-4'>
                                    <h3 className='font-medium ' >
                                        <span className='capitalize'>
                                            {weekDay}
                                        </span>
                                        <span className='text-zinc-400 text-xs'>({formattedDate})</span>

                                    </h3>
                                    <ul className='flex flex-col gap-3'>
                                        {
                                            goal.completions.map( ( completion, index ) =>
                                            {
                                                const time = dayjs( completion.completedAt ).format( 'HH:mm' )
                                                return (
                                                    <li key={completion.id} className='flex items-center gap-2'>
                                                        <CheckCircle2 className='size-4 text-pink-500 ' />
                                                        <span className='text-sm text-zinc-400'>
                                                            Você completou "<span className='text-zinc-100'>{completion.title}</span>" às <span className='text-zinc-100'>{time}h</span>
                                                        </span>
                                                    </li>
                                                )
                                            } )
                                        }
                                    </ul>
                                </div>
                            )
                        } )
                    }
                </div>

            </div>
        </div>
    )
}