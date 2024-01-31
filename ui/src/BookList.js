import React, { Component } from "react";
import http from "../src/utils/axios";

export default class BookList extends Component {
  constructor(props) {
    let session = sessionStorage.getItem("userSession");
    if (!session) {
      return (window.location.href = "/");
    }
    super(props);
    this.state = {
      books: [],
      page: 1,
    };
  }
  componentDidMount() {
    this.fetchBooks(this.state.page);
  }

  fetchBooks(page) {
    return http.get("/book", { params: { page } }).then((res) => {
      let books = res.data.items;
      this.setState({
        books,
        page: page + 1,
      });
    });
  }
  render() {
    return (
      <div className="container ">
        <h3 className="text-center">Book Catalog</h3>
        <hr />
        <div>
          <input placeholder="search by title"></input>
          <input placeholder="search by author"></input>
          <select>
            <option>Poetry</option>
            <option>fiction</option>
            <option>nonfiction</option>
            <option>drama</option>
            <option>prose</option>
          </select>
          start Date: <input type="date"></input>
          end Date : <input type="date"></input>
        </div>
        <hr />
        <div>
          <div className="row ">
            <div className="col-md-2">ISBN</div>
            <div className="col-md-2">Title</div>
            <div className="col-md-2">Author</div>
            <div className="col-md-2">Genre</div>
            <div className="col-md-2">Description</div>
            <div className="col-md-2">Published</div>
          </div>
          <hr />
          {this.state.books.map((book) => (
            <div className="row table table-striped" key={book.id}>
              <div className="col-md-2 ">{book.ISBN}</div>
              <div className="col-md-2">{book.title}</div>
              <div className="col-md-2">{book.author}</div>
              <div className="col-md-2">{book.genre}</div>
              <div className="col-md-2">{book.description}</div>
              <div className="col-md-2">
                {new Date(book.published).getDate() +
                  "/" +
                  new Date(book.published).getMonth() +
                  "/" +
                  new Date(book.published).getFullYear()}
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <button
            onClick={() => {
              this.fetchBooks(this.state.page);
            }}
          >
            next page
          </button>
        </div>
      </div>
    );
  }
}
