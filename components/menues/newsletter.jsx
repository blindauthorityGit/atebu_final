import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

function Newsletter() {
    const [showForm, setShowForm] = useState(false);

    function handleButtonClick() {
        setShowForm(true);
    }

    return (
        <nav>
            <div className="navbar-container bg-primaryColor-200 rounded-md h-full flex items-center justify-around px-3">
                <a href="/" className="navbar-brand text-blackText ">
                    Newsletter
                </a>
                <button className="navbar-button text-blackText" onClick={handleButtonClick}>
                    <FaPlus className="navbar-icon" />
                </button>
            </div>
            {showForm && (
                <div className="navbar-form">
                    <form>
                        <label htmlFor="email-input">Enter your email address:</label>
                        <input type="email" id="email-input" />
                        <button type="submit" className="navbar-submit-button">
                            Subscribe
                        </button>
                    </form>
                </div>
            )}
        </nav>
    );
}

export default Newsletter;
