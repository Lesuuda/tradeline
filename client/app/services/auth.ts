// services/auth.ts

export const signup = async (email: string, password: string, username?: string) => {
    const res = await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to sign up');
    }
    return data;
  };
  
  export const login = async (email: string, password: string) => {
    const res = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to log in');
    }
    return data;
  };
  