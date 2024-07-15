const BoardCard = ({title, description}:{title: string, description: string}) => {
    return (
        
        <div className="p-2 rounded-md text-gray-300 bg-gray-800 w-64 min-h-28 flex flex-col">
        <h1 className="text-md font-bold">
           {title}
        </h1>
            <h1 className="text-xs mt-2">
               {description}
            </h1>
        </div>
    )
}

export default BoardCard