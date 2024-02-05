"use client"

export default function CreateBoard(){
    return (
        <div className="flex flex-col justify-center items-center bg-gray-600 text-white rounded-md w-64 p-4 gap-2">
                <h1> Create board</h1>
                <div className="bg-red mt-2">
                    <label className="text-xs"> Board title * </label>
                    <input type="text" id="board_title"
                    className="w-full h-6 rounded-sm text-white bg-gray-800 px-2"
                    ></input>
                </div>
                <button className="w-full h-6 bg-green-400 rounded hover:bg-green-600 ">Create</button>
        </div>
    )
}