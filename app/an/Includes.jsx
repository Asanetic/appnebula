"use client";
import { useState , useEffect } from "react";
import { hiveRoutes } from "../appConfigs/hiveRoutes";
import { WhatsAppButton } from "./comms";
import { FloatingContactBubbles } from "./floatingCommsBtn";
import { SeoMeta } from "./seoTag";
import { loadToken } from "./utils";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const [whatsappLink, setWhatsappLink] = useState("#");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      if (isMobile) {
        setWhatsappLink("https://api.whatsapp.com/send?phone=254710766390&text=write your message");
      } else {
        setWhatsappLink("https://web.whatsapp.com/send?phone=254710766390&text=write your message");
      }
    }
  }, []);

  loadToken()

  return (
    <>
    <SeoMeta/>
      <nav className="navbar navbar-expand-lg navbar-white bg-white shadow-sm sticky-top">
        <div className="container">
          {/* Brand / Logo */}
          <a className="navbar-brand fw-bold d-flex align-items-center text-dark" href="#">
            <img
              src={`${hiveRoutes.hiveBaseRoute}/logo.png`}
              style={{ height: "60px", marginRight: "12px" }}
              className="navlogo rounded-circle"
              alt="Logo"
            />
            Kibao Business Apps
          </a>

          {/* Hamburger toggle */}
          <button
            className="navbar-toggler border p-2"
            type="button"
            aria-expanded={isOpen ? "true" : "false"}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="p-2">
              <i className="fa fa-bars text-dark"></i>
            </span>
          </button>

          {/* Menu items */}
          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item ml-lg-5">
                <a className="nav-link active text-dark" href="apps"> <i className="fa fa-home"></i> Business apps</a>
              </li>
              <li className="nav-item  ml-lg-5 ">
                <WhatsAppButton phone="254710766390" className="ml-3 text-dark" label="Get a Quote" />
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <style jsx>{`
        .navbar {
          transition: all 0.3s ease;
        }

        .navbar .nav-link:hover {
          color: #0d6efd;
          text-decoration: underline;
        }

        .navlogo {
          transition: transform 0.3s ease;
        }

        .navlogo:hover {
          transform: scale(1.1);
        }
        
        .bottom-btn{
         position:fixed!important;
        }

        @media (max-width: 700px) {
          .navbar-brand {
            font-size: 18px;
            font-weight: bold;
          }
          .navbar-nav .nav-link {
            padding: 0.75rem 1rem;
          }
        }
      `}</style>

      <FloatingContactBubbles 
        phone="254710766390" 
        callNumber="254710766390" 
      />


    </>
  );
}
