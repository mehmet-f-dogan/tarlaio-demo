"use server"

let cache: any | null = null;

export async function getRandomNumbers(token : string) {
    if (!cache){
        const response = await fetch('http://backend:8080/api/numbers', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
          });
    
          const data = await response.json();
          
          cache = {}
          
          data.forEach((element: { id: string | number; value: any; })  => {
            cache[element.id] = element.value
          });
    }
    return JSON.stringify(cache);
}
