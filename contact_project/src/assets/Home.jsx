import React, { Component, createRef } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import "bootstrap/dist/css/bootstrap.min.css";

import ContactForm from "../components/ContactForm";
import Header from "../components/Header";
import ContactCard from "../components/FormCard";
import Footer from "../components/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.searchRef = createRef();
    this.nameRef = createRef();
    this.state = {
      activeTab: "all",
      contacts: JSON.parse(localStorage.getItem("contacts")) || [
        {
          id: 1,
          name1: "Azizbek",
          name2: "Abduhakimov",
          phone: "99897931766",
          category: "family",
          favourite: false,
        },
        {
          id: 2,
          name1: "Abror",
          name2: "Bakhtiyarovich",
          phone: "998930876732",
          category: "friends",
          favourite: false,
        },
      ],
      contact: {
        name1: "",
        name2: "",
        phone: "",
        category: "",
      },
      selected: null,
      search: "",
      category: "all",
      validated: false,
      sort: "",
    };
  }

  render() {
    const {
      activeTab,
      contacts,
      contact,
      selected,
      search,
      category,
      validated,
      sort,
    } = this.state;

    const handleSearch = () => {
      this.setState({
        search: this.searchRef.current.value.trim().toLowerCase(),
      });
    };

    const changeTab = (key) => {
      this.setState({ activeTab: key });
    };

    const handleContact = (e) => {
      this.setState({
        contact: { ...contact, [e.target.id]: e.target.value },
      });
    };

    const submit = (e) => {
      e.preventDefault();
      if (e.target.checkValidity()) {
        let newContacts;
        let newContact = { ...contact, id: v4() };
        if (selected === null) {
          newContacts = [...contacts, newContact];
          toast.success("Added successfully!");
        } else {
          newContacts = contacts.map((contact) => {
            if (contact.id === selected) {
              toast.info("Edited successfully!");
              return newContact;
            }

            return contact;
          });
        }
        localStorage.setItem("contacts", JSON.stringify(newContacts));
        this.nameRef.current.focus();
        this.setState({
          contacts: newContacts,
          contact: {
            name1: "",
            name2: "",
            phone: "",
            category: "",
          },
          selected: null,
          validated: false,
        });
      } else {
        this.setState({ validated: true });
      }
    };

    const addFav = (id) => {
      let newContacts = contacts.map((contact) => {
        if (contact.id === id) {
          contact.favourite = !contact.favourite;
        }
        return contact;
      });
      this.setState({ contacts: newContacts });
      localStorage.setItem("contacts", JSON.stringify(newContacts));
    };

    const deleteContact = (id) => {
      let newContacts = contacts.filter((contact) => contact.id !== id);
      this.setState({ contacts: newContacts });
      localStorage.setItem("contacts", JSON.stringify(newContacts));
    };

    const editContact = (id) => {
      const contact = contacts.find((contact) => contact.id === id);
      this.setState({ contact, selected: id });
    };

    const handleCategory = (e) => {
      this.setState({ category: e.target.value });
    };

    const handleSort = (e) => {
      this.setState({ sort: e.target.value });
    };

    let allContacts = contacts.filter(
      (contact) =>
        contact.name1.toLowerCase().includes(search) ||
        contact.name2.toLowerCase().includes(search)
    );

    if (category !== "all") {
      allContacts = allContacts.filter(
        (contact) => contact.category === category
      );
    }

    if (sort === "a-z") {
      allContacts = allContacts.sort((a, b) =>
        a.name1.toLowerCase() > b.name1.toLowerCase() ? 1 : -1
      );
    } else if (sort === "z-a") {
      allContacts = allContacts.sort((a, b) =>
        b.name1.toLowerCase() > a.name1.toLowerCase() ? 1 : -1
      );
    }

    const favContacts = allContacts.filter((contact) => contact.favourite);

    return (
      <Container>
        <ToastContainer autoClose={1000} />
        <ContactForm
          nameRef={this.nameRef}
          validated={validated}
          contact={contact}
          handleContact={handleContact}
          submit={submit}
          selected={selected}
        />
        <Header
          searchRef={this.searchRef}
          category={category}
          sort={sort}
          handleSort={handleSort}
          handleCategory={handleCategory}
          handleSearch={handleSearch}
        />
        <Tabs
          activeKey={activeTab}
          className="mb-3"
          onSelect={changeTab}
          variant="pills"
          fill
        >
          <Tab eventKey="all" title={`All (${allContacts.length})`}>
            {allContacts.map((contact, i) => (
              <ContactCard
                addFav={addFav}
                editContact={editContact}
                deleteContact={deleteContact}
                key={i}
                {...contact}
              />
            ))}
          </Tab>
          <Tab
            eventKey="favourites"
            title={`Favourites (${favContacts.length})`}
          >
            {favContacts.map((contact, i) => (
              <ContactCard
                addFav={addFav}
                editContact={editContact}
                deleteContact={deleteContact}
                key={i}
                {...contact}
              />
            ))}
          </Tab>
        </Tabs>
        <Footer />
      </Container>
    );
  }
}

export default Home;
//  ! bu home.jsx fayldagi codlar
