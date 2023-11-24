import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      handleSearch,
      searchRef,
      handleCategory,
      category,
      handleSort,
      sort,
    } = this.props;
    return (
      <InputGroup className="my-3">
        <Form.Control
          onChange={handleSearch}
          ref={searchRef}
          placeholder="Search contact..."
        />
        <InputGroup.Text>
          <Form.Select onChange={handleCategory} value={category}>
            <option value="all">All</option>
            <option value="family">Family</option>
            <option value="friends">Friends</option>
            <option value="relatives">Relatives</option>
            <option value="other">Other</option>
          </Form.Select>
        </InputGroup.Text>

        <InputGroup.Text>
          <Form.Select onChange={handleSort} value={sort}>
            <option>Sort by</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </Form.Select>
        </InputGroup.Text>
      </InputGroup>
    );
  }
}

export default Header;
