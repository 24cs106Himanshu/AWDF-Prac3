import { Link } from "react-router-dom";
import About from "../components/About";
import Skills from "../components/Skills";

function Home({ studentName, studentBio, studentDetails, skillList }) {
  return (
    <div className="page-container home-page">
      <About
        name={studentName}
        bio={studentBio}
        details={studentDetails}
      />
      <Skills skillList={skillList} />

      <section className="portfolio-section featured-cta-section">
        <div className="section-container">
          <div className="cta-card">
            <h3>Explore Live GitHub Projects</h3>
            <p>
              View real-time public repositories fetched directly from the GitHub REST API, complete with live search filtering, stars count, and direct links.
            </p>
            <Link to="/projects" className="cta-button">
              View GitHub Projects &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
