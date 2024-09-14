import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetPendingGoals } from "../http/get-pending-goasl";
import { CreateGoalCompletion } from "../http/create-goal-completion";
import { GetSummary } from "../http/get-summary";
import dayjs from "dayjs";
import isToday from 'dayjs/plugin/isToday'
import { useForm } from "react-hook-form";
import { z } from "zod";

dayjs.extend( isToday );


export function PendingGoals()
{


    const queryClient = useQueryClient()
    const pedingGoals = useQuery( {
        queryKey: ['peding-goals'],
        queryFn: GetPendingGoals,

    } )
    const summary = useQuery( {
        queryKey: ['summary'],
        queryFn: GetSummary,
        staleTime: 1000 * 60, // 60 seconds
    } )

    if ( !pedingGoals.data )
        return
    if ( !summary.data )
        return
    async function handleCompleteGoal( goalId: string )
    {
        await CreateGoalCompletion( goalId )

        queryClient.invalidateQueries( { queryKey: ['peding-goals'] } )
        queryClient.invalidateQueries( { queryKey: ['summary'] } )

    }


    return (
        <div className='flex gap-3 flex-wrap' >
            {
                pedingGoals.data.map( pedingGoal =>
                {
                    const goalId = pedingGoal.id;
                    const completions = summary.data.goalsPerDay?.find( goal =>
                    {

                        if ( dayjs( goal.date ).isToday() )
                            return goal.completions
                    } )
                    const hasGoal = completions?.completions.find( completion => completion.goalId === goalId )
                    const disabled = hasGoal !== undefined || pedingGoal.completationCount >= pedingGoal.desiredWeeklyFrequency


                    return (
                        <OutlineButton
                            key={pedingGoal.id}
                            disabled={disabled}
                            onClick={() => handleCompleteGoal( pedingGoal.id )}
                        >
                            <Plus className='size-4 text-zinc-600' />
                            {pedingGoal.title}
                        </OutlineButton>
                    )
                } )
            }


        </div>
    )
}