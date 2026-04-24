import streamlit as st

# ------------------ PAGE CONFIG ------------------ #
st.set_page_config(
    page_title="Kingsley Mmadubugwu",
    page_icon="🧠",
    layout="wide"
)

# ------------------ CUSTOM STYLE ------------------ #
st.markdown("""
    <style>
        .profile-pic-container {
            width: 280px;
            height: 280px;
            border-radius: 50%;
            overflow: hidden;
            margin: 20px auto;
            border: 3px solid gold;
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            background: #1a1a1a;
        }
        .profile-initials {
            font-size: 5rem;
            color: gold;
            font-weight: bold;
        }
        .sidebar-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: #1a1a1a;
            border: 2px solid gold;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px auto;
            font-size: 2.5rem;
            color: gold;
            font-weight: bold;
        }
    </style>
""", unsafe_allow_html=True)

# ------------------ SIDEBAR PROFILE ------------------ #
with st.sidebar:
    st.markdown("""
    <div style="display: flex; justify-content: center;">
        <div class="sidebar-avatar">KM</div>
    </div>
    <div style="text-align: center;">
        <h3 style="color: gold; margin: 10px 0 5px 0;">Kingsley</h3>
        <p style="color: white; margin: 0; text-transform: uppercase;
           letter-spacing: 1px; font-size: 0.9rem;">
            Data Analyst
        </p>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("---")

# ------------------ HERO SECTION ------------------ #
col1, col2 = st.columns([2, 1], gap="large")

with col1:
    st.markdown("""
        <h3 style='color: gold;'>Data Analyst | Python Developer | Database Manager</h3>
        <h1 style='font-size: 3rem; font-weight: bold; color: white;'>Hi, I am Kingsley</h1>
        <p style='font-size: 1.2rem; color: #dddddd;'>
            I help businesses and organizations make better decisions using data-driven insights.<br>
            My mission is to design data systems and tools that are beautiful, functional, and effective.
        </p>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
    <div class="profile-pic-container">
        <span class="profile-initials">KM</span>
    </div>
    """, unsafe_allow_html=True)

# ------------------ CONTACT BUTTONS ------------------ #
st.markdown("""
    <div style="text-align: center; margin-top: 20px;">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        <a href="https://wa.me/2349076055774" target="_blank"
           style="display: inline-block; padding: 12px 24px; background-color: #25D366; color: white; border-radius: 30px; text-decoration: none; font-weight: bold; margin-right: 15px;">
            <i class="fab fa-whatsapp"></i> LET'S CHAT ON WHATSAPP
        </a>
        <a href="mailto:mmadubugwukingsley@gmail.com" target="_blank"
           style="display: inline-block; padding: 12px 24px; border: 2px solid white; color: white; border-radius: 30px; text-decoration: none; font-weight: bold;">
            <i class="fas fa-envelope"></i> OR SEND ME AN EMAIL
        </a>
    </div>
""", unsafe_allow_html=True)

# ------------------ FOOTER ------------------ #
st.markdown("---")
st.markdown("<p style='text-align:center; color: #888;'>© 2025 Kingsley Mmadubugwu</p>", unsafe_allow_html=True)
