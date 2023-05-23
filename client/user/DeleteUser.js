import React, { useState } from 'react';
import PropTypes from 'prop-types';
import auth from '../auth/auth-helper';
import { remove } from './api-user';
import { Navigate } from 'react-router';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@material-ui/core';


const DeleteUser = (props) => {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  }

  if (redirect) {
    return <Navigate to={'/'}/>;
  }

  const deleteAccount = () => {
    const jwt = auth.isAuthenticated();
    remove({
      userId: props.userId
    }, {token: jwt.token}).then((data) => {
      if(data && data.error) {
        console.log('Err:::', data.error);
      } else {
        auth.clearJWT(() => console.log('User deleted'));
        setRedirect(true);
      }
    })
  };
  return (
    <span>
      <IconButton aria-label='Delete' onClick={handleClick} color='secondary'>
        <DeleteIcon/>
      </IconButton>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color='primary'>Cancel</Button>
          <Button onClick={deleteAccount} color='secondary' autoFocus='autoFocus'>Confirm</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
};

export default DeleteUser;
