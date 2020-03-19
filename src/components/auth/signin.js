import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { signInAction } from "../../actions";
import { connect } from "react-redux";
var request = require("request");
class Signin extends Component {
  submit = values => {
    //login_execute(values);
    this.props.signInAction(values, this.props.history);
    //this.props.signInAction(values);
  };
  errorMessage() {
    if (this.props.errorMessage) {
      return <div className="info-red">{this.props.errorMessage}</div>;
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="form">
        <div className="container">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit(this.submit)}>
            <Field
              name="email"
              component="input"
              type="text"
              placeholder="Email"
            />
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="Password"
            />
            <button type="submit" className="blue">
              Sign In
            </button>
          </form>
          {this.errorMessage()}
        </div>
      </div>
    );
  }
}
function login_execute(values) {
  console.log("VAL", values);
  var options = {
    method: "POST",
    url: "http://52.76.240.170/login",
    headers: {
      "Content-Type": "application/json"
      //Authorization: "Bearer abcd"
    },
    //body: JSON.stringify({"username":"partner1_fe1@gmail.com","password":"password"})
    body: JSON.stringify({
      username: values.email,
      password: values.password
    })
  };
  request(options, function(error, response) {
    if (error) throw new Error(error);
    try {
      var result = JSON.parse(response.body);
      if (result.access_token) {
        console.log(result.access_token);
      } else {
        console.log("ERROR", result);
      }
    } catch (err) {
      console.log("ERROR", err.message);
    }
  });
}
function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}
const reduxFormSignin = reduxForm({
  form: "signin"
})(Signin);
export default connect(mapStateToProps, { signInAction })(reduxFormSignin);
