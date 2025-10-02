"use client";

import Image from "next/image";
import Link from "next/link";
import bgimg from '../../img/loginbg3.jpg'; // outside public!

export default function HeroSectionv2() {
  return (
    <>

    <style jsx>{`
.hero-section {
  min-height: 90vh;
  background: linear-gradient(to right, #0a0f2c, #1b2a49);
  position: relative;
  overflow: hidden;
  padding: 80px 0;
}

.text-gradient {
  background: linear-gradient(45deg, #00e0ff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-img {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

    `}</style>
    <section className="hero-section d-flex align-items-center text-white">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Left Content */}
          <div className="col-md-7 text-start">
            <h1 className="display-4 fw-bold mb-3">
              Build <span className="text-gradient">Apps that Matter</span>
            </h1>
            <p className="lead mb-4">
              From fleet management to fintech dashboards, we deliver enterprise-grade
              web apps in record time. Scalable, reliable, and future-ready.
            </p>
            <div className="d-flex gap-3">
              <Link href="/nebula/an/apps" className="btn btn-lg btn-primary rounded-pill shadow">
                🚀 See Portfolio
              </Link>
              <Link href="/contact" className="btn btn-lg btn-outline-light rounded-pill">
                📞 Book a Call
              </Link>
            </div>
          </div>

          {/* Right Content (Image) */}
          <div className="col-md-5 text-center d-none d-md-block">
            <Image
              src={`${bgimg.src}`}
              alt="Hero Illustration"
              width={500}
              height={400}
              className="img-fluid rounded-4 shadow-lg hero-img"
            />
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
