import React, { useState } from 'react';
import './App.css';

function App() {
  // Keeping track of form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [messageLength, setMessageLength] = useState(0);

  // Update form data as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'message') {
      setMessageLength(value.length); // Keeping track of message length for character limit
    }
  };

  // Basic email validation
  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check if all fields are filled out
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields');
      return;
    }

    // Check if the email is valid
    if (!isEmailValid(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Simulate form submission
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // Clear the form after submission
      setFormData({ name: '', email: '', message: '' });
      setMessageLength(0);
    }, 1500);
  };

  // Reset the form to allow new submission
  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', message: '' });
    setMessageLength(0);
    setError('');
  };

  return (
    <div className="App">
      <div className="form-container">
        {isSubmitted ? (
          <div className="success-message">
            <h2>Message Sent!</h2>
            <p>Thanks for reaching out. We’ll get back to you shortly.</p>
            <button onClick={handleReset}>Send Another Message</button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Contact Us</h2>

            {error && <p className="error-text">{error}</p>}

            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                maxLength={250}
              />
              <div className="character-count">{messageLength}/250</div>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
