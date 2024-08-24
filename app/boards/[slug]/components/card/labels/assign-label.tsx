import { Label, Card } from "@/app/boards/interfaces";
import { assignLabel, deleteLabelCardLink } from "@/app/lib/db_queries/labels";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdLabelOff } from "react-icons/md";
import { toast } from "react-toastify";

export default function AssignLabel({card, labels }: { card: Card, labels: Label[] }) {
  // State to track which labels are selected
  const [selectedLabels, setSelectedLabels] = useState<Set<number>>(new Set());
    const router = useRouter()
  // map card labels to a set of label ids and set the state
  useEffect(()=> {
    const selected_labels = new Set(card.labels.map(label => label.id))
    setSelectedLabels(selected_labels)
  },[card])

  const handleCheckboxChange = async  (labelId: number) => {
    try {
        let updatedSelected;

        if (selectedLabels.has(labelId)) {
            // Attempt to remove the label
            const res = await deleteLabelCardLink(card.id, labelId);
            if (res.success) {
                toast.success("Label removed");
                // Only update state if the API call succeeds
                updatedSelected = new Set(selectedLabels);
                updatedSelected.delete(labelId);
                // Update the state after the successful API call
                setSelectedLabels(updatedSelected);
                router.refresh()
            } else {
                toast.error("Label couldn't be removed");
                return; // Exit if the API call fails
            }
        } else {
            // Attempt to add the label
            const res = await assignLabel(card.id, labelId);
            if (res.success) {
                toast.success("Label added");
                // Only update state if the API call succeeds
                updatedSelected = new Set(selectedLabels);
                updatedSelected.add(labelId);
                 // Update the state after the successful API call
                setSelectedLabels(updatedSelected);
               
                router.refresh()
            } else {
                toast.error("Label couldn't be added");
                return; // Exit if the API call fails
            }
        }



    } catch (error) {
        // Handle any unexpected errors
        toast.error("An unexpected error occurred");
    }
  }

  return (
    <div
     className=" bg-zinc-700 p-2 px-4 rounded-md gap-2 w-64 ">
      {labels && (
        <div className="flex flex-col gap-1">
            <h1>Select the labels</h1>
          {labels.map((label) => (
            <label key={label.id} className="flex items-center gap-2">
              <input
              className="h-6 w-6"
                type="checkbox"
                checked={selectedLabels.has(label.id)}
                onChange={() => handleCheckboxChange(label.id)}
              />
              <span 

              style={{ backgroundColor: label.color }} className="rounded p-1 w-full">
                {label.title} 
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
