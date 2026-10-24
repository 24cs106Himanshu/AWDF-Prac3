import { useState } from "react";

function Contact({ studentEmail = "24cs106@charusat.edu.in" }) {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const MAX_CHARS = 300;

  const validateForm = () => {
    const errors = {};
    if (!senderName.trim()) {
      errors.name = "Please enter your name.";
    } else if (senderName.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }

    if (!senderEmail.trim()) {
      errors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!message.trim()) {
      errors.message = "Message cannot be empty.";
    } else if (message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSubmittedData({
        name: senderName.trim(),
        email: senderEmail.trim(),
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString(),
      });
    } else {
      setSubmittedData(null);
    }
  };

  const handleReset = () => {
    setSenderName("");
    setSenderEmail("");
    setMessage("");
    setValidationErrors({});
    setSubmittedData(null);
  };

  return (
    <div className="page-container contact-page">
      <section className="portfolio-section contact-section">
        <div className="section-container">
          <div className="section-header-block">
            <h2 className="section-heading">Contact Me</h2>
            <p className="section-subtext">
              Demonstrating controlled form inputs, real-time state synchronization, character counting, and conditional rendering.
            </p>
          </div>

          <div className="contact-layout-grid">
            <div className="form-card">
              <div className="form-header-row">
                <h3 className="card-title">Send a Message</h3>
                <button
                  type="button"
                  className="tooltip-toggle-btn"
                  onClick={() => setShowHelpTooltip((prev) => !prev)}
                  aria-expanded={showHelpTooltip}
                  aria-controls="contact-help-panel"
                >
                  {showHelpTooltip ? "✕ Hide Guidelines" : "💡 Show Guidelines"}
                </button>
              </div>

              {showHelpTooltip && (
                <div id="contact-help-panel" className="help-tooltip-panel" role="region">
                  <h4>Helpful Submission Guidelines</h4>
                  <ul>
                    <li>State your purpose clearly (academic inquiry, collaboration, or feedback).</li>
                    <li>Ensure your email address is formatted correctly so we can reply.</li>
                    <li>The message input is limited to {MAX_CHARS} characters and tracked live.</li>
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="contact-form">
                <div className="form-field">
                  <label htmlFor="contact-name" className="field-label">
                    Full Name <span className="required-star">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => {
                      setSenderName(e.target.value);
                      if (validationErrors.name) {
                        setValidationErrors((prev) => ({ ...prev, name: null }));
                      }
                    }}
                    placeholder="e.g., Alex Johnson"
                    className={`text-input ${validationErrors.name ? "input-error" : ""}`}
                    aria-describedby={validationErrors.name ? "name-error" : undefined}
                    required
                  />
                  {validationErrors.name && (
                    <span id="name-error" className="error-message">
                      {validationErrors.name}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="contact-email" className="field-label">
                    Email Address <span className="required-star">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={senderEmail}
                    onChange={(e) => {
                      setSenderEmail(e.target.value);
                      if (validationErrors.email) {
                        setValidationErrors((prev) => ({ ...prev, email: null }));
                      }
                    }}
                    placeholder="e.g., alex@example.com"
                    className={`text-input ${validationErrors.email ? "input-error" : ""}`}
                    aria-describedby={validationErrors.email ? "email-error" : undefined}
                    required
                  />
                  {validationErrors.email && (
                    <span id="email-error" className="error-message">
                      {validationErrors.email}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="contact-message" className="field-label">
                    Your Message <span className="required-star">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows="4"
                    maxLength={MAX_CHARS}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (validationErrors.message) {
                        setValidationErrors((prev) => ({ ...prev, message: null }));
                      }
                    }}
                    placeholder="Type your message here..."
                    className={`text-input textarea-input ${
                      validationErrors.message ? "input-error" : ""
                    }`}
                    aria-describedby="char-count message-error"
                    required
                  />
                  <div className="char-count-row">
                    <span
                      id="char-count"
                      className={`char-counter ${
                        message.length >= MAX_CHARS ? "limit-reached" : ""
                      }`}
                    >
                      Character count: <strong>{message.length}</strong> / {MAX_CHARS}
                    </span>
                    {validationErrors.message && (
                      <span id="message-error" className="error-message">
                        {validationErrors.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    Submit Message
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="reset-btn"
                  >
                    Clear
                  </button>
                </div>
              </form>

              {submittedData && (
                <div className="submission-notice" role="status">
                  <div className="notice-icon">✓</div>
                  <div className="notice-content">
                    <strong>Local State Submission Captured ({submittedData.timestamp}):</strong>
                    <p>
                      Form input validated and stored in React component state.
                      <em> (Note: No external email server is connected in Practical 3).</em>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="preview-card">
              <h3 className="card-title">⚡ Real-time State Monitor</h3>
              <p className="preview-info">
                The content below reflects the component&apos;s <code>useState</code> variables in real time as you type:
              </p>

              <div className="live-preview-box">
                <div className="preview-field">
                  <span className="preview-label">Name State:</span>
                  <span className="preview-value">
                    {senderName ? senderName : <em>(waiting for input)</em>}
                  </span>
                </div>

                <div className="preview-field">
                  <span className="preview-label">Email State:</span>
                  <span className="preview-value">
                    {senderEmail ? senderEmail : <em>(waiting for input)</em>}
                  </span>
                </div>

                <div className="preview-field message-preview">
                  <span className="preview-label">Live Message Preview:</span>
                  <div className="live-message-bubble">
                    {message ? (
                      message
                    ) : (
                      <span className="placeholder-text">
                        Your entered message text will appear here character-by-character...
                      </span>
                    )}
                  </div>
                </div>

                <div className="preview-field">
                  <span className="preview-label">Guideline Visibility State:</span>
                  <span className="preview-badge">
                    {showHelpTooltip ? "VISIBLE (true)" : "HIDDEN (false)"}
                  </span>
                </div>
              </div>

              <div className="direct-contact-card">
                <h4>Direct Academic Contact</h4>
                <p>
                  Reach out directly via email at:{" "}
                  <a href={`mailto:${studentEmail}`} className="direct-email-link">
                    {studentEmail}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
