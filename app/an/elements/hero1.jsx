"use client";
import { WhatsAppButton } from './comms';

import React, { useState, useEffect } from "react";
import { mosyGetData, mosyBtoa, mosyUrlParam } from '../../MosyUtils/hiveUtils';
import { getApiRoutes } from '../../appnebula/AppRoutes/apiRoutesHandler';
import { hiveRoutes } from "../../appConfigs/hiveRoutes";
import { MosyTitleTag } from "../../mosybilling/UiControl/componentControl";

const apiRoutes = getApiRoutes();

export default function HeroSection() {

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadContent() {
      try {
        const data = await mosyGetData({ 
          endpoint: `${apiRoutes.webcontent.base}`, 
          params: { q: mosyBtoa(`where section_key='hero'`), fullQ: true } 
        });
        setProject(data.data?.[0] || null);
      } catch (err) {
        console.error("Error loading project:", err);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, []);

  if (loading) return <p className="text-center mt-5"><i className='fa fa-spinner fa-spin'></i> ...</p>;
  if (!project) return <p className="text-center mt-5">Section not found.</p>;


  return (
    <>
      <style jsx>{`
        .elforge_mosy_hero_v1 {
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
            url("${hiveRoutes.hiveBaseRoute}/api/mediaroom?media=${btoa(project.section_pic)}") center/cover no-repeat;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }
        .elforge_mosy_hero_v1 h1 {
          font-size: 3rem;
          font-weight : 700;
          margin-bottom: 20px;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
        }
        .elforge_mosy_hero_v1 p {
          font-size: 1.25rem;
          margin-bottom: 30px;
        }
        .elforge_mosy_hero_btn {
          padding: 12px 28px;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: 600;
          background:rgb(4, 10, 85);
          border: none;
          color: #fff;
          cursor: pointer;
          transition: 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
        .elforge_mosy_hero_btn:hover {
          background:rgb(4, 10, 85);
          transform: translateY(-2px);
        }
      `}</style>

      <section className="elforge_mosy_hero_v1">
        <div className="container">
          <h1 className='pb-3'>{project.section_title}</h1>
          <div className="mb-3 description_isle" dangerouslySetInnerHTML={{ __html: project.section_content }} />
          <div className='p-4'></div>
          <button className="elforge_mosy_hero_btn">
            <WhatsAppButton phone="254710766390" className="ml-3 text-light" label="Get in touch" />
          </button>
        </div>
      </section>
    </>
  );
}
