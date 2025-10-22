// components/ClientsGrid.js
"use client";
import React, { useState, useEffect } from "react";

import { hiveRoutes } from "../../appConfigs/hiveRoutes";
import { getApiRoutes } from "../../appnebula/AppRoutes/apiRoutesHandler";
import { mosyBtoa, mosyGetData } from "../../MosyUtils/hiveUtils";
const apiRoutes = getApiRoutes()

import { MosyTitleTag } from "../../mosybilling/UiControl/componentControl";
import ClientCard from "./clients";

export default function ClientsGrid({limit = 5}) {
  const [clients, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function loadCases() {
        try {
          const data = await mosyGetData({
             endpoint: apiRoutes.webcontent.base,
            params:{ 
            q: mosyBtoa("where section_tag='clientList'"),    
            fullQ :true,
            aw:mosyBtoa(`order by RAND()`),            
            pagination : `l:qweb_content_page:100:1`
            }
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

  return (
    <>
    <MosyTitleTag title="Some of our Clients" className="col-md-12 text-left p-2 mt-4"/>
    <div className="elforge_mosy_clients_grid p-2">
      {clients.map((client, i) => (
        <ClientCard key={i} 
        logo={`${hiveRoutes.hiveBaseRoute}/api/mediaroom?media=${btoa(client.section_pic)}`}
        name={client.section_title} />
      ))}

      <style jsx>{`
        .elforge_mosy_clients_grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr); /* max 4 per row */
          gap: 20px;
          padding: 40px 0;
        }

        @media (max-width: 992px) {
          .elforge_mosy_clients_grid {
            grid-template-columns: repeat(6, 1fr); /* 3 per row on medium screens */
          }
        }

        @media (max-width: 768px) {
          .elforge_mosy_clients_grid {
            grid-template-columns: repeat(3, 1fr); /* 2 per row on small screens */
          }
        }

        @media (max-width: 480px) {
          .elforge_mosy_clients_grid {
            grid-template-columns: 2fr; /* 1 per row on mobile */
          }
        }
      `}</style>
    </div>

</> 
 );
}
