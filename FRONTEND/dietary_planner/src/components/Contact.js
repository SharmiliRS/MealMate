import React, { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const contacthandle = (e) => {
        e.preventDefault();  // Prevent the form from submitting and reloading the page
        
        alert("Your Feedback has been recorded");
        
        // You can also clear the form fields after submission
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="contact-container">
            <div className="contact-section">
                <h1 className="contact-title">Contact Us</h1>
                <p className="contact-description">
                    We'd love to hear from you! Feel free to reach out to us for any questions, feedback, or support.
                </p>

                <div className="contact-details">
                    <div className="contact-item">
                        <i className="fas fa-envelope"></i>
                        <h3>Email</h3>
                        <p><a href="mailto:support@mealmate.com">support@mealmate.com</a></p>
                    </div>

                    <div className="contact-item">
                        <i className="fas fa-phone"></i>
                        <h3>Phone</h3>
                        <p><a href="tel:+1234567890">044 43166949</a></p>
                    </div>

                    <div className="contact-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <h3>Location</h3>
                        <p>5th floor JS tower, Nungambakkam , Chennai</p>
                    </div>
                </div>

                <form className="contact-form" onSubmit={contacthandle}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Your Message"
                        rows="5"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit" className="contact-submit">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
