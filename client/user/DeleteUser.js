import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { remove } from './api-user';
import auth from '../auth/auth-helper';

function DeleteUser(props) {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { userId } = props;

  const handleClick = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  const deleteAccount = () => {
    const jwt = auth.isAuthenticated();
    remove(
      {
        userId
      },
      { token: jwt.token }
    ).then((data) => {
      if (data && data.error) {
        console.log('Err:::', data.error);
      } else {
        auth.clearJWT(() => console.log('User deleted'));
        setRedirect(true);
      }
    });
  };
  return (
    <span>
      <IconButton
        aria-label="Delete"
        onClick={handleClick}
        color="secondary"
      >
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteAccount}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
};

export default DeleteUser;
