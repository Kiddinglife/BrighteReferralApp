import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Paper, Grid, Button, CssBaseline } from '@material-ui/core';
import { Link, BrowserRouter } from 'react-router-dom';

const validate = (values) => {
  const errors = {};
  if (!values.givenName) {
    errors.givenName = 'Required';
  }
  if (!values.surName) {
    errors.surName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.phone) {
    errors.phone = 'Required';
  }
  return errors;
};

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = props.handleSubmit;
    this.state = {
      givenName: '',
      surName: '',
      email: '',
      phone: '',
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    console.log('state', this.state);
    return (
      <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
        <CssBaseline />
        <Form
          onSubmit={this.handleSubmit}
          initialValues={{
            givenName: `${this.state.givenName}`,
            surName: `${this.state.surName}`,
            email: `${this.state.email}`,
            phone: `${this.state.phone}`,
          }}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={6}>
                    <Field fullWidth required name="givenName" component={TextField} type="text" label="Given Name" />
                  </Grid>
                  <Grid item xs={6}>
                    <Field fullWidth required name="surName" component={TextField} type="text" label="Surname" />
                  </Grid>
                  <Grid item xs={6}>
                    <Field name="email" fullWidth required component={TextField} type="email" label="Email" />
                  </Grid>
                  <Grid item xs={6}>
                    <Field name="phone" fullWidth required component={TextField} type="text" label="Phone" />
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                      <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button type="button" color="primary" variant="contained" type="button" disabled={submitting}>
                          Cancel
                        </Button>
                      </Link>
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button variant="contained" color="primary" type="submit" variant="contained" disabled={submitting}>
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          )}
        />
      </div>
    );
  }
}
