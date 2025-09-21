
import { MdEmail, MdPhone, MdPerson } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import './index.css';
const ContactCard = (props) => {
    const { contactDetails , onDeleteContact } = props;
    const { name, email, phone , id } = contactDetails;  
    const deleteContactPage = () => {
        onDeleteContact(id)
    }
    return (
         <div className="contact-card">
          <div className="contact-header-container">
            <div className="contact-header">
        <div className="avatar">
          <MdPerson size={28} />
        </div>
        <h2 className="contact-name">{name}</h2>
      </div>
           <button  onClick = {deleteContactPage} className="delete-button" type="button" >
             <RiDeleteBin6Line size={30} className="color" onClick = {deleteContactPage} />
           </button>
          </div>

      <div className="contact-info">
        <p>
          <MdEmail className="icon" />
          {email}
        </p>
        <p>
          <MdPhone className="icon" />
          {phone}
        </p>
      </div>
    </div>
    );
}

export default ContactCard;
