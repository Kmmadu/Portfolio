import streamlit as st

def skills_page():
    # Font Awesome for Icons
    st.markdown('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">', unsafe_allow_html=True)

    # Custom CSS styles
    st.markdown("""
    <style>
        .skills-header {
            font-size: 2.5rem;
            color: gold;
            text-align: center;
            margin-bottom: 1rem;
            text-transform: uppercase;
        }
        .progress-container {
            background-color: #1a1a1a;
            border-radius: 20px;
            height: 25px;
            margin: 1rem 0;
            position: relative;
            overflow: hidden;
        }
        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, gold 0%, #ffd700cc 100%);
            border-radius: 20px;
            position: relative;
            transition: width 0.5s ease-in-out;
        }
        .skill-title {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            z-index: 2;
            font-weight: 600;
        }
        .skill-title i {
            margin-right: 10px;
        }
        .skill-percent {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            z-index: 2;
            font-weight: 600;
        }
    </style>
    """, unsafe_allow_html=True)

    # Page Header
    st.markdown('<h2 style="text-align: center; color: gold; margin-bottom: 2rem;">MY SPECIALTY</h2>', unsafe_allow_html=True)

    # ------------------ DESCRIPTION ------------------ #
    st.markdown("""
    <p style="text-align: center; font-size: 1.1rem; line-height: 1.6; max-width: 800px; margin: 0 auto 3rem auto;">
        I specialize in building scalable data solutions, transforming raw data into meaningful insights,
        and designing dashboards that empower decision-makers.
        Here's a quick snapshot of my current skillset and proficiency levels.
    </p>
    """, unsafe_allow_html=True)

    # Skill Bars
    col1, col2 = st.columns(2)

    with col1:
        create_skill_bar("Python", 90)
        create_skill_bar("SQL", 85)
        create_skill_bar("Power BI", 80)

    with col2:
        create_skill_bar("Streamlit", 75)
        create_skill_bar("Excel", 85)
        create_skill_bar("Flask & API Dev", 70)


# Helper Function with Icons
def create_skill_bar(skill, percentage):
    icons = {
        "Python": '<i class="fa-brands fa-python"></i>',
        "SQL": '<i class="fa-solid fa-database"></i>',
        "Power BI": '<i class="fa-solid fa-chart-column"></i>',
        "Streamlit": '<i class="fa-solid fa-chart-line"></i>',
        "Excel": '<i class="fa-regular fa-file-excel"></i>',
        "Flask & API Dev": '<i class="fa-solid fa-code"></i>',
    }

    icon_html = icons.get(skill, "")

    st.markdown(f"""
    <div class="progress-container">
        <div class="skill-title">{icon_html} {skill}</div>
        <div class="skill-percent">{percentage}%</div>
        <div class="progress-bar" style="width: {percentage}%;"></div>
    </div>
    """, unsafe_allow_html=True)


# ------------------ CALL FUNCTION ------------------ #
skills_page()
