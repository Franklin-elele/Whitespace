import { useState } from "react";
import html2canvas from "html2canvas";
import { useRef } from "react";


function WhiteSpace() {

    const [fullName, setFullName] = useState("")
    const [jobTitle, setJobTitle] = useState("")
    const [company, setCompany] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [website, setWebsite] = useState("")
    const [theme, setTheme] = useState("")
    const [themeText, setThemeText] = useState("")

    const isFormValid =
        fullName.trim() &&
        jobTitle.trim() &&
        company.trim() &&
        phoneNumber.trim() &&
        email.trim();

    const cardRef = useRef(null); // add this with other useStates

    const handleDownload = () => {
        //           if (
        //     !fullName.trim() ||
        //     !jobTitle.trim() ||
        //     !company.trim() ||
        //     !phoneNumber.trim() ||
        //     !email.trim()
        //   ) {
        //     alert("Please complete all required fields before downloading.");
        //     return;
        //   }

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
                <p>
                    Create professional Business Cards in seconds. Perfect for
                    Freelancers, Startup founders, Job seekers, and Small business owners.
                </p>
            </header>

            <div className="main-content">
                <div className="form-box">
                    <div className="form-group">
                        <label>Full Name*</label>
                        <input type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter FullName" />
                    </div>
                    <div className="form-group">
                        <label>Job Title*</label>
                        <input type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="Job Title" />
                    </div>
                    <div className="form-group">
                        <label>Company*</label>
                        <input type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Company Name" />
                    </div>
                    <div className="form-group">
                        <label>Phone Number*</label>
                        <input type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+234 0000 0000 10 " />
                    </div>
                    <div className="form-group">
                        <label>Email*</label>
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label>Website</label>
                        <input type="url"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="www.website.com" />
                    </div>
                    <div className="form-group">
                        <label>Theme*</label>
                        <input type="color"
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Text-Theme*</label>
                        <input type="color"
                            value={themeText}
                            onChange={(e) => setThemeText(e.target.value)} />
                    </div>

                    <button className="download-btn"
                        onClick={handleDownload}
                        disabled={!isFormValid}
                        style={{
                            backgroundColor: isFormValid ? "#000" : "#ccc",
                            color: isFormValid ? "#fff" : "#666",
                            cursor: isFormValid ? "pointer" : "not-allowed"
                        }}>Download</button>
                </div>
                <div className="card-preview" ref={cardRef} style={{ backgroundColor: theme }}>
                    <div className="circle-shape" ></div>
                    <div className="card-content">
                        <p className="card-text">Full Name : <span style={{ fontSize: '20px', color: themeText }}>{fullName ? fullName.toLocaleUpperCase() : "YOUR NAME"}</span></p>
                        <p className="card-text2">Job Title : <span style={{ fontSize: '20px', color: themeText }}>{jobTitle ? jobTitle.toLocaleUpperCase() : "YOUR JOB TITLE"}</span></p>
                        <p className="card-text3">Company : <span style={{ fontSize: '20px', color: themeText }}>{company ? company.toLocaleUpperCase() : "YOUR COMPANY"}</span></p>
                        <p className="card-text4">Phone Number : <span style={{ fontSize: '20px', color: themeText }}>{phoneNumber ? phoneNumber : "YOUR NUMBER"}</span></p>
                        <p className="card-text5">Email : <span style={{ fontSize: '20px', color: themeText }}>{email ? email : "YOUR EMAIL"}</span></p>
                        <p className="card-text6">Website : <span style={{ fontSize: '20px', color: themeText }}>{website ? website : "YOUR WEBSITE"}</span></p>
                    </div>
                    <div className="circle-shape2"></div>
                </div>
            </div>
        </div>
    );
}

export default WhiteSpace;
