import re
import logging
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import streamlit as st
from dotenv import load_dotenv

logger = logging.getLogger(__name__)

load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")


def send_email(name, sender_email, subject, message):
    if not EMAIL_ADDRESS or not EMAIL_PASSWORD:
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = EMAIL_ADDRESS

    html_body = f"""
    <p><strong>Name:</strong> {name}</p>
    <p><strong>Email:</strong> {sender_email}</p>
    <p><strong>Message:</strong><br>{message}</p>
    """
    msg.attach(MIMEText(html_body, "html"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, EMAIL_ADDRESS, msg.as_string())
        return True
    except Exception as e:
        logger.error("Failed to send portfolio contact email: %s", e)
        return False


def contact_section():
    st.markdown("""
    <style>
        .contact-header {
            font-size: 2.5rem;
            color: gold;
            text-align: center;
            margin: 3rem 0 2rem 0;
            text-transform: uppercase;
            letter-spacing: 1.5px;
        }
        .contact-info-box {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 1rem 0;
        }
        .info-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            background: #1a1a1a;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(255, 215, 0, 0.1);
        }
        .info-icon {
            font-size: 1.5rem;
            color: gold;
            width: 30px;
            text-align: center;
        }
        .info-text {
            color: #ddd;
            font-size: 1rem;
        }
        .stTextInput>div>div>input,
        .stTextArea>div>textarea {
            background-color: #1a1a1a !important;
            color: white !important;
            border: 1px solid #333 !important;
        }
        .stTextInput>label,
        .stTextArea>label {
            color: #ddd !important;
        }
    </style>
    """, unsafe_allow_html=True)

    st.markdown('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">', unsafe_allow_html=True)
    st.markdown('<div class="contact-header">Contact</div>', unsafe_allow_html=True)

    col1, col2 = st.columns([1, 1], gap="large")

    with col1:
        st.markdown("""
        <div class="contact-info-box">
            <div class="info-item">
                <span class="info-icon"><i class="fas fa-envelope"></i></span>
                <span class="info-text">mmadubugwukingsley@gmail.com</span>
            </div>
            <div class="info-item">
                <span class="info-icon"><i class="fas fa-map-marker-alt"></i></span>
                <span class="info-text">Lagos, Nigeria</span>
            </div>
            <div class="info-item">
                <span class="info-icon"><i class="fas fa-phone"></i></span>
                <span class="info-text">+234 907 605 5774</span>
            </div>
            <div class="info-item">
                <span class="info-icon"><i class="fab fa-github"></i></span>
                <span class="info-text">
                    <a href="https://github.com/Kmmadu" target="_blank"
                       style="color: gold; text-decoration: none;">github.com/Kmmadu</a>
                </span>
            </div>
        </div>
        """, unsafe_allow_html=True)

    with col2:
        with st.form("contact_form", clear_on_submit=True):
            name = st.text_input("Name*")
            email = st.text_input("Email*")
            subject = st.text_input("Subject*")
            message = st.text_area("Message*", height=150)
            submitted = st.form_submit_button("SEND MESSAGE", type="primary")

        if submitted:
            if name and email and subject and message:
                if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
                    st.error("❌ Please enter a valid email address.")
                else:
                    success = send_email(name, email, subject, message)
                    if success:
                        st.success("📬 Message sent successfully!")
                    else:
                        st.info("📋 Message received! (Email delivery requires server configuration.)")
            else:
                st.error("❌ Please fill all required fields!")


contact_section()
