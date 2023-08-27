const create = async (user) => {
  try {
    const response = await fetch('/api/users/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    return await response.json();
  } catch (err) {
    console.log('Err:::', err);
    return err;
  }
};

const list = async (signal) => {
  try {
    const response = await fetch('/api/users/', {
      method: 'GET',
      signal
    });
    return await response.json();
  } catch (err) {
    console.log('Err::: ', err);
    return err;
  }
};

const read = async (params, credentials, signal) => {
  try {
    const response = await fetch(`/api/users/${params.userId}`, {
      method: 'GET',
      signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials.token}`
      }
    });
    return await response.json();
  } catch (err) {
    console.log('Err::: ', err);
    return err;
  }
};

const update = async (params, credentials, user) => {
  try {
    const response = await fetch(`/api/users/${params.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials.t}`
      },
      body: JSON.stringify(user)
    });
    return await response.json();
  } catch (err) {
    console.log('Err:::', err);
    return err;
  }
};

const remove = async (params, credentials) => {
  try {
    const response = await fetch(`/api/users/${params.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials.t}`
      }
    });
    return await response.json();
  } catch (err) {
    console.log('Err:::', err);
    return err;
  }
};

export { create, list, read, update, remove };
