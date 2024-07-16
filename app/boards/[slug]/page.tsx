// Renders the details of the individual board page based on slug


// get individual board information
async function getBoardData(id: number){
    const response = await fetch(`http://localhost:8000/boards/${id}`, { cache: 'no-store' });
    const data = await response.json();
    return data
  }

export default async function BoardDetails(
    {params}: {
        params: {
            slug: number
        }
    }
)
{
    const board_data = await getBoardData(params.slug)
    console.log(board_data)
   // need to implement logic when data is not found
    return (
        <div className="p-3">
        <div className="p-3">
            <h1 className="text-xl">{board_data.title}</h1>
        </div>
        <hr></hr>
        </div>
    )
}