import { Component } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

class BookList extends Component {
  state = {
    searchQuery: "",
    asin: "",
  };

  getReviews = () => {};

  componentDidUpdate = (prevProprs, prevState) => {
    if (prevProprs.asin !== this.props.asin) {
      this.getReviews.data;
    }
  };

  render() {
    return (
      <>
        <Row className='justify-content-center mt-5'>
          <Col xs={12} md={4} className='text-center'>
            <Form.Group>
              <Form.Control
                type='search'
                placeholder='Cerca un libro'
                value={this.state.searchQuery}
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className='g-2 mt-3'>
          <Col xs={12} md={9}>
            <Row>
              {this.props.books
                .filter((b) =>
                  b.title.toLowerCase().includes(this.state.searchQuery)
                )
                .map((b) => (
                  <Col xs={12} md={4} key={b.asin}>
                    <SingleBook book={b} />
                  </Col>
                ))}
            </Row>
          </Col>

          <Col xs={12} md={3}>
            <CommentArea />
          </Col>
        </Row>
      </>
    );
  }
}

export default BookList;
