import React from "react";
import "./contact.css"



const Contact = () => {
  return (
    <div className="imgformat">
      <h1 className="title">Let Solve Your Quries</h1>
      <div className="content">
        <form className="form">
          <input type="text" placeholder="name" className="input" />
          <input type="text" placeholder="email" className="input" />
          <textarea
            className="textarea"
            placeholder="message"
            cols="30"
            rows="10"
          ></textarea>
          
        </form>
        
      </div>
    </div>
  );
};

export default Contact;




