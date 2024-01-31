import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Book from "./Book";
import BookList from "./BookList";
import authComponent from "./Auth";

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1 className="text-center">Digital_Library</h1>
        </div>
        <Router>
          <Switch>
            <Route exact path="/" component={authComponent} />
            <Route path="/book/:id" component={Book} />
            <Route path="/books" component={BookList} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
