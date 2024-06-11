import React from "react";
import { Link } from "react-router-dom";
import {
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#edf2f7",
        paddingTop: "32px",
        paddingBottom: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <h4
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "16px",
              }}
            >
              Let's keep in touch!
            </h4>
            <h5
              style={{
                fontSize: "16px",
                marginTop: "0",
                marginBottom: "8px",
                color: "#4a5568",
              }}
            >
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div style={{ marginTop: "16px", textAlign: "left" }}>
              <button
                style={{
                  backgroundColor: "white",
                  color: " #0165E1",
                  borderRadius: "9999px",
                  width: "40px",
                  height: "40px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  outline: "none",
                  marginRight: "8px",
                }}
              >
                <FaFacebook />
              </button>
              <button
                style={{
                  backgroundColor: "white",
                  color: "#1D9BF0",
                  borderRadius: "9999px",
                  width: "40px",
                  height: "40px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  outline: "none",
                  marginRight: "8px",
                }}
              >
                <FaTwitter></FaTwitter>
              </button>
              <button
                style={{
                  backgroundColor: "white",
                  color: "#171515",
                  borderRadius: "9999px",
                  width: "40px",
                  height: "40px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  outline: "none",
                  marginRight: "8px",
                }}
              >
                <FaGithub />
              </button>
              <button
                style={{
                  backgroundColor: "#fff",
                  color: " #ea4c89",
                  borderRadius: "9999px",
                  width: "40px",
                  height: "40px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  outline: "none",
                  marginRight: "8px",
                }}
              >
                <FaDribbble />
              </button>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span
              style={{
                textTransform: "uppercase",
                fontSize: "12px",
                fontWeight: "600",
                color: "#4a5568",
                marginBottom: "8px",
                display: "block",
                textAlign: "right",
              }}
            >
              Useful Links
            </span>
            <ul
              style={{
                listStyle: "none",
                padding: "0",
                margin: "0",
                textAlign: "right",
              }}
            >
              <li style={{ marginBottom: "8px" }}>
                <Link
                  to={"/aboutus"}
                  style={{
                    color: "#4a5568",
                    fontWeight: "600",
                    fontSize: "14px",
                    textDecoration: "none",
                    display: "block",
                    transition: "color 0.3s ease",
                    textAlign: "right",
                  }}
                >
                  About Us
                </Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a
                  href="#"
                  style={{
                    color: "#4a5568",
                    fontWeight: "600",
                    fontSize: "14px",
                    textDecoration: "none",
                    display: "block",
                    transition: "color 0.3s ease",
                    textAlign: "right",
                  }}
                >
                  Blog
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a
                  href="#"
                  style={{
                    color: "#4a5568",
                    fontWeight: "600",
                    fontSize: "14px",
                    textDecoration: "none",
                    display: "block",
                    transition: "color 0.3s ease",
                    textAlign: "right",
                  }}
                >
                  Github
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a
                  href="#"
                  style={{
                    color: "#4a5568",
                    fontWeight: "600",
                    fontSize: "14px",
                    textDecoration: "none",
                    display: "block",
                    transition: "color 0.3s ease",
                    textAlign: "right",
                  }}
                >
                  Free Products
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr
          style={{
            marginTop: "24px",
            marginBottom: "24px",
            border: "1px solid #cbd5e0",
          }}
        />
        <div style={{ fontSize: "12px", fontWeight: "600", color: "#4a5568" }}>
          Copyright © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
