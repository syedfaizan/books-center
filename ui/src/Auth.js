import React, { Component } from "react";
import http from "./utils/axios";
import { Redirect } from "react-router-dom";

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      redirect: !!sessionStorage.getItem("userSession") || false,
    };
  }

  handleChange(event) {
    let username = event.target.value;
    this.setState({
      username,
    });
  }

  handleFormSubmission() {
    return http
      .post("/user", {
        username: this.state.username,
      })
      .then((res) => {
        sessionStorage.setItem("userSession", JSON.stringify(res.data));
        this.setState({
          redirect: true,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/books" />;
    }

    return (
      <div className="container marginTop">
        <div className="jumbotron text-center">
          <h3>Enter User Name</h3>
          <input
            placeholder="eg: syedfaizan"
            className="form-control"
            type="text"
            onChange={(e) => {
              this.handleChange(e);
            }}
          />
          <br />
          <button
            className="form-control btn btn-primary"
            onClick={this.handleFormSubmission.bind(this)}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
