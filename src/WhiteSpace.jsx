import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import { IoIosMail } from "react-icons/io";
import { IoMdCall } from "react-icons/io";




const TEMPLATES = ["Minimal", "Wave", "Glass"];

const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;

// simple contrast helper
function getIdealTextColor(bgHex) {
  const hex = bgHex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // luminance
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140 ? "#111111" : "#FFFFFF";
}

export default function WhiteSpace() {
  // form fields
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  // theming
  const [primary, setPrimary] = useState("hsla(338, 17%, 59%, 1.00)"); // you asked for A88491 default
  const [secondary, setSecondary] = useState("#4C2A34"); // deeper complement
  const [angle, setAngle] = useState(135);
  const [template, setTemplate] = useState("Minimal");

  // text color auto/override
  const autoText = useMemo(() => getIdealTextColor(primary), [primary]);
  const [textColor, setTextColor] = useState(autoText);
  // keep textColor in sync with primary if user hasn’t overridden:
  const [manualText, setManualText] = useState(false);
  if (!manualText && textColor !== autoText) setTextColor(autoText);

  // logo upload + controls
  const [logoDataUrl, setLogoDataUrl] = useState(null);
  const [logoScale, setLogoScale] = useState(70); // px
  const [logoCorner, setLogoCorner] = useState("top-right"); // top-left | top-right | bottom-left | bottom-right
  const [logoOpacity, setLogoOpacity] = useState(0.9);

  const isFormValid =
    fullName.trim() &&
    jobTitle.trim() &&
    company.trim() &&
    phoneNumber.trim() &&
    email.trim();

  const cardRef = useRef(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    // temporarily remove motion transforms for a clean capture
    const el = cardRef.current;
    el.style.transform = "none";
    const canvas = await html2canvas(el, {
      useCORS: true,
      backgroundColor: null,
      scale: 2,
    });
    const link = document.createElement("a");
    link.download = `${fullName || "business-card"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const onLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => setLogoDataUrl(evt.target.result);
    reader.readAsDataURL(file);
  };

  const randomizePalette = () => {
    const p = randomHex();
    // choose a different secondary; ensure decent contrast (naively pick another random)
    let s = randomHex();
    // avoid being too close:
    if (s.toLowerCase() === p.toLowerCase()) s = randomHex();
    setPrimary(p);
    setSecondary(s);
    setAngle(Math.floor(Math.random() * 360));
    setManualText(false); // re-enable auto
  };

  const gradient = `linear-gradient(${angle}deg, ${primary}, ${secondary})`;

  // decorative blobs animation values
  const blobTransition = { duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" };

  // card size (business card aspect ~ 3.5x2 in). We’ll render scaled visually:
  const CARD_W = 360;
  const CARD_H = 206;

  // template specific class
  const templateClass = `card ${template.toLowerCase()}-tpl`;

  // corner positioning for logo
  const cornerStyle = (() => {
    const pad = 12;
    switch (logoCorner) {
      case "top-left":
        return { top: pad, left: pad };
      case "top-right":
        return { top: pad, right: pad };
      case "bottom-left":
        return { bottom: pad, left: pad };
      case "bottom-right":
      default:
        return { bottom: pad, right: pad };
    }
  })();

  return (
    <div className="ws-wrap">
      <header className="ws-header">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          White Space
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="subtitle"
        >
          Animated Business Card Generator
        </motion.p>
      </header>

      <div className="ws-main">
        {/* LEFT: FORM */}
        <motion.section
          className="ws-form"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <div className="grid">
            <div className="fg">
              <label>Full Name*</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Ada Lovelace" />
            </div>
            <div className="fg">
              <label>Job Title*</label>
              <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Software Engineer" />
            </div>
            <div className="fg">
              <label>Company*</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="White Space Ltd." />
            </div>
            <div className="fg">
              <label>Phone Number*</label>
              <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+234 0000 0000 10" />
            </div>
            <div className="fg">
              <label>Email*</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
            </div>
            <div className="fg">
              <label>Website</label>
              <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="www.website.com" />
            </div>

            <div className="row-split">
              <div className="fg">
                <label>Primary</label>
                <input type="color" value={primary} onChange={(e) => setPrimary(e.target.value)} />
              </div>
              <div className="fg">
                <label>Secondary</label>
                <input type="color" value={secondary} onChange={(e) => setSecondary(e.target.value)} />
              </div>
              <div className="fg">
                <label>Angle</label>
                <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
              </div>
            </div>

            <div className="row-split">
              <div className="fg">
                <label>Text Color</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => {
                    setManualText(true);
                    setTextColor(e.target.value);
                  }}
                />
                <button type="button" className="mini" onClick={() => setManualText(false)}>
                  Auto
                </button>
              </div>

              <div className="fg">
                <label>Template</label>
                <select value={template} onChange={(e) => setTemplate(e.target.value)}>
                  {TEMPLATES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="fg">
                <label style={{ visibility: "hidden" }}>.</label>
                <button type="button" onClick={randomizePalette}> Randomize</button>
              </div>
            </div>

            <div className="logo-panel">
              <div className="fg">
                <label>Logo</label>
                <input type="file" accept="image/*" onChange={onLogoUpload} />
              </div>
              <div className="fg">
                <label>Logo Size</label>
                <input
                  type="range"
                  min="32"
                  max="120"
                  value={logoScale}
                  onChange={(e) => setLogoScale(Number(e.target.value))}
                />
              </div>
              <div className="fg">
                <label>Logo Corner</label>
                <select value={logoCorner} onChange={(e) => setLogoCorner(e.target.value)}>
                  <option>top-left</option>
                  <option>top-right</option>
                  <option>bottom-left</option>
                  <option>bottom-right</option>
                </select>
              </div>
              <div className="fg">
                <label>Logo Opacity</label>
                <input
                  type="range"
                  min="0.2"
                  max="1"
                  step="0.05"
                  value={logoOpacity}
                  onChange={(e) => setLogoOpacity(Number(e.target.value))}
                />
              </div>
            </div>

            <motion.button
              type="button"
              className="download"
              disabled={!isFormValid}
              onClick={handleDownload}
              whileTap={{ scale: isFormValid ? 0.98 : 1 }}
              animate={{ background: gradient, color: getIdealTextColor(primary) }}
            >
              {isFormValid ? "Download Card" : "Fill required fields to download"}
            </motion.button>
          </div>
        </motion.section>

        {/* RIGHT: PREVIEW */}
        <motion.section
          className="ws-preview"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.05 }}
        >
          {/* animated background blobs behind the card */}
          <motion.div
            className="blob blob-1"
            style={{ background: primary }}
            animate={{ x: [0, -12, 0], y: [0, -6, 0], scale: [1, 1.05, 1] }}
            transition={blobTransition}
          />
          <motion.div
            className="blob blob-2"
            style={{ background: secondary }}
            animate={{ x: [0, 10, 0], y: [0, 14, 0], scale: [1, 1.07, 1] }}
            transition={{ ...blobTransition, duration: 10 }}
          />

          <motion.div
            ref={cardRef}
            className={templateClass}
            style={{
              width: CARD_W,
              height: CARD_H,
              "--primary": primary,
              "--secondary": secondary,
              "--angle": `${angle}deg`,
              "--text": textColor,
              background: gradient,
            }}
            initial={{ rotate: -2, opacity: 0, y: 20 }}
            animate={{ rotate: 0, opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, rotate: 0.5 }}
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
          >
            {/* template overlays */}
            <AnimatePresence mode="wait">
              {template === "Wave" && (
                <motion.div
                  key="wave"
                  className="wave-overlay"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.28, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45 }}
                />
              )}
              {template === "Glass" && (
                <motion.div
                  key="glass"
                  className="glass-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                />
              )}
            </AnimatePresence>

            {/* rotating ring accent */}
            <motion.div
              className="ring"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />

            {/* logo */}
            {logoDataUrl && (
              <motion.img
                src={logoDataUrl}
                alt="Logo"
                className="logo"
                style={{ width: logoScale, height: logoScale, opacity: logoOpacity, ...cornerStyle }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: logoOpacity }}
                transition={{ type: "spring", stiffness: 140, damping: 12 }}
              />
            )}

            {/* text content */}
            <div className="card-body" style={{ color: "var(--text)" }}>
              <div className="stack">
                <div className="name">{fullName || "YOUR NAME"}</div>
                <div className="title">{jobTitle || "YOUR JOB TITLE"}</div>
                <div className="company">{company || "YOUR COMPANY"}</div>
              </div>

              <div className="divider" />

              <div className="stack small">
                <div><IoMdCall /> {phoneNumber || "+234 0000 0000 10"}</div>
                <div><IoIosMail /> {email || "you@email.com"}</div>
                {website?.trim() && <div>🔗 {website}</div>}
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
