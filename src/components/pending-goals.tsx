import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { useQuery } from "@tanstack/react-query";
import { GetPendingGoals } from "../http/get-pending-goasl";

export function PendingGoals()
{
    const { data } = useQuery( {
        queryKey: ['peding-goals'],
        queryFn: GetPendingGoals
    } )
    if ( !data )
        return
    return (
        <div className='flex gap-3 flex-wrap' >
            {
                data.map( pedingGoal =>
                {
                    return (
                        <OutlineButton key={pedingGoal.id} disabled={pedingGoal.completationCount >= pedingGoal.desiredWeeklyFrequency}>
                            <Plus className='size-4 text-zinc-600' />
                            {pedingGoal.title}
                        </OutlineButton>
                    )
                } )
            }


        </div>
    )
}