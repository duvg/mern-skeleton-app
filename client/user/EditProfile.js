import React, { useState } from 'react';
import {
  Card,
  Button,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Link,
  Navigate,
  useLocation,
  useParams
} from 'react-router-dom';
import { read, update } from './api-user';
import auth from '../auth/auth-helper';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}));

function EditProfile() {
  const location = useLocation();
  const { userId } = useParams();
  const classes = useStyles();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    open: false,
    error: '',
    redirectToProfile: false
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    const jwt = auth.isAuthenticated();
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    };
    update(
      {
        userId
      },
      {
        token: jwt.token
      },
      user
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          userId: data._id,
          redirectToProfile: true
        });
      }
    });
  };

  const { from } = location.state || {
    from: {
      pathname: `/profile/${userId}`
    }
  };

  const { redirectToProfile } = values;
  if (redirectToProfile) {
    return <Navigate to={from} />;
  }

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit profile
          </Typography>
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange('name')}
            margin="normal"
          />
          <br />
          <TextField
            id="email"
            type="email"
            label="Email"
            value={values.email}
            onChange={handleChange('email')}
            className={classes.textField}
            margin="normal"
          />
          <br />
          <TextField
            id="password"
            name="password"
            label="password"
            type="password"
            value={values.password}
            className={classes.textField}
            onChange={handleChange('password')}
            margin="normal"
          />
          <br />
          {values.error && (
            <Typography variant="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button color="secondary" variant="contained">
            Save changes
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={values.open}
        onClose={(reason) => {
          setOpen(false);
        }}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>Account has been updated!</DialogContent>
        <DialogActions>
          <Link to={`/profile/${1}`}>
            <Button
              color="secondary"
              autoFocus="autoFocus"
              variant="contained"
            >
              Go to Profile
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditProfile;
