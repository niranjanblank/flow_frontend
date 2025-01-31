
// get label by board
export async function getUserById(user_id: number){
  const response = await fetch(`http://localhost:8000/users/${user_id}`, { cache: 'no-store' });
  const data = await response.json();
  return data
}