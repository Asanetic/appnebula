"use client";

import React, { useState, useEffect } from "react";
import { mosyGetData, mosyBtoa, mosyUrlParam } from '../../MosyUtils/hiveUtils';
import { getApiRoutes } from '../../appnebula/AppRoutes/apiRoutesHandler';
import { hiveRoutes } from "../../appConfigs/hiveRoutes";
import { MosyTitleTag } from "../../mosybilling/UiControl/componentControl";
import AppList from "../apps/AppList";

const apiRoutes = getApiRoutes();

export default function AppProfile() {
  const params = mosyUrlParam("id"); // expects { id }
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  function extractYouTubeId(url) {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes("youtu.be")) return urlObj.pathname.slice(1);
      if (urlObj.hostname.includes("youtube.com")) return urlObj.searchParams.get("v");
      return url; // fallback
    } catch {
      return url;
    }
  }

  
  useEffect(() => {
    async function loadProject() {
      try {
        const data = await mosyGetData({ 
          endpoint: `${apiRoutes.projectportfolio.base}`, 
          params: { q: mosyBtoa(`where record_id='${params}'`), fullQ: true } 
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
    <div className="row col-md-12 mx-lg-3 my-lg-5 m-0 p-0 ">

      {/* Video / Hero */}
      <div className="row col-md-12 mb-5 m-0 p-0 ">
        <div className="col-12 rounded overflow-hidden px-0 m-0 ">
          <div className="row justify-content-center  mx-0 p-0 ">
            {project.video_link ? (
              <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeId(project.video_link)}?rel=0&autoplay=0&enablejsapi=1`}
                title={project.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="col-md-8 rounded videoisle mt-3"
              />
            ) : (
              <img
                src={`${hiveRoutes.hiveBaseRoute}/api/mediaroom?media=${btoa(project.thumbnail)}`}
                alt={project.title}
                className="col-md-8 rounded videoisle mt-3"
                style={{ objectFit: "cover" }}
              />
            )}

            <h1 className="fw-bold mb-3 col-md-8 pt-4">{project.title}</h1>
            <div className="col-md-4 d-none"></div>
          </div>
        </div>
      </div>



      {/* Project Info */}
      <div className="row col-md-12 justify-content-center mb-5 gx-5">
        <div className="col-lg-8">
          <p className="text-muted mb-2"><strong>Category:</strong> {project.category}</p>
          <div className="mb-3" dangerouslySetInnerHTML={{ __html: project.description }} />
          {project.tags?.length > 0 && (
            <div>
              <strong>Tags:</strong>{" "}
              {project.tags.map((tag, idx) => (
                <span key={idx} className="badge bg-gradient-primary me-2 mb-2" style={{ fontSize: '0.85rem', padding: '0.45rem 0.8rem' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="col-lg-4 d-none align-items-start justify-content-center">
          <img
            src={`${hiveRoutes.hiveBaseRoute}/api/mediaroom?media=${btoa(project.thumbnail)}`}
            alt={project.title}
            className="img-fluid rounded shadow-lg border border-light"
            style={{ maxHeight: '350px', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Related / More Apps */}
      <div className="mb-4 m-0 p-0  col-md-12 row justify-content-center ">
        <div className=" col-md-9 m-0 p-0  ">
            <MosyTitleTag title="More Apps" />

        {/* Optional footer call-to-action */}
        <div className="col-md-12 text-center mt-5 mb-4 pt-3 border-top  pb-4 border-bottom   rounded ">
            <h4 className="fw-bold mb-3">Explore More Projects</h4>
            <p className="text-muted mb-3">Discover innovative apps curated just for you.</p>
            <a href="./apps" className="btn border border-info shadow-sm">Browse All Projects</a>
        </div>

            <AppList />
            </div>
        </div>

      <style jsx>{`
        .videoisle{
          height:600px;
        }
        @media (max-width: 700px) {

        .videoisle{
         height : 400px;
        }
       }
      `}</style>
    </div>

  );
}
