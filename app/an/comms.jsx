"use client";
import { useState, useEffect } from "react";

export function WhatsAppButton({ phone = "254710766390", label = "Get a Quote", className = "" }) {
  const [whatsappLink, setWhatsappLink] = useState("#");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      const baseUrl = isMobile
        ? "https://api.whatsapp.com/send"
        : "https://web.whatsapp.com/send";

      setWhatsappLink(`${baseUrl}?phone=${phone}&text=write your message`);
    }
  }, [phone]);

  return (
    <a
      href={whatsappLink}
      target="_blank"
      className={`nav-link ${className}`}
    >
      <i className="fa fa-whatsapp "></i> {label}
    </a>
  );
}
