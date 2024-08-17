// get background image templates
export async function getTemplateImages(){
    const response = await fetch(`http://localhost:8000/boards/images/template-images`, { cache: 'no-store' });
    const data = await response.json();
    return data
  }

// update background image
export async function updateBoardImage(file: File, board_id: number): Promise<{ success: boolean; data: any }> {
  const formData = new FormData();
  formData.append("image", file);
  console.log(formData)

  try {
    const response = await fetch(`http://localhost:8000/boards/update-background/${board_id}`, {
      method: "PUT",
      body: formData,
      headers: {
      },
    });

    if (response.ok) {
      const data = await response.json(); 
      return { success: true, data }; // Return success and data
    } else {
      const errorData = await response.json(); 
      return { success: false, data: errorData }; // Return failure and error data
    }
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    // Handle the error correctly based on its type
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { success: false, data: errorMessage }; // Return failure and the error message
  }
}