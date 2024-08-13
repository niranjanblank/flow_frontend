"use client"

import { Card } from "@/app/boards/interfaces";
import DateTimePicker from 'react-datetime-picker';
import * as Yup from "yup"
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import moment from "moment";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function CardUpdate({card}:{card: Card}){

           // Convert the due_date string to a Date object
   const [dueDate, setDueDate] = useState<Value | null>(card.due_date ? new Date(card.due_date) : null);
    const router = useRouter()
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
              // Convert the due_date to an ISO 8601 string or keep it null
            const formattedDueDate = values.due_date ? moment(values.due_date).toISOString() : null;

            // Handle form submission here
            const data_to_post = {
                desc: values.desc,
                due_date: formattedDueDate,
                completed: values.completed
            };

            console.log(data_to_post)

            try {
                console.log(data_to_post)
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
                    console.log('inside')
                    router.refresh()
                }

            } catch (error) {
                console.log("Card couldn't be updated");
                console.error(error);
            }
        }
    })



// Synchronize formik's state with DateTimePicker
    const handleDateChange = (date: Value) => {
        setDueDate(date);
        formik.setFieldValue('due_date', date); // Synchronize formik's state with DateTimePicker
    };
    return (
        <form className="md:col-span-2 flex flex-col gap-2"
        onSubmit={formik.handleSubmit}
        >
            {/* for content */}
            <label>Description</label>
            <textarea
            id="desc"
            className='bg-zinc-600 px-2 pt-2 rounded-md min-h-16' 
            onChange={formik.handleChange}
            value={formik.values.desc}
            placeholder='Add a more detailed description'
            ></textarea>

            
        
            <div className='flex gap-2 items-center justify-start'>Due Date: 
                <DateTimePicker
                    id="due_date"
                    disableClock
                    calendarIcon={null}
                    className="border-0 rounded-lg"
                    onChange={handleDateChange} 
                    value={dueDate}
                />
                  <input 
        type="checkbox" 
        id="completed" 
        checked={formik.values.completed} 
        onChange={formik.handleChange} 
        className="h-6 w-6 bg-gray-700 rounded-md border-gray-800 text-green-500 focus:ring-green-500 focus:border-green-500 hover:bg-gray-800 checked:bg-green-500 checked:border-transparent checked:ring-offset-0"
        />
            </div>
            {/* <div>
        
            </div> */}
            <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-700 w-fit py-1 px-2 rounded-sm ">Save</button>
  </form>
    )
}