import './index.css';

import { FiUsers } from "react-icons/fi";
const NoContacts = () => (
    <div className="no-contacts-container">
        <div className="no-contacts-icon-container">
             <FiUsers size={70} />
        </div>
        <h1 className="no-contacts-heading">No Contacts Found</h1>
        <p className="no-contacts-description">Add your first contact to get started!</p>
    </div>
);  
export default NoContacts;