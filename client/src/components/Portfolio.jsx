import React from 'react';
import ContactForm from './ContactForm';

function Portfolio() {
    return (
        <div className="App">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center min-vh-100">
                        <div className="col-lg-8 mx-auto text-center">
                            <div className="hero-content">
                                <h1 className="display-1 hero-title mb-3">
                                    PRATYUSH TRIPATHI
                                </h1>
                                <p className="lead hero-subtitle mb-4">
                                    Pharmacy & Supply Chain Professional
                                </p>

                                <div className="contact-badges d-flex flex-wrap justify-content-center gap-3 mb-4">
                                    <a href="mailto:tpratyush0@gmail.com" className="badge-link">
                                        <i className="bi bi-envelope-fill"></i>
                                        <span>tpratyush0@gmail.com</span>
                                    </a>
                                    <a href="tel:+919532533060" className="badge-link">
                                        <i className="bi bi-telephone-fill"></i>
                                        <span>+91 9532533060</span>
                                    </a>
                                    <div className="badge-link">
                                        <i className="bi bi-geo-alt-fill"></i>
                                        <span>Lucknow, U.P, 226028</span>
                                    </div>
                                </div>

                                <div className="scroll-indicator">
                                    <i className="bi bi-chevron-down"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Professional Summary Section */}
            <section className="section-wrapper summary-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <div className="section-header text-center mb-5">
                                <h2 className="section-title">Professional Summary</h2>
                                <div className="title-underline"></div>
                            </div>
                            <div className="summary-card">
                                <p className="summary-text">
                                    Highly dedicated and results-oriented professional with a strong foundation in Pharmacy (D.Pharm) and
                                    Sanitation (DS), combined with 2-3 years of practical experience in inventory management, supply chain
                                    operations, and store management. Proven ability to efficiently manage stock, maintain meticulous records
                                    using TALLY ACCOUNTING SOFTWARE, and ensure compliance with operational standards. Seeking a challenging
                                    role in the Health Care or Sales sector to leverage comprehensive problem-solving abilities and dedication.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="section-wrapper experience-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <div className="section-header text-center mb-5">
                                <h2 className="section-title">Professional Experience</h2>
                                <div className="title-underline"></div>
                            </div>

                            <div className="timeline">
                                <div className="timeline-item">
                                    <div className="timeline-marker"></div>
                                    <div className="timeline-content">
                                        <div className="experience-card">
                                            <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
                                                <div>
                                                    <h3 className="company-name">KUNWAR TRADERS</h3>
                                                    <p className="job-title">Store In-charge</p>
                                                </div>
                                                <div className="text-end">
                                                    <span className="period-badge">2023 - 2025</span>
                                                    <p className="location">Lucknow, UP</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="timeline-item">
                                    <div className="timeline-marker"></div>
                                    <div className="timeline-content">
                                        <div className="experience-card">
                                            <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
                                                <div>
                                                    <h3 className="company-name">PARAS PHARMACY</h3>
                                                    <p className="job-title">Pharmacy Assistant / Store Incharge</p>
                                                </div>
                                                <div className="text-end">
                                                    <span className="period-badge">2020 - 2023</span>
                                                    <p className="location">Babhnan, Gonda, U.P, 271313</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="responsibilities-card mt-4">
                                <h4 className="mb-3">Key Responsibilities</h4>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="responsibility-item">
                                            <i className="bi bi-check-circle-fill"></i>
                                            <div>
                                                <strong>Inventory Management:</strong> Efficiently managed stock using TALLY ACCOUNTING
                                                SOFTWARE, ensuring accurate and up-to-date inventory records for accountability.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="responsibility-item">
                                            <i className="bi bi-check-circle-fill"></i>
                                            <div>
                                                <strong>Logistics & Operations:</strong> Oversaw comprehensive receiving and dispatching
                                                processes, including inspecting all incoming goods for damage and processing necessary documentation.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="section-wrapper skills-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <div className="section-header text-center mb-5">
                                <h2 className="section-title">Key Skills</h2>
                                <div className="title-underline"></div>
                            </div>

                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="skills-card">
                                        <div className="skills-card-header">
                                            <i className="bi bi-laptop"></i>
                                            <h3>Technical & Accounting</h3>
                                        </div>
                                        <div className="skills-list">
                                            <div className="skill-item">
                                                <i className="bi bi-chevron-right"></i>
                                                <span>TALLY ACCOUNTING SOFTWARE (Inventory Management)</span>
                                            </div>
                                            <div className="skill-item">
                                                <i className="bi bi-chevron-right"></i>
                                                <span>Inventory Control and Stock Management</span>
                                            </div>
                                            <div className="skill-item">
                                                <i className="bi bi-chevron-right"></i>
                                                <span>Goods Receiving Note (GRN) Documentation</span>
                                            </div>
                                            <div className="skill-item">
                                                <i className="bi bi-chevron-right"></i>
                                                <span>Order Fulfillment and Dispatch Logistics</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="skills-card">
                                        <div className="skills-card-header">
                                            <i className="bi bi-people"></i>
                                            <h3>Soft Skills & Interpersonal</h3>
                                        </div>
                                        <div className="skills-list">
                                            <div className="skill-item">
                                                <i className="bi bi-chevron-right"></i>
                                                <span>Comprehensive Problem-Solving Abilities</span>
                                            </div>
                                            <div className="skill-item">
                                                <i className="bi bi-chevron-right"></i>
                                                <span>Excellent Verbal and Written Communication Skills</span>
                                            </div>
                                            <div className="skill-item">
                                                <i className="bi bi-chevron-right"></i>
                                                <span>Adaptability and Team Facilitation</span>
                                            </div>
                                            <div className="skill-item">
                                                <i className="bi bi-chevron-right"></i>
                                                <span>Strong Work Ethic & Punctuality</span>
                                            </div>
                                            <div className="skill-item">
                                                <i className="bi bi-chevron-right"></i>
                                                <span>Diplomacy in dealing with people</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section className="section-wrapper education-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <div className="section-header text-center mb-5">
                                <h2 className="section-title">Education & Qualifications</h2>
                                <div className="title-underline"></div>
                            </div>

                            <div className="education-grid">
                                <div className="education-card">
                                    <div className="education-icon">
                                        <i className="bi bi-mortarboard-fill"></i>
                                    </div>
                                    <h3 className="degree-name">Diploma in Pharmacy (D.Pharm)</h3>
                                    <p className="institution">J.B.S Institute of Pharmacy (UP)</p>
                                    <p className="education-details">BTEUP, Uttar Pradesh</p>
                                    <div className="education-footer">
                                        <span className="year-badge">2021</span>
                                        <span className="percentage-badge">78%</span>
                                    </div>
                                </div>

                                <div className="education-card">
                                    <div className="education-icon">
                                        <i className="bi bi-prescription2"></i>
                                    </div>
                                    <h3 className="degree-name">Diploma in Sanitation (DS)</h3>
                                    <p className="institution">KGMU Institute of Paramedical Sciences, LKO (UP)</p>
                                    <p className="education-details">1-Year Program</p>
                                    <div className="education-footer">
                                        <span className="year-badge">2019</span>
                                    </div>
                                </div>

                                <div className="education-card">
                                    <div className="education-icon">
                                        <i className="bi bi-book-fill"></i>
                                    </div>
                                    <h3 className="degree-name">12th Standard</h3>
                                    <p className="institution">R L S Smarak Inter College, Gonda (UP)</p>
                                    <p className="education-details">UP Board</p>
                                    <div className="education-footer">
                                        <span className="year-badge">2015</span>
                                        <span className="percentage-badge">84%</span>
                                    </div>
                                </div>

                                <div className="education-card">
                                    <div className="education-icon">
                                        <i className="bi bi-book"></i>
                                    </div>
                                    <h3 className="degree-name">10th Standard</h3>
                                    <p className="institution">Adarsh Janta Inter College, Gonda (UP)</p>
                                    <p className="education-details">UP Board</p>
                                    <div className="education-footer">
                                        <span className="year-badge">2013</span>
                                        <span className="percentage-badge">85%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Languages Section */}
            <section className="section-wrapper languages-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <div className="section-header text-center mb-5">
                                <h2 className="section-title">Languages</h2>
                                <div className="title-underline"></div>
                            </div>

                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="language-card">
                                        <i className="bi bi-translate"></i>
                                        <h3>Hindi</h3>
                                        <p>Native</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="language-card">
                                        <i className="bi bi-globe"></i>
                                        <h3>English</h3>
                                        <p>Proficient</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section with Form */}
            <section className="section-wrapper contact-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <div className="section-header text-center mb-5">
                                <h2 className="section-title">Get In Touch</h2>
                                <div className="title-underline"></div>
                            </div>

                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer-section">
                <div className="container">
                    <div className="text-center">
                        <p className="mb-3">© 2025 Pratyush Tripathi. All rights reserved.</p>

                        <div className="social-links mb-3">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
                                <i className="bi bi-twitter-x"></i>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
                                <i className="bi bi-facebook"></i>
                            </a>
                        </div>

                        <div className="footer-links">
                            <a href="mailto:tpratyush0@gmail.com" title="Email">
                                <i className="bi bi-envelope-fill"></i>
                            </a>
                            <a href="tel:+919532533060" title="Phone">
                                <i className="bi bi-telephone-fill"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Portfolio;
