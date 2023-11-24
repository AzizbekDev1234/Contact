import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

class ContactForm extends Component {
  render() {
    const { contact, handleContact, submit, selected, nameRef, validated } =
      this.props;

    return (
      <Form
        noValidate
        validated={validated}
        className="w-50 m-auto"
        onSubmit={submit}
      >
        <Form.Group className="mb-3" controlId="name1">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            ref={nameRef}
            onChange={handleContact}
            value={contact.name1}
            type="text"
            placeholder="First name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please fill this field!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="name2">
          <Form.Label>Last name (Optional)</Form.Label>
          <Form.Control
            onChange={handleContact}
            value={contact.name2}
            type="text"
            placeholder="Last name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            required
            onChange={handleContact}
            value={contact.phone}
            type="tel"
            placeholder="Phone number"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please fill this field!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Choose relationship</Form.Label>
          <Form.Select onChange={handleContact} value={contact.category}>
            <option value="family">Family</option>
            <option value="friends">Friends</option>
            <option value="relatives">Relatives</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>
        <Button className="btn w-100" type="submit">
          {selected === null ? "Add" : "Save"} contact
        </Button>
      </Form>
    );
  }
}

export default ContactForm;
//  ! bu ContactFormdagi codlar
