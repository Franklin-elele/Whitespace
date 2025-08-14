import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import GiftCardSVG from "./assets/Gift card-rafiki.svg";
import CreditCardSVG from "./assets/Credit card-rafiki.svg";

function WhiteSpace() {
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [theme, setTheme] = useState("#A88491");
  const [themeText, setThemeText] = useState("#ffffff");

  const isFormValid =
    fullName.trim() &&
    jobTitle.trim() &&
    company.trim() &&
    phoneNumber.trim() &&
    email.trim();

  const cardRef = useRef(null);

  const handleDownload = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = `${fullName || "business-card"}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>White Space</h1>
        <h2>Business Card Generator</h2>
        <p>Create beautiful, professional cards in seconds.</p>
      </header>

      <div className="main-content">
        {/* Left - Form */}
        <div className="form-box">
          <div className="form-group">
            <label>Full Name*</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter Full Name"
            />
          </div>
          <div className="form-group">
            <label>Job Title*</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job Title"
            />
          </div>
          <div className="form-group">
            <label>Company*</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company Name"
            />
          </div>
          <div className="form-group">
            <label>Phone Number*</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+234 0000 0000 10"
            />
          </div>
          <div className="form-group">
            <label>Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label>Website</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="www.website.com"
            />
          </div>
          <div className="form-group">
            <label>Theme*</label>
            <input
              type="color"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Text-Theme*</label>
            <input
              type="color"
              value={themeText}
              onChange={(e) => setThemeText(e.target.value)}
            />
          </div>
          <button
            className="download-btn"
            onClick={handleDownload}
            disabled={!isFormValid}
            style={{
              backgroundColor: isFormValid ? theme : "#ccc",
              color: "#fff",
            }}
          >
            Download
          </button>
        </div>

        {/* Right - Card Preview */}
        <div className="card-preview-container">
          <div
            className="card-preview"
            ref={cardRef}
            style={{ backgroundColor: theme }}
          >
            <img src={CreditCardSVG} alt="Decor 1" className="card-shape top" />
            <div className="card-content">
              <p style={{ color: themeText, fontWeight: "bold", fontSize: "1.2rem" }}>
                {fullName || "YOUR NAME"}
              </p>
              <p style={{ color: themeText }}>{jobTitle || "YOUR JOB TITLE"}</p>
              <p style={{ color: themeText }}>{company || "YOUR COMPANY"}</p>
              <p style={{ color: themeText }}>{phoneNumber || "YOUR NUMBER"}</p>
              <p style={{ color: themeText }}>{email || "YOUR EMAIL"}</p>
              {website && <p style={{ color: themeText }}>{website}</p>}
            </div>
            <img src={GiftCardSVG} alt="Decor 2" className="card-shape bottom" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhiteSpace;
