import streamlit as st

def experience_page():
    st.markdown("""
    <style>
        .exp-header {
            font-size: 2.5rem;
            color: gold;
            text-align: center;
            margin-bottom: 2rem;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .exp-card {
            background: rgba(255, 255, 255, 0.04);
            border-left: 4px solid gold;
            border-radius: 0 10px 10px 0;
            padding: 1.5rem 2rem;
            margin-bottom: 1.5rem;
            animation: fadeIn 0.6s ease-in;
        }
        .exp-card:hover {
            background: rgba(255, 215, 0, 0.07);
        }
        .exp-title {
            color: gold;
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 0.25rem;
        }
        .exp-company {
            color: #aaa;
            font-size: 1rem;
            margin-bottom: 0.5rem;
        }
        .exp-period {
            color: #888;
            font-size: 0.9rem;
            margin-bottom: 0.75rem;
        }
        .exp-desc {
            color: #ddd;
            font-size: 1rem;
            line-height: 1.65;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    """, unsafe_allow_html=True)

    st.markdown('<div class="exp-header">💼 Experience</div>', unsafe_allow_html=True)

    experiences = [
        {
            "title": "Data Analyst (Freelance)",
            "company": "Self-employed / Various Clients",
            "period": "2023 – Present",
            "description": (
                "Deliver end-to-end data analytics projects for clients across e-commerce, "
                "healthcare, and telecom sectors. Responsibilities include data collection, "
                "cleaning, exploratory analysis, visualization with Power BI and Streamlit, "
                "and presenting actionable insights to non-technical stakeholders."
            ),
        },
        {
            "title": "ALX Software Engineering Fellow",
            "company": "ALX Africa",
            "period": "2022 – 2023",
            "description": (
                "Completed an intensive 12-month full-stack engineering programme. "
                "Built command-line tools, RESTful APIs with Flask, and managed MySQL databases. "
                "Collaborated on team projects using Git and Agile workflows."
            ),
        },
        {
            "title": "Database Administrator (Intern)",
            "company": "Router_base ISP Project",
            "period": "2022",
            "description": (
                "Designed and maintained a relational database for an Internet Service Provider. "
                "Created stored procedures, optimized queries, and built Python scripts for "
                "automated data entry and reporting."
            ),
        },
    ]

    for exp in experiences:
        st.markdown(f"""
        <div class="exp-card">
            <div class="exp-title">{exp['title']}</div>
            <div class="exp-company"><i class="fas fa-building"></i>&nbsp; {exp['company']}</div>
            <div class="exp-period"><i class="fas fa-calendar-alt"></i>&nbsp; {exp['period']}</div>
            <div class="exp-desc">{exp['description']}</div>
        </div>
        """, unsafe_allow_html=True)


# Run the function
experience_page()
