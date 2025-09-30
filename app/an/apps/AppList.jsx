"use client";

import React, { useState, useEffect } from "react";
import { magicTrimText, mosyGetData } from '../../MosyUtils/hiveUtils';
import { getApiRoutes } from '../../appnebula/AppRoutes/apiRoutesHandler';
import { hiveRoutes } from "../../appConfigs/hiveRoutes";

const apiRoutes = getApiRoutes();

export default function AppList() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState("All");

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await mosyGetData({ endpoint: apiRoutes.projectportfolio.base });
        const projList = data.data || [];
        setProjects(projList);
        setFilteredProjects(projList);

        // Extract unique categories and tags
        const cats = ["All", ...new Set(projList.map(p => p.category))];
        setCategories(cats);

        const tagSet = new Set();
        projList.forEach(p => p.tags?.forEach(t => tagSet.add(t)));
        setTags(["All", ...Array.from(tagSet)]);

      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  // Filter projects based on active category and tag
  useEffect(() => {
    let filtered = [...projects];

    if (activeCategory !== "All") {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    if (activeTag !== "All") {
      filtered = filtered.filter(p => p.tags?.includes(activeTag));
    }

    setFilteredProjects(filtered);
  }, [activeCategory, activeTag, projects]);

  if (loading) return <p className="p-5 text-center col-md-12 ">Loading business apps ...</p>;
  if (!projects.length) return <p className="p-5 text-center col-md-12 " >No projects found.</p>;

  return (
    <div className="row justify-content-center col-md-12 m-0 p-0 mt-4">

        
        {/* Category Filter */}
    <div className="mb-3 col-md-12 p-3 border-bottom border-info position-relative">
    <div className="col-md-12 p-0 py-2 mb-2">
        <b>Your haven for business apps</b>
    </div>
    <strong className="mr-2  badge"> Pick an app category that suits your business : </strong>
    <div className="col-md-12 p-0 py-2 mb-2"></div>
    {/* Left Arrow */}
    <button
        className="scroll-btn left "
        onClick={() => {
        document.querySelector(".category-scroll").scrollBy({ left: -200, behavior: "smooth" });
        }}
    >
        <i className="fa fa-chevron-left"></i>
    </button>

    {/* Scrollable Categories */}
    <div className="category-scroll d-flex gap-2 mt-2 px-5">
        {categories.map((cat) => (
        <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`badge h5 flex-shrink-0 px-3 py-2 mr-2 ${
            activeCategory === cat
                ? "bg-info text-white"
                : "bg-white text-dark border border-info"
            }`}
        >
            <span className="cart_pill">{cat}</span>
        </button>
        ))}
    </div>

    {/* Right Arrow */}
    <button
        className="scroll-btn right"
        onClick={() => {
        document.querySelector(".category-scroll").scrollBy({ left: 200, behavior: "smooth" });
        }}
    >
        <i className="fa fa-chevron-right"></i>
    </button>
    </div>

    <style jsx>{`
    .category-scroll {
        overflow-x: auto;
        white-space: nowrap;
        scrollbar-width: none; /* Firefox */
    }
    .category-scroll::-webkit-scrollbar {
        display: none; /* Chrome/Safari */
    }

    .scroll-btn {
        position: absolute;
        top: 65%;
        transform: translateY(-20%);
        background: white;
        border: none;
        padding: 8px;
        cursor: pointer;
        z-index: 10;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        border-radius: 50%;
        color: #333;
    }
    .scroll-btn.left {
        left: 0;
    }
    .scroll-btn.right {
        right: 0;
    }
    .scroll-btn:hover {
        background: #f8f9fa;
    }
    
    .cart_pill{
      font-size:12px;
    }    
    `}</style>



      {/* Project Cards */}
      <div className="row col-md-12 p-2 m-0">
        {filteredProjects.map(project => (
          <div key={project.record_id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              <a href={`app?id=${project.record_id}`} className="text-dark">
                <img
                  src={`${hiveRoutes.hiveBaseRoute}/api/mediaroom?media=${btoa(project.thumbnail)}`}
                  className="card-img-top"
                  alt={project.title}
                  style={{ objectFit: "cover", height: "180px" }}
                />              
              <div className="card-body">
                <h5 className="card-title"><b>{project.title}</b></h5>
                <p className="card-text">{magicTrimText(project.description, 70)}</p>
                <p className="mb-1 mt-2"><strong>Category:</strong> {project.category}</p>
              </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
