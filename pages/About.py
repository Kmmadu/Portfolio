import streamlit as st

# ------------------ ABOUT PAGE ------------------ #
def about_page():
    st.markdown("""
    <style>
        .about-header {
            font-size: 2.5rem;
            color: gold;
            text-align: center;
            margin-bottom: 2rem;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .bio-section {
            background: rgba(255, 255, 255, 0.05);
            padding: 2rem;
            border-radius: 15px;
            margin-bottom: 2rem;
            border-left: 4px solid gold;
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
            animation: fadeIn 0.7s ease-in;
        }
        .skill-card {
            background: #1a1a1a;
            padding: 1.5rem;
            border-radius: 10px;
            text-align: center;
            transition: transform 0.3s ease;
            border: 1px solid rgba(255, 215, 0, 0.2);
            animation: fadeIn 0.7s ease-in;
        }
        .skill-card:hover {
            transform: translateY(-5px);
            background: #252525;
        }
        .skill-icon {
            font-size: 2rem;
            color: gold;
            margin-bottom: 10px;
        }
        .skill-title {
            color: gold;
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    """, unsafe_allow_html=True)

    # ------------------ HEADER ------------------ #
    st.markdown('<div class="about-header">About Me</div>', unsafe_allow_html=True)

    # ------------------ BIO SECTION ------------------ #
    st.markdown("""
    <div class="bio-section">
        <h2 style="color: gold; margin-bottom: 1rem;">WHO AM I?</h2>
        <p style="font-size: 1.1rem; line-height: 1.6; color: #ddd;">
            Hi, I'm <strong>Kingsley Mmadubugwu</strong>, a passionate Data Analyst with a strong background in
            Python development and database management. I love transforming raw data into meaningful insights
            and helping businesses make smarter, data-driven decisions.
        </p>
        <p style="font-size: 1.1rem; line-height: 1.6; margin-top: 1rem; color: #ccc;">
            When I'm not analyzing data, I'm exploring new technologies, contributing to open-source projects,
            or mentoring others on their data journey. I believe in continuous learning, collaboration, and
            using data to tell compelling stories.
        </p>
    </div>
    """, unsafe_allow_html=True)

    # ------------------ SKILLS SECTION ------------------ #
    col1, col2, col3 = st.columns(3)

    with col1:
        st.markdown("""
        <div class="skill-card">
            <div class="skill-icon"><i class="fas fa-database"></i></div>
            <div class="skill-title">Data Analysis</div>
            <p style="color: #ddd;">Cleaning, transforming, and analyzing datasets with Python &amp; SQL</p>
        </div>
        """, unsafe_allow_html=True)

    with col2:
        st.markdown("""
        <div class="skill-card">
            <div class="skill-icon"><i class="fas fa-chart-line"></i></div>
            <div class="skill-title">Dashboard Design</div>
            <p style="color: #ddd;">Creating beautiful, interactive dashboards with Power BI &amp; Streamlit</p>
        </div>
        """, unsafe_allow_html=True)

    with col3:
        st.markdown("""
        <div class="skill-card">
            <div class="skill-icon"><i class="fas fa-code"></i></div>
            <div class="skill-title">Backend Dev</div>
            <p style="color: #ddd;">Building APIs, database systems, and custom tools with Flask &amp; SQL</p>
        </div>
        """, unsafe_allow_html=True)

# ------------------ CALL FUNCTION ------------------ #
about_page()
