import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
// =============================
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// =============================
import LoginMenu from './LoginMenu';
import Footer from './Footer';
import {Link} from 'react-router-dom'
// =============================

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    email: '',
    response: 2,
    loginView: 1,
  };
  this.handleSubmit = this.handleSubmit.bind(this);
}

  handleChange = email => event => {
    this.setState({
      [email]: event.target.value,
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    let reqBody =
    {
      email: this.state.email
    }

    fetch("/api/LoginAction", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
                "Content-Type": "application/json"
            }
    }).then((res) => {
        if (res.ok){
          return res.json();
        } else {
          throw new Error ('Something went wrong with your fetch');
        }
      }).then((json) => {
        this.setState({response:(json[0].count)}, function()
      {
          console.log(this.state.response);
      });
      })

  }

  render() {
    const { classes } = this.props;
    if(this.state.response === 1)
    {
      console.log(this.state.response);
      return <Redirect to='./HomePage' />
    }

    return(
<div className="LoginPage">
  <LoginMenu />
  <Card className="LoginContent">
        <img src={require("./img/flag-sma.png")} alt="SomePic"/>
        <CardContent className="card-content">
          <h2>Sign in for your study path to Canada</h2>
          <form onSubmit = {this.handleSubmit} className={classes.container} noValidate autoComplete="off">
            <TextField
              id="email"
              label="Email"
              type="email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
            />

            <Button  type="submit" variant="contained" color="primary" >
            Login
          </Button>
          </form>

          <div className="logAlternative">

                <p>or</p>
                <div>
                    <button className="btn fbsocial ">facebook</button>
                    <button className="btn gmail ">gmail</button>
                </div>
                <Link to="/">forgot password</Link>

          </div>

        </CardContent>

        {/* <div className="sociaLogin">
            <p>or</p>
            <div>
                <button className="btn fbsocial ">facebook</button>
                <button className="btn gmail ">gmail</button>
            </div>
        </div>


          <Link to="/HomePage/">forgot password</Link> */}

        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
      <Footer />

    </div>


    )
    }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);
// export default LoginForm;
