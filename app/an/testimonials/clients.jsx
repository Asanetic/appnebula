// components/ClientCard.js
import React from "react";

export default function ClientCard({ logo, name = "Client Name" }) {
  return (
    <div className="elforge_mosy_client_card">
      <img src={logo} alt={name} className="elforge_mosy_client_logo" />
      <style jsx>{`
        .elforge_mosy_client_card {
          background: #fff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .elforge_mosy_client_card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
        }

        .elforge_mosy_client_logo {
          width: 120px;
          height: 120px;
          object-fit: contain;
        }
      `}</style>
    </div>
  );
}
