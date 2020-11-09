export function storeCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
  export function getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user;
  }
  
  export function clearCurrentUser() {
    localStorage.removeItem('currentUser');
  }

//for Token NEW

export function storeCurrentToken(token) {
  localStorage.setItem('token', JSON.stringify(token));
}

export function getCurrentToken() {
  const getToken = JSON.parse(localStorage.getItem('token'));
  return getToken;
}

export function clearCurrentToken() {
  localStorage.removeItem('token');
}