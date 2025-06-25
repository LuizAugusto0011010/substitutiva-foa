// Função para fazer login
async function login(username, password) {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) throw new Error('Login falhou');
    
    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    return true;
  } catch (error) {
    console.error('Erro no login:', error);
    return false;
  }
}

async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    window.location.href = 'login.html';
    return;
  }
  
  const defaultOptions = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json'
    }
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch(url, mergedOptions);
    
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = 'login.html';
      return;
    }
    
    if (!response.ok) throw new Error('Requisição falhou');
    
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}
