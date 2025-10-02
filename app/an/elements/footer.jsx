"use client";
import Link from "next/link";
import { WhatsAppButton } from "./comms";

export default function Footer() {
  return (
    <>
      <style jsx>{`
        .elforge_mosy_footer_v1 {
          background: #111;
          color: #eee;
          padding: 60px 20px 30px;
        }
        .elforge_mosy_footer_v1 h5 {
          color: #fff;
          font-weight: 600;
          margin-bottom: 20px;
          font-size: 1.2rem;
        }
        .elforge_mosy_footer_links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .elforge_mosy_footer_links li {
          margin-bottom: 10px;
        }
        .elforge_mosy_footer_links a {
          color: #bbb;
          text-decoration: none;
          transition: 0.3s ease;
        }
        .elforge_mosy_footer_links a:hover {
          color: #fff;
        }
        .elforge_mosy_footer_social a {
          display: inline-block;
          margin-right: 15px;
          color: #bbb;
          font-size: 1.4rem;
          transition: 0.3s ease;
        }
        .elforge_mosy_footer_social a:hover {
          color: #0070f3;
        }
        .elforge_mosy_footer_bottom {
          text-align: center;
          margin-top: 40px;
          font-size: 0.9rem;
          color: #777;
          border-top: 1px solid #222;
          padding-top: 20px;
        }
      `}</style>

      <footer className="elforge_mosy_footer_v1">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5>About Us</h5>
              <p>
                We craft modular web solutions that power businesses across
                industries. Scalable, secure, and built for the future.
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <h5>Quick Links</h5>
              <ul className="elforge_mosy_footer_links">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="about">About</Link>
                </li>
                <li>
                  <Link href="apps">Apps</Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4 mb-4">
              <h5>Connect</h5>
              <div className="elforge_mosy_footer_social">
                <a href="https://twitter.com" target="_blank">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="https://facebook.com" target="_blank">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="https://linkedin.com" target="_blank">
                  <i className="fa fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="elforge_mosy_footer_bottom">
            © {new Date().getFullYear()}. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
