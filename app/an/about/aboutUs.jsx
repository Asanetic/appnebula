"use client";
import Image from "next/image";
import bgimg from '../../img/log-bg.jpg'; // outside public!

import React, { useState, useEffect } from "react";
import { mosyGetData, mosyBtoa, mosyUrlParam } from '../../MosyUtils/hiveUtils';
import { getApiRoutes } from '../../appnebula/AppRoutes/apiRoutesHandler';
import { hiveRoutes } from "../../appConfigs/hiveRoutes";
import { MosyTitleTag } from "../../mosybilling/UiControl/componentControl";

const apiRoutes = getApiRoutes();

export default function AboutUs() {

  const params = mosyUrlParam("id"); // expects { id }
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadContent() {
      try {
        const data = await mosyGetData({ 
          endpoint: `${apiRoutes.webcontent.base}`, 
          params: { q: mosyBtoa(`where section_key='aboutus'`), fullQ: true } 
        });
        setProject(data.data?.[0] || null);
      } catch (err) {
        console.error("Error loading project:", err);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [params]);

  if (loading) return <p className="text-center mt-5">Loading ...</p>;
  if (!project) return <p className="text-center mt-5">Section not found.</p>;


  return (
    <>
      <style jsx>{`
        .elforge_mosy_about_v1 h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: #222;
          text-align: center;
        }
        .elforge_mosy_about_v1 p {
          font-size: 1.1rem;
          color: #555;
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .elforge_mosy_about_img {
          border-radius: 30px;
          transition: 0.4s ease;
          max-width:100%;
        }
        .elforge_mosy_about_img:hover {
          transform: scale(1.03);
        }
        .elforge_mosy_about_box {
          background: #fff;
          padding: 30px;
          border-radius: 20px;
        }
         
        .description_isle{
          line-height:35px;
        }
      `}</style>

      <section className="elforge_mosy_about_v1 col-md-12 p-0 m-0">
        <div className="p-0 m-0 p-lg-5 m-lg-5 col-md-12">
          <h2 className="pt-5">{project.section_title}</h2>
          <div className="row align-items-center mt-5 p-0 m-0 ">
            <div className="col-md-8  order-lg-0 order-1 p-3 m-0 p-lg-5 m-lg-5">
              <div className="col-md-12 p-3 m-0 p-lg-5 m-lg-5">
              <div className="mb-3 description_isle col-md-12 p-0 m-0 " dangerouslySetInnerHTML={{ __html: project.section_content }} />
              </div>
            </div>
            <div className="col-md-4  p-3 m-0 p-lg-5 m-lg-5 text-center order-lg-1 order-0">
              <img
                src={`${hiveRoutes.hiveBaseRoute}/api/mediaroom?media=${btoa(project.section_pic)}`}
                alt="About Us"
                className="elforge_mosy_about_img"
              />
              <div className="col-md-12 p-3"></div>
            </div>
            <div className="col-md-12 order-2 p-0 m-0 ">
              <div className="col-md-12  p-3 m-2 p-lg-5 m-lg-5">
              <div className="mb-3 description_isle col-md-12 p-0 m-0 " dangerouslySetInnerHTML={{ __html: project.advanced_content }} />
              </div>
            </div>            
          </div>
        </div>
      </section>
    </>
  );
}
