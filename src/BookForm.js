import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { postBook, resetErrors } from "./redux/actions/index";
const initialBook = {
  title: "",
  color: "",
  authors: [],
};
const BookForm = (props) => {
  const [book, setBook] = useState(initialBook);
  const handleChange = (event) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    return () => {
      if (props.errors.length) props.resetErrors();
    };
  }, []); // Component Will unmount
  const author = [];

  author.push(props.author.id);

  const submitBook = (event) => {
    event.preventDefault();
    book.authors = author;
    props.postBook(book, props.closeModal);
  };

  const errors = props.errors;

  return (
    <div className="mt-5 p-2">
      <form onSubmit={submitBook}>
        {!!errors.length && (
          <div className="alert alert-danger" role="alert">
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Title</span>
          </div>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Color</span>
          </div>
          <input
            type="text"
            className="form-control"
            name="color"
            onChange={handleChange}
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    errors: state.errorsState.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postBook: (newBook, closeModal) => dispatch(postBook(newBook, closeModal)),
    resetErrors: () => dispatch(resetErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
