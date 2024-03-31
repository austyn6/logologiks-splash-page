import { useState, useRef, useEffect, createRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "emailjs-com";
import '../styles/ContactForm.css';

const secret_key = {
  mail_service_id: "service_c2o2phg",
  mail_template_id: "template_logologiks",
  mail_public_key: "yCtAwqNqW3fIvLr25",
  recaptcha_site_key: "6LfQhKMpAAAAAAdM0xz8oCoXwAjzrO29XyDGfipL", // This is used in the ReCAPTCHA component
};

export const ContactForm = () => {
  const [status, setStatus] = useState(null);
  const [formValue, setFormValue] = useState({
    user_name: "",
    message: "",
    user_email: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertPrompt, setAlertPrompt] = useState("");
  const refCaptcha = createRef();
  const form = useRef();

  useEffect(() => {
    let timeout;

    if (status === true || false) {
      // Show the info message for 9 seconds
      timeout = setTimeout(() => {
        setAlertPrompt(null);
      }, 10000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
        setStatus(null);
      }
    };
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = refCaptcha.current.getValue();
    setStatus(true);

    const params = {
      ...formValue,
      "g-recaptcha-response": token,
    };

    switch (true) {
      case formValue.user_name === "":
        setAlertMessage("Name cannot be blank");
        setStatus(false);
        break;

      case formValue.user_email === "":
        setAlertMessage("Email address cannot be blank");
        setStatus(false);
        break;

      case token === undefined:
        setAlertMessage("reCAPTCHA error");
        setStatus(false);
        break;

      default:
        emailjs
          .sendForm(
            secret_key.mail_service_id,
            secret_key.mail_template_id,
            form.current,
            secret_key.mail_public_key
          )
          .then(
            (response) => {
              if (response.status === 200) {
                setAlertMessage("Sent successfully");
                setStatus(false);
                setFormValue({});
              }
              // console.log("SUCCESS!", response.status, response.text);
            },
            (err) => {
              setAlertMessage(`Failed: ${err.text}`);
              setStatus(false);
              setFormValue({});
              console.log("FAILED...", err.text);
            }
          );
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="user_name"
        placeholder="Name"
        value={formValue.user_name}
        onChange={(e) =>
          setFormValue({ ...formValue, user_name: e.target.value })
        }
      />
      <input
        type="email"
        name="user_email"
        placeholder="Email"
        value={formValue.user_email}
        onChange={(e) =>
          setFormValue({ ...formValue, user_email: e.target.value })
        }
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formValue.message}
        rols="5"
        onChange={(e) =>
          setFormValue({ ...formValue, message: e.target.value })
        }
      ></textarea>
      <ReCAPTCHA
        sitekey={secret_key.recaptcha_site_key}
        ref={refCaptcha}
        onChange={() => setStatus(null)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;