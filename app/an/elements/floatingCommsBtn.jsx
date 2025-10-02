"use client";
import React, { useState, useEffect } from "react";

export function FloatingContactBubbles({
  phone = "254710766390",
  callNumber = "254710766390",
  whatsappLabel = "WhatsApp",
  callLabel = "Call"
}) {
  const [whatsappLink, setWhatsappLink] = useState("#");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const baseUrl = isMobile
        ? "https://api.whatsapp.com/send"
        : "https://web.whatsapp.com/send";

      setWhatsappLink(`${baseUrl}?phone=${phone}&text=write your message`);
    }
  }, [phone]);

  return (
    <>
      <div className="floating-bubbles d-flex flex-column align-items-end">
        {/* WhatsApp Bubble */}


        {/* Call Bubble */}
        <a href={`tel:${callNumber}`} className="bubble phone_bubble bubble-call p-2 mb-5 ">
          <i className="fa fa-phone fa-lg medium_icon"></i>
        </a>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bubble bubble-whatsapp p-2 "
        >
          Get quote <i className="fa fa-whatsapp fa-lg ml-2 medium_icon"></i>
        </a>

      </div>

      <style jsx>{`
        .floating-bubbles {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
        }

        .bubble {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .bubble:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0,0,0,0.3);
        }
        .bubble-whatsapp {
          background-color: #25d366;
          border-radius: 50px;

        }
        .bubble-call {
          background-color: #0d6efd;
          border-radius: 50%;
            width: 50px;
            height: 50px;          
        }
        @media (max-width: 768px) {
          .bubble {
            font-size: 15px;

          }
        }
      `}</style>
    </>
  );
}
