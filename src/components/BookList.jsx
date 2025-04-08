import { useState } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

const BookList = ({ books }) => {
  const [search, setSearch] = useState({ searchQuery: "", asin: "" });

  const changeAsin = (asin) => {
    setSearch((prevSearch) => ({ ...prevSearch, asin }));
  };

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.searchQuery.toLowerCase())
  );

  return (
    <>
      <Row>
        <Col md={8}>
          <Row className='justify-content-center mt-5'>
            <Col xs={12} md={4} className='text-center'>
              <Form.Group>
                <Form.Control
                  type='search'
                  placeholder='Cerca un libro'
                  value={search.searchQuery}
                  onChange={(e) =>
                    setSearch({
                      ...search,
                      searchQuery: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='g-2 mt-3'>
            {filteredBooks.map((b) => (
              <Col xs={12} md={4} key={b.asin}>
                <SingleBook
                  book={b}
                  selectedBook={search.asin}
                  changeSelectedBook={changeAsin}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <CommentArea asin={search.asin} />
        </Col>
      </Row>
    </>
  );
};

export default BookList;
