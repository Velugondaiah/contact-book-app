import { Component } from "react";
import { FiUsers } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai"; // plus icon
import ContactCard from "../ContactCard";
import NoContacts from "../NoContacts";
import './index.css';

class MainContactPage extends Component {
  state = { 
    searchContent: "", 
    totalUsers: [], 
    isLoading: true,
    currentPage: 1,
    usersPerPage: 6,
    showModal: false,   // for modal toggle
    newName: "",
    newEmail: "",
    newPhone: ""
  };

  componentDidMount() {
    this.fetchContacts();
  }

  fetchContacts = async () => {
    try {
      const response = await fetch("https://contact-book-app-1-6bjv.onrender.com/users-contact-details");
      const data = await response.json();
      this.setState({ totalUsers: data, isLoading: false });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      this.setState({ isLoading: false });
    }
  };

  onChangeSearchInput = (event) => {
    this.setState({ searchContent: event.target.value, currentPage: 1 });
  };

  onDeleteContact = async (id) => {
    try {
      await fetch(`https://contact-book-app-1-6bjv.onrender.com/delete-users-contact-details/${id}`, {
        method: "DELETE",
      });
      this.setState((prevState) => ({
        totalUsers: prevState.totalUsers.filter((u) => u.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  handlePageChange = (pageNum) => {
    this.setState({ currentPage: pageNum });
  };

  // ✅ Add new contact with validation
  handleAddContact = async () => {
    const { newName, newEmail, newPhone } = this.state;

    // Validation checks
    if (!newName || !newEmail || !newPhone) {
      return alert("All fields are required!");
    }

    // Phone validation: exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(newPhone)) {
      return alert("Phone number must be exactly 10 digits.");
    }

    // Email validation: must end with @gmail.com
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(newEmail)) {
      return alert("Email must be a valid @gmail.com address.");
    }

    try {
      const response = await fetch("https://contact-book-app-1-6bjv.onrender.com/add-users-contact-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, email: newEmail, phone: newPhone }),
      });

      const result = await response.json();
      if (response.ok) {
        this.setState((prevState) => ({
          totalUsers: [
            ...prevState.totalUsers,
            { id: result.contactId, name: newName, email: newEmail, phone: newPhone }
          ],
          showModal: false,
          newName: "",
          newEmail: "",
          newPhone: ""
        }));
      } else {
        alert(result.error || "Failed to add contact");
      }
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  render() {
    const { searchContent, totalUsers, isLoading, currentPage, usersPerPage, showModal, newName, newEmail, newPhone } = this.state;

    const filteredUsers = totalUsers.filter((eachUser) =>
      (eachUser.name || "").toLowerCase().includes(searchContent.toLowerCase())
    );

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    return (
      <div className="main-container">
        
        {/* ✅ Total Contacts */}
        <div className="d-flex align-items-center justify-content-center flex-column">
          <div className="main-avatar">
            <FiUsers size={32} />
          </div>
        </div>
        <h1 className="main-heading">Contacts Book</h1>
        <p className="main-paragraph">
          Keep all your important contacts organized and easily accessible
        </p>

        {/* Search + Total */}
        <div className="search-total-container">
          <div className="total-contacts-box">
            <p className="total">Total Contacts: <span className="span"> {filteredUsers.length}</span></p>
          </div>
          <div className="search-container">
            <BiSearch className="search-icon" size={20} />
            <input
              type="search"
              className="search-input"
              placeholder="Search contacts..."
              value={searchContent}
              onChange={this.onChangeSearchInput}
            />
          </div>
        </div>

        {/* Loading / Empty / List States */}
        {isLoading ? (
          <p className="loading-text">Loading contacts...</p>
        ) : filteredUsers.length === 0 ? (
          <div className="no-contacts-container">
            <NoContacts />
          </div>
        ) : (
          <>
            <ul className="contacts-list">
              {currentUsers.map((eachUser) => (
                <ContactCard
                  key={eachUser.id}
                  contactDetails={eachUser}
                  onDeleteContact={this.onDeleteContact}
                />
              ))}
            </ul>

            {/* Pagination Controls */}
            <div className="pagination-container">
              <button
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => this.handlePageChange(currentPage - 1)}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    className={`page-btn ${pageNum === currentPage ? "active" : ""}`}
                    onClick={() => this.handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => this.handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>

            <p className="pagination-info">
              Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} contacts
            </p>
          </>
        )}

        {/* ✅ Floating Plus Button */}
        <button className="floating-btn" onClick={() => this.setState({ showModal: true })}>
          <AiOutlinePlus size={28} />
        </button>

        {/* ✅ Add Contact Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Add New Contact</h2>
              <input
                type="text"
                placeholder="Enter full name"
                value={newName}
                onChange={(e) => this.setState({ newName: e.target.value })}
              />
              <input
                type="email"
                placeholder="Enter email address"
                value={newEmail}
                onChange={(e) => this.setState({ newEmail: e.target.value })}
              />
              <input
                type="text"
                placeholder="Enter phone number"
                value={newPhone}
                onChange={(e) => this.setState({ newPhone: e.target.value })}
              />
              <div className="modal-actions">
                <button onClick={() => this.setState({ showModal: false })}>Cancel</button>
                <button onClick={this.handleAddContact}>Add Contact</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MainContactPage;
