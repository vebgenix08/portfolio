import "./contact.css";
import emailjs from "@emailjs/browser";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import ContactSvg from "./ContactSvg";

const listVariant = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const ref = useRef();
  const form = useRef();

  // Auto-dismiss success/error messages after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        },
      )
      .then(
        () => {
          setSuccess(true);
          setError(false);
          // Reset form fields
          form.current.reset();
        },
        () => {
          setError(true);
          setSuccess(false);
        },
      );
  };

  const isInView = useInView(ref, { margin: "-200px" });

  return (
    <div className="contactWrapper" ref={ref}>
      {/* ROW SECTION */}
      <div className="contactRow">
        {/* LEFT - FORM */}
        <div className="cSection">
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            variants={listVariant}
            animate={isInView ? "animate" : "initial"}
          >
            <motion.h1 variants={listVariant} className="cTitle">
              Let's keep in touch
            </motion.h1>

            <motion.div variants={listVariant} className="formItem">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
              />
            </motion.div>

            <motion.div variants={listVariant} className="formItem">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </motion.div>

            <motion.div variants={listVariant} className="formItem">
              <label>Message</label>
              <textarea
                rows={8}
                name="message"
                placeholder="Write your message..."
                required
              ></textarea>
            </motion.div>

            <motion.button
              variants={listVariant}
              type="submit"
              className="formButton"
            >
              Send
            </motion.button>

            {success && (
              <span className="success">Your message has been sent!</span>
            )}
            {error && <span className="error">Something went wrong!</span>}
          </motion.form>
        </div>

        {/* RIGHT - SVG */}
        <div className="cSection">
          <ContactSvg />
        </div>
      </div>

      {/* BOTTOM TEXT */}
      <div className="contactBottom">
        <p>
          We’re here to help you turn your ideas into powerful digital
          solutions.
        </p>
        <p>
          Whether you need a website, application, or AI-based system, our team
          is ready to assist.
        </p>
        <p>Let’s build something innovative and impactful together.</p>
      </div>
    </div>
  );
};

export default Contact;
