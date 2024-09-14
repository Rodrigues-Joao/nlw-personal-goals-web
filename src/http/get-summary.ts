type GoalsPerDayCompletionType = {
    id: string;
    title: string;
    goalId: string;
    completedAt: string;
}
type GoalsPerDayType = {
    date: string;
    completions: GoalsPerDayCompletionType[]

}
type SummaryResponseType = {
    completed: number;
    total: number;
    goalsPerDay?: GoalsPerDayType[];
}
export async function GetSummary(): Promise<SummaryResponseType>
{
    const response = await fetch( "http://localhost:3333/summary" )
    const data = await response.json()
    return data
}