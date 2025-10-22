// components/TestimonialCard.js
import React from "react";

export default function TestimonialCard({
  text,
  name,
  role,
  avatar = "/img/sample-avatar.jpg", // default placeholder
}) {
  return (
    <div className="elforge_mosy_testimonial_card">
      <p className="elforge_mosy_testimonial_text">"{text}"</p>
      <div className="elforge_mosy_testimonial_user">
        <div>
          <div className="elforge_mosy_testimonial_name border-top border-info pt-2">{name}</div>
          <div className="elforge_mosy_testimonial_role">{role}</div>
        </div>
      </div>

      <style jsx>{`
        .elforge_mosy_testimonial_card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
          padding: 20px;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .elforge_mosy_testimonial_card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
        }
        .elforge_mosy_testimonial_text {
          font-size: 14px;
          color: #333;
          line-height: 30px;
          font-style: italic;
        }
        .elforge_mosy_testimonial_user {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .elforge_mosy_testimonial_avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          background-color: #ddd;
          flex-shrink: 0;
        }
        .elforge_mosy_testimonial_name {
          font-weight: 600;
          font-size: 0.95rem;
          color: #111;
        }
        .elforge_mosy_testimonial_role {
          font-size: 0.82rem;
          color: #777;
        }
      `}</style>
    </div>
  );
}
