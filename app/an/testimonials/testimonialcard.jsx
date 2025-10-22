"use client";
import React, { useState, useEffect } from "react";

import { MosyTitleTag } from "../../mosybilling/UiControl/componentControl";
import TestimonialCard from "./testimonials";

import { hiveRoutes } from "../../appConfigs/hiveRoutes";
import { getApiRoutes } from "../../appnebula/AppRoutes/apiRoutesHandler";
import { mosyBtoa, mosyGetData } from "../../MosyUtils/hiveUtils";

const apiRoutes = getApiRoutes()


export default function TestimonialsSection(limit = 5) {

  const [testimonials, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function loadCases() {
        try {
          const data = await mosyGetData({
             endpoint: apiRoutes.webcontent.base,
            params:{ 
            q: mosyBtoa("where section_tag='testimonialList'"),    
            fullQ :true,
            aw:mosyBtoa(`order by RAND()`),            
            pagination : `l:qweb_content_page:100:1`}
          });
          const studies = data.data || [];
          setStudies(studies);
  
        } catch (err) {
          console.error("Error loading cases:", err);
        } finally {
          setLoading(false);
        }
      }
  
      loadCases();
    }, []);

    if (loading) return <p className="text-center mt-5"><i className='fa fa-spinner fa-spin'></i> ...</p>;
    if (testimonials.length === 0) return <p className="text-center mt-5">No testimonials found.</p>;
  return (
    <>
    <div className="col-md-12 text-left p-2 mt-4">
    <MosyTitleTag className="col-md-12" title="Testimonials"/>
  </div> 
    <div className="testimonial_grid p-2 col-md-12"> 
      {testimonials.map((t, i) => (
        <TestimonialCard
          key={i}
          text={t.section_content}
          name={t.section_title}
        />
      ))}

      <style jsx>{`
        .testimonial_grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          padding: 40px 0;
        }
      `}</style>
    </div>
    </>
  );
}
