type CreateGoalRequestType = {
    title: string;
    desiredWeeklyFrequency: number;
}
export async function CreateGoalRequest( { title, desiredWeeklyFrequency }: CreateGoalRequestType ): Promise<void>
{
    await fetch( "http://localhost:3333/goals", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
            title,
            desiredWeeklyFrequency
        } )
    } )

}