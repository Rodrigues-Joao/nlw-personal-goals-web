
export async function CreateGoalCompletion( goalId: string ): Promise<void>
{
    await fetch( "http://localhost:3333/goal-completion", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( { goalId } )
    } )

}