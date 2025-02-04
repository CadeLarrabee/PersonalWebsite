import "../css/Resume.css";

const Resume = () => {
  return (
    <div className="window98">
      {/* Title Bar */}
      <div className="title-bar">
        <span className="title-text">Resume - Windows 98 Explorer</span>
        <div className="window-controls">
          <span className="minimize"></span>
          <span className="maximize"></span>
          <span className="close"></span>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="nav-bar">
        <span className="nav-btn">File</span>
        <span className="nav-btn">Edit</span>
        <span className="nav-btn">View</span>
        <span className="nav-btn">Help</span>
      </div>

      {/* Window Content (Resume) */}
      <div className="window-content">
        <div className="resume-section">
          <h2 className="section-title">Cade Larrabee</h2>
          <p>
            <strong>📍 Location:</strong> Chestnut Hill, MA
          </p>
          <p>
            <strong>📧 Email:</strong>{" "}
            <a href="mailto:LarrabeeCade@gmail.com">LarrabeeCade@gmail.com</a>
          </p>
          <p>
            <strong>📞 Phone:</strong> 774-236-0806
          </p>
          <p>
            <a href="https://github.com/CadeLarrabee" target="_blank">
              View my works on GitHub
            </a>
          </p>
        </div>

        <div className="resume-section">
          <h3 className="section-title">Summary</h3>
          <p>
            Medical Software Engineer with 7+ years of experience in healthcare
            software development...
          </p>
        </div>

        <div className="resume-section">
          <h3 className="section-title">Experience</h3>
          <p>
            <strong>Meditech</strong> - Web Physician Documentation Programmer
            Analyst (2017 - 2024)
          </p>
          <ul>
            <li>
              Developed SaaS for 48 hospitals, following strict HIPAA privacy
              standards.
            </li>
            <li>Designed & debugged patches for patient safety systems.</li>
          </ul>

          <p>
            <strong>Connelly Partners</strong> - JavaScript Development Intern
            (2015)
          </p>
          <ul>
            <li>Developed HTML5 Canvas-based games with React & PixiJS.</li>
          </ul>
        </div>

        <div className="resume-section">
          <h3 className="section-title">Education</h3>
          <p>
            <strong>Becker College</strong> - B.A. Interactive Media Design
            (2012-2016)
          </p>
          <p>
            <strong>The Odin Project</strong> - Full Stack Web Development
            (2024)
          </p>
        </div>

        <div className="resume-section">
          <h3 className="section-title">Skills</h3>
          <p>
            React, Node.js, PostgreSQL, Docker, C++, Unity, AI Pathfinding...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resume;
