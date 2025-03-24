import React, { useRef } from "react";
import emailjs from "emailjs-com";

const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (form.current) {
      emailjs
        .sendForm(
          "service_xs8semp", // Replace with your EmailJS service ID
          "template_6x78qyx", // Replace with your EmailJS template ID
          form.current, // The form element
          "UuEGbb_dUNHf6RYbN" // Replace with your EmailJS public key
        )
        .then(
          () => {
            alert("Email sent successfully!");
            form.current?.reset();
          },
          (error: Error) => {
            console.error("Error sending email:", error.message);
            alert("Failed to send email. Please try again later.");
          }
        );
    }
  };

  return (
    <>
    <h2>Contact Us</h2>
    <form ref={form} onSubmit={sendEmail}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message: </label>
          <textarea id="message" name="message" rows={4} required></textarea>
        </div>
        <div className="center-container">
        <button className="button-59" type="submit">Send</button>
      </div>
      </form>
      </>
  );
};

export default ContactForm;
