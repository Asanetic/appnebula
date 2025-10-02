"use client";
import { useState, useEffect } from "react";
import CaseStudies from "../cases/caseStudies";
import { mosyBtoa, mosyGetData, mosyUrlParam } from "../../MosyUtils/hiveUtils";

import { getApiRoutes } from "../../appnebula/AppRoutes/apiRoutesHandler";
import { hiveRoutes } from "../../appConfigs/hiveRoutes";

const apiRoutes =  getApiRoutes()

export default function PostProfile() {

      const params = mosyUrlParam("id"); // expects { id }
      const [project, setProject] = useState(null);
      const [loading, setLoading] = useState(true);
      
      useEffect(() => {
        async function loadProject() {
          try {
            const data = await mosyGetData({ 
              endpoint: `${apiRoutes.blogposts.base}`, 
              params: { q: mosyBtoa(`where post_id='${params}'`), fullQ: true } 
            });
            setProject(data.data?.[0] || null);
          } catch (err) {
            console.error("Error loading project:", err);
          } finally {
            setLoading(false);
          }
        }
    
        loadProject();
      }, [params]);
    
      if (loading) return <p className="text-center mt-5">Loading app...</p>;
      if (!project) return <p className="text-center mt-5">App not found.</p>;
    

  return (
    <>
      <style jsx>{`
        .post_wrapper {
          margin: 2rem auto;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          font-family: 'Segoe UI', sans-serif;
        }
        .post_header {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .post_header img {
          transition: transform 0.5s ease;
        }
        .post_header img:hover {
          transform: scale(1.05);
        }
        .post_body {
          padding: 2rem;
          color: #333;
        }
        .post_title {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #111;
        }
        .post_meta {
          display: flex;
          gap: 1rem;
          font-size: 0.9rem;
          color: #888;
        }
        .post_content {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #444;
        }
        .author_card {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 3rem;
          padding: 1.5rem;
          border-radius: 16px;
          background: #f9f9f9;
          box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.05);
        }
        .author_img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }
        .author_img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .author_info h4 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 600;
        }
        .author_info p {
          margin: 0;
          font-size: 0.9rem;
          color: #666;
        }
        
        .post_img{
          max-width:100%;
        }

      `}</style>

      <div className="post_wrapper row justify-content-center p-0 m-0 col-md-12">
        {/* Post Banner */}
        <div className="col-md-8">
        <div className="col-md-12 text-center mt-4 post_header">
          <img
            src={`${hiveRoutes.hiveBaseRoute}/api/mediaroom?media=${btoa(project.post_photo)}`}        
            alt="Post Banner"
            className="post_img"
          />
        </div>

        {/* Post Body */}
        <div className="post_body">
          <h1 className="post_title">Building a Premium App Experience</h1>

          <div className="post_meta d-none">
            <span>By <b>Jane Doe</b></span>
            <span>September 30, 2025</span>
            <span>5 min read</span>
          </div>

          <div className="post_content">
            <p>
              Creating digital experiences that stand out requires more than just
              functionality — it’s about design, flow, and premium feel. In this post,
              we’ll explore how subtle shadows, soft corners, and structured grids
              elevate a project.
            </p>
            <p>
              Premium doesn’t mean complicated; it means thoughtful. Every margin,
              every hover, every font weight works together to create an experience
              that feels effortless but unforgettable.
            </p>
          </div>          
        </div>
      </div>
      <CaseStudies/>

      </div>
    </>
  );
}
