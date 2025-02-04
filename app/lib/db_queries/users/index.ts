import { User } from "./interface";

// get label by board
export async function getUserById(user_id: number){
  try{


  const response = await fetch(`http://localhost:8000/users/${user_id}`, { cache: 'no-store' });
  
  if (!response.ok) {
    console.error(`Error: ${response.status} - ${response.statusText}`);
    return null;
  }
  
  const data = await response.json();
  const user: User = {
    username: data.username,
    email: data.email,
    id: data.id,
    avatar_link: data.avatar_link ?? null,
    full_name: data.full_name ?? null,
    description: data.description ?? null,
  };

  return user
  }
catch (error) {
  console.error("Failed to fetch user:", error);
  return null;
}
}