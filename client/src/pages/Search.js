import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import { Data } from "../components/Data";
function Search() {
    const [books, setBooks] = useState([])
    const [booksResult, setbooksResult] = useState([])
    // Load all books and store them with setBooks
    useEffect(() => {
        loadBooks()
    }, [])
    // Loads all books and sets them to books
    function loadBooks() {
        API.getBooks()
            .then(res =>
                setBooks(res.data)
            )
            .catch(err => console.log(err));
    };
    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const book = event.target.value;
        setBooks(book);
    };
    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        API.searchBooks(books)
            .then((res) => {
                //console.log("data", res.data.items)
                setbooksResult(res.data.items);
            })
            .catch((err) => console.log(err));
    };
    return (
        <Container fluid>
            <Row>
                <Col size="md-12">
                    <Jumbotron>
                        <h1>Search for a Book</h1>
                    </Jumbotron>
                    <form onSubmit={handleFormSubmit}>
                        <Input
                            onChange={handleInputChange}
                            name="title"
                            placeholder="Search For A Book"
                        />
                        <FormBtn
                            onClick={handleFormSubmit}
                        >
                            Search
            </FormBtn>
                    </form>
                </Col>
            </Row>
            <table className="table">
              <tbody>
                {booksResult.map((book) => (
                  <Data
                    key={book.id}
                    href={book.volumeInfo.previewLink}
                    thumbnail={!book.volumeInfo.imageLinks ? "https://via.placeholder.com/150" : book.volumeInfo.imageLinks.thumbnail}
                    title={book.volumeInfo.title}
                    author={!book.volumeInfo.authors ? ["No Author Available"] : book.volumeInfo.authors}
                    description={!book.volumeInfo.description ? "No Synopsis Available" : book.volumeInfo.description}
                  />
                ))}
              </tbody>
            </table>
        </Container>
    );
}
export default Search;