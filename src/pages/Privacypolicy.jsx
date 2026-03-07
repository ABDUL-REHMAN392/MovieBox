const sections = [
  {
    num: "01",
    title: "Introduction",
    content: (
      <>
        <p>Welcome to MovieBox. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our service.</p>
        <p>By using MovieBox, you agree to the collection and use of information in accordance with this policy.</p>
      </>
    ),
  },
  {
    num: "02",
    title: "Information We Collect",
    content: (
      <>
        <p>We collect the following information when you register or sign in:</p>
        <ul>
          <li>Name and email address (via Google Sign-In or email registration)</li>
          <li>Profile picture (from Google account or uploaded by you)</li>
          <li>Your saved favorite movies and TV shows</li>
          <li>Last login date and time</li>
        </ul>
        <div className="highlight">
          <p>We do not collect payment information, location data, or any sensitive personal information.</p>
        </div>
      </>
    ),
  },
  {
    num: "03",
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use the collected information solely to provide and improve our service:</p>
        <ul>
          <li>To create and manage your account</li>
          <li>To save and display your favorite movies and shows</li>
          <li>To authenticate you securely via Google OAuth</li>
          <li>To personalize your experience on MovieBox</li>
        </ul>
        <p>We do not sell, trade, or share your personal information with third parties for marketing purposes.</p>
      </>
    ),
  },
  {
    num: "04",
    title: "Google Sign-In",
    content: (
      <>
        <p>MovieBox uses Google OAuth for authentication. When you sign in with Google, we receive your basic profile information (name, email, profile picture) as permitted by you during the sign-in process.</p>
        <p>We only request the minimum necessary permissions: your public profile and email address. We do not access your Google Drive, Gmail, contacts, or any other Google services.</p>
      </>
    ),
  },
  {
    num: "05",
    title: "Data Security",
    content: (
      <>
        <p>We take reasonable measures to protect your personal information. Your password is encrypted using industry-standard hashing. Authentication tokens are stored securely and expire automatically.</p>
        <p>However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
      </>
    ),
  },
  {
    num: "06",
    title: "Your Rights",
    content: (
      <p>You have the right to access, update, or delete your personal information at any time through your profile settings. You may also delete your account entirely, which will permanently remove all your data from our systems.</p>
    ),
  },
  {
    num: "07",
    title: "Contact Us",
    content: (
      <>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <div className="contact-card">
          <div className="contact-row">
            <span className="contact-label">App</span>
            <span className="contact-value">MovieBox</span>
          </div>
          <div className="contact-row">
            <span className="contact-label">Email</span>
            <a href="mailto:gogetahawmm@gmail.com" className="contact-link">gogetahawmm@gmail.com</a>
          </div>
          <div className="contact-row">
            <span className="contact-label">Website</span>
            <a href="https://moviebox-stream.netlify.app" target="_blank" rel="noreferrer" className="contact-link">moviebox-stream.netlify.app</a>
          </div>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .pp-root {
          min-height: 100vh;
          background: #080808;
          color: #e8e8e8;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          position: relative;
          overflow-x: hidden;
        }

        .pp-root::before {
          content: '';
          position: fixed;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(41,227,173,0.055) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .pp-wrapper {
          position: relative;
          z-index: 1;
          max-width: 740px;
          margin: 0 auto;
          padding: 0 24px 100px;
        }

        /* HEADER */
        .pp-header {
          padding: 52px 0 52px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 60px;
        }

        .pp-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 36px;
          text-decoration: none;
        }

        .pp-logo-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #29e3ad;
          box-shadow: 0 0 14px #29e3ad;
        }

        .pp-logo-name {
          font-family: 'DM Serif Display', serif;
          font-size: 18px;
          color: #e8e8e8;
          letter-spacing: 0.02em;
        }

        .pp-tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #29e3ad;
          background: rgba(41,227,173,0.1);
          border: 1px solid rgba(41,227,173,0.2);
          padding: 4px 12px;
          border-radius: 100px;
          margin-bottom: 18px;
        }

        .pp-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(34px, 6vw, 52px);
          font-weight: 400;
          line-height: 1.12;
          color: #fff;
          margin-bottom: 14px;
        }

        .pp-title em {
          font-style: italic;
          color: #29e3ad;
        }

        .pp-date {
          font-size: 13px;
          color: #444;
          letter-spacing: 0.03em;
        }

        /* SECTIONS */
        .pp-section {
          margin-bottom: 0;
          padding: 44px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          animation: ppFadeUp 0.5s ease both;
        }

        .pp-section:last-child {
          border-bottom: none;
        }

        @keyframes ppFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pp-section:nth-child(1) { animation-delay: 0.05s; }
        .pp-section:nth-child(2) { animation-delay: 0.10s; }
        .pp-section:nth-child(3) { animation-delay: 0.15s; }
        .pp-section:nth-child(4) { animation-delay: 0.20s; }
        .pp-section:nth-child(5) { animation-delay: 0.25s; }
        .pp-section:nth-child(6) { animation-delay: 0.30s; }
        .pp-section:nth-child(7) { animation-delay: 0.35s; }

        .pp-num {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #3a3a3a;
          margin-bottom: 10px;
        }

        .pp-section h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          font-weight: 400;
          color: #fff;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .pp-section p {
          font-size: 15px;
          color: #888;
          line-height: 1.85;
          margin-bottom: 12px;
        }

        .pp-section p:last-child { margin-bottom: 0; }

        /* LIST */
        .pp-section ul {
          list-style: none;
          margin: 10px 0 14px;
          padding: 0;
        }

        .pp-section ul li {
          font-size: 15px;
          color: #888;
          line-height: 1.8;
          padding: 5px 0 5px 20px;
          position: relative;
        }

        .pp-section ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #29e3ad;
          opacity: 0.5;
        }

        /* HIGHLIGHT */
        .highlight {
          background: rgba(41,227,173,0.07);
          border: 1px solid rgba(41,227,173,0.14);
          border-left: 3px solid #29e3ad;
          border-radius: 8px;
          padding: 14px 18px;
          margin-top: 14px;
        }

        .highlight p {
          font-size: 14px !important;
          color: rgba(41,227,173,0.8) !important;
          margin: 0 !important;
        }

        /* CONTACT CARD */
        .contact-card {
          background: #0f0f0f;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 4px 22px;
          margin-top: 18px;
        }

        .contact-row {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .contact-row:last-child { border-bottom: none; }

        .contact-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #444;
          min-width: 70px;
        }

        .contact-value {
          font-size: 14px;
          color: #ccc;
        }

        .contact-link {
          font-size: 14px;
          color: #29e3ad;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .contact-link:hover { opacity: 0.75; }

        /* FOOTER */
        .pp-footer {
          margin-top: 60px;
          padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .pp-footer-logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pp-footer-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #29e3ad;
        }

        .pp-footer-name {
          font-family: 'DM Serif Display', serif;
          font-size: 15px;
          color: #333;
        }

        .pp-footer-copy {
          font-size: 12px;
          color: #333;
        }
      `}</style>

      <div className="pp-root">
        <div className="pp-wrapper">

          {/* Header */}
          <header className="pp-header">
            <a href="https://moviebox-stream.netlify.app" className="pp-logo">
              <div className="pp-logo-dot" />
              <span className="pp-logo-name">MovieBox</span>
            </a>
            <div className="pp-tag">Legal</div>
            <h1 className="pp-title">Privacy <em>Policy</em></h1>
            <p className="pp-date">Effective date: June 2025 &nbsp;·&nbsp; Last updated: June 2025</p>
          </header>

          {/* Sections */}
          <main>
            {sections.map((s) => (
              <section className="pp-section" key={s.num}>
                <div className="pp-num">{s.num}</div>
                <h2>{s.title}</h2>
                {s.content}
              </section>
            ))}
          </main>

          {/* Footer */}
          <footer className="pp-footer">
            <div className="pp-footer-logo">
              <div className="pp-footer-dot" />
              <span className="pp-footer-name">MovieBox</span>
            </div>
            <span className="pp-footer-copy">© 2025 MovieBox. All rights reserved.</span>
          </footer>

        </div>
      </div>
    </>
  );
}