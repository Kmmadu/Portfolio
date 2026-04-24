import streamlit as st

def education_page():
    st.markdown("""
        <style>
        .edu-header {
            font-size: 2.5rem;
            color: gold;
            text-align: center;
            margin-bottom: 2rem;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .accordion-container {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 215, 0, 0.2);
            border-radius: 10px;
            margin-bottom: 10px;
            font-family: 'Segoe UI', sans-serif;
            overflow: hidden;
        }
        .accordion-content {
            background-color: #1a1a1a;
            padding: 1rem 1.5rem;
            color: #ddd;
            border-top: 1px solid rgba(255, 215, 0, 0.2);
            line-height: 1.6;
        }
        </style>
    """, unsafe_allow_html=True)

    st.markdown('<div class="edu-header">🎓 Education</div>', unsafe_allow_html=True)

    # Education data
    education_data = [
        {
            "title": "ALX AFRICA — DATA SCIENCE & ANALYTICS",
            "period": "2023 – 2024",
            "text": "Completed an intensive data science and analytics programme covering Python, SQL, data visualisation, "
                    "machine learning fundamentals, and project-based learning with real-world datasets."
        },
        {
            "title": "BACHELOR OF SCIENCE — COMPUTER SCIENCE",
            "period": "2019 – 2023",
            "text": "Graduated with a strong foundation in algorithms, data structures, software engineering, "
                    "database systems, and computer networks."
        },
        {
            "title": "DIPLOMA — INFORMATION TECHNOLOGY",
            "period": "2017 – 2019",
            "text": "Hands-on training in networking, IT infrastructure, database management, and introductory web development."
        },
        {
            "title": "WEST AFRICAN SENIOR SCHOOL CERTIFICATE (WAEC)",
            "period": "2011 – 2017",
            "text": "Graduated with distinctions in Mathematics, Physics, Chemistry, and Further Mathematics."
        },
    ]

    # State tracking using session_state
    if "active_edu_accordion" not in st.session_state:
        st.session_state.active_edu_accordion = 0

    for idx, item in enumerate(education_data):
        is_open = st.session_state.active_edu_accordion == idx
        label = f"{'▼' if is_open else '▶'}  {item['title']}  •  {item['period']}"

        if st.button(label, key=f"edu-{idx}", use_container_width=True):
            st.session_state.active_edu_accordion = -1 if is_open else idx
            st.rerun()

        if is_open:
            st.markdown(f"""
                <div class="accordion-container">
                    <div class="accordion-content">{item['text']}</div>
                </div>
            """, unsafe_allow_html=True)


# Run the function
education_page()
