import { Dialog } from './components/ui/dialog'

import { CreateGoal } from './components/crate-goal.'

import { useEffect, useState } from 'react'
import { Summary } from './components/summary';
import { EmptyGoals } from './components/empty-goals';


type GoalsPerDayCompletionType = {
  id: string;
  title: string;
  completedAt: string;
}
type GoalsPerDayType = {
  date: string;
  completions: GoalsPerDayCompletionType[]

}
type SummaryResponseType = {
  completed: number;
  total: number;
  goalsPerDay: GoalsPerDayType[];
}
export function App()
{
  const [summary, setSummary] = useState<SummaryResponseType | null>( null )
  useEffect( () =>
  {
    fetch( "http://localhost:3333/summary" )
      .then( response =>
      {
        return response.json()
      } ).then( data =>
      {
        console.log( data )
        setSummary( data )
      } )
  }, [] )
  return (
    <Dialog>
      {summary?.total && summary.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}


