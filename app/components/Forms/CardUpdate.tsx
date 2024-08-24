"use client"

import { Card } from "@/app/boards/interfaces";
import * as Yup from "yup"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import moment from "moment";

export function CardUpdate({card}:{card: Card}){

    // Extract date and time from the due_date
    const [dueDate, setDueDate] = useState<string>(card.due_date ? moment(card.due_date).format('YYYY-MM-DD') : '');
    const [dueTime, setDueTime] = useState<string>(card.due_date ? moment(card.due_date).format('HH:mm') : '');
    
    const router = useRouter();
    
    const formik = useFormik({
        initialValues: {
            desc: card.desc,
            due_date: card.due_date,
            completed: card.completed
        },
        validationSchema: Yup.object({
            desc: Yup.string(),
            due_date: Yup.date().nullable(),
            completed: Yup.boolean()
        }),
        onSubmit: async values => {
            // Combine date and time into an ISO 8601 string
            const formattedDueDate = dueDate && dueTime 
                ? moment(`${dueDate} ${dueTime}`).toISOString() 
                : null;

            const data_to_post = {
                desc: values.desc,
                due_date: formattedDueDate,
                completed: values.completed
            };

            try {
                const response = await fetch(`http://localhost:8000/list_card/${card.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data_to_post),
                    credentials: 'include'
                });
                const data = await response.json();
                if (data) {
                    router.refresh();
                }
            } catch (error) {
                console.log("Card couldn't be updated");
                console.error(error);
            }
        }
    });

    // Handle date and time change
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value);
        formik.setFieldValue('due_date', e.target.value); 
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueTime(e.target.value);
        formik.setFieldValue('due_date', `${dueDate} ${e.target.value}`); 
    };

    return (
        <form className="md:col-span-2 flex flex-col gap-2" onSubmit={formik.handleSubmit}>
            <label>Description</label>
            <textarea
                id="desc"
                className='bg-zinc-600 px-2 pt-2 rounded-md min-h-16' 
                onChange={formik.handleChange}
                value={formik.values.desc}
                placeholder='Add a more detailed description'
            ></textarea>

            <div className='flex gap-2 items-center justify-start'>
                Due Date: 
                <input 
                    type="date" 
                    id="due_date" 
                    value={dueDate} 
                    onChange={handleDateChange}
                    className="bg-gray-700 text-white rounded-md px-2"
                />
                <input 
                    type="time" 
                    id="due_time" 
                    value={dueTime} 
                    onChange={handleTimeChange}
                    className="bg-gray-700 text-white rounded-md px-2"
                />
                <input 
                    type="checkbox" 
                    id="completed" 
                    checked={formik.values.completed} 
                    onChange={formik.handleChange} 
                    className="h-6 w-6 bg-gray-700 rounded-md border-gray-800 text-green-500 focus:ring-green-500 focus:border-green-500 hover:bg-gray-800 checked:bg-green-500 checked:border-transparent checked:ring-offset-0"
                />
            </div>

            <button type="submit" className="bg-gray-600 hover:bg-gray-700 w-fit py-1 px-2 rounded-sm">
                Save
            </button>
        </form>
    )
}
