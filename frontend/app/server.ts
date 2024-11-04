"use server"

export async function getRandomNumbers(start: number, end: number, token: string) {
  const response = await fetch(`http://backend:5000/api/numbers?start=${start}&end=${end}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  });

  const data = await response.json();
  return data as number[]
}

export async function signinServer(username: string, password: string) {
  try {
    const response = await fetch('http://backend:5000/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    const { token } = data;
    return {
      data: token,
      error: ""
    }
  } catch (err) {
    return {
      data: "",
      error: err instanceof Error ? err.message : 'An error occurred'
    }
  }
}

export async function signupServer(username: string, password: string) {
  try {
    const response = await fetch('http://backend:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    return ""
  } catch (err) {
    return err instanceof Error ? err.message : 'An error occurred'
  }
}

