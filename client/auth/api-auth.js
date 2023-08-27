const signin = async (user) => {
  try {
    const response = await fetch('/auth/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(user)
    });
    return await response.json();
  } catch (err) {
    console.log('Err:::', err);
    return null;
  }
};

const signout = async () => {
  try {
    const response = await fetch('/auth/signout', { method: 'GET' });
    return await response.json();
  } catch (err) {
    console.log('Err:::', err);
    return null;
  }
};

export { signin, signout };
