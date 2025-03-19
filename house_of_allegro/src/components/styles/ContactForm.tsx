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
    <form ref={form} onSubmit={sendEmail}>
      <div>
        <label htmlFor="user_name">Name:</label>
        <input type="text" id="user_name" name="user_name" required />
      </div>
      <div>
        <label htmlFor="user_email">Email:</label>
        <input type="email" id="user_email" name="user_email" required />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required />
      </div>
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
