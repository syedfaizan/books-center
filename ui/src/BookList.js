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

  fetchBooks(page, searchQuery) {
    return http
      .get("/book", { params: { page, ...searchQuery } })
      .then((res) => {
        let books = res.data.items;
        this.setState({
          books,
          page: page + 1,
        });
      });
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onGenreChange(event) {
    this.setState({
      genre: event.target.value,
    });
  }

  onSearch() {
    const { title, author, genre, startDate, endDate } = this.state;
    this.fetchBooks(1, { title, author, genre, startDate, endDate });
  }

  render() {
    return (
      <div className="container ">
        <h3 className="text-center">Book Catalog</h3>
        <hr />
        <div>
          <div className="row">
            <div className="col-md-4">
              <input
                className="form-control col-md-8 inputMargin"
                name="title"
                placeholder="search by title"
                onChange={this.onChange.bind(this)}
              ></input>
            </div>
            <div className="col-md-4">
              <input
                className="form-control col-md-8 inputMargin"
                placeholder="search by author"
                name="author"
                onChange={this.onChange.bind(this)}
              ></input>
            </div>
            <div className="col-md-4">
              <select
                value={this.state.genre}
                onChange={this.onGenreChange.bind(this)}
              >
                <option>Poetry</option>
                <option>fiction</option>
                <option>nonfiction</option>
                <option>drama</option>
                <option>prose</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              start Date:{" "}
              <input
                className="form-control col-md-8 inputMargin"
                onChange={this.onChange.bind(this)}
                name="startDate"
                type="date"
              ></input>
            </div>
            <div className="col-md-3">
              end Date :{" "}
              <input
                className="form-control col-md-8 inputMargin"
                onChange={this.onChange.bind(this)}
                name="endDate"
                type="date"
              ></input>
            </div>
            <div className="col-md-3">
              <button onClick={this.onSearch.bind(this)}>Search</button>
            </div>
          </div>
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
              const { title, author, genre, startDate, endDate } = this.state;

              this.fetchBooks(this.state.page, {
                title,
                author,
                genre,
                startDate,
                endDate,
              });
            }}
          >
            next page
          </button>
        </div>
      </div>
    );
  }
}
