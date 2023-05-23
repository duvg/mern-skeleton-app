const create = async (user) => {
  try {
    let response = await fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    return await response.json();
  } catch (err) {
    console.log('Err:::', err);
  }
};

const list = async (signal) => {
  try {
    let response = await fetch('/api/users/', {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log('Err::: ', err);
  }
}

const read = async (params, credentials, signal) => {
  console.log(credentials);
  try {
    let response = await fetch('/api/users/' + params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.token
      }
    });
    return await response.json();
  } catch (err) {
    console.log('Err::: ', err);
  }
}

const update = async (params, credentials, user) => {
  try {
    let response = await fetch('/api/users/' + params.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(user)
    });
    return await response.json();
  } catch (err) {
    console.log('Err:::', err);
  }
}

const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/users/' + params.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    return await response.json();
  } catch (err) {
    console.log('Err:::', err);
  }
}

export {
  create,
  list,
  read,
  update,
  remove
};
