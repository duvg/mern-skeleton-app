import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router';
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Edit, Person } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { read } from './api-user';
import auth from '../auth/auth-helper';
import DeleteUser from './DeleteUser';

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle
  }
}));

function Profile() {
  const classes = useStyles();
  const { userId } = useParams();
  const [user, setUser] = useState({});

  const [redirectToSignin, setRedirectToSignin] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const jwt = auth.isAuthenticated();

    read(
      {
        userId
      },
      { token: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });

    if (redirectToSignin) {
      return <Navigate to="/signin/" />;
    }

    return () => {
      abortController.abort();
    };
  }, [userId]);

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id === user._id && (
              <ListItemSecondaryAction>
                <Link to={`/users/edit/${user._id}`}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={`Joined: ${moment(user.created).format(
              'MMMM Do YYYY, h:mm:ss a'
            )}`}
          />
        </ListItem>
      </List>
    </Paper>
  );
}

export default Profile;
