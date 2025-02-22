import { Dialog } from './components/ui/dialog'

import { CreateGoal } from './components/crate-goal.'

import { Summary } from './components/summary';
import { EmptyGoals } from './components/empty-goals';
import { useQuery } from '@tanstack/react-query';
import { GetSummary } from './http/get-summary';


export function App()
{
  const { data } = useQuery( {
    queryKey: ['summary'],
    queryFn: GetSummary
  } )
  return (
    <Dialog>
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}
      <CreateGoal />
    </Dialog>
  )
}


