// get background image templates
export async function getTemplateImages(){
    const response = await fetch(`http://localhost:8000/boards/images/template-images`, { cache: 'no-store' });
    const data = await response.json();
    return data
  }