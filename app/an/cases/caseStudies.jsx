"use client";
import { useEffect , useState } from "react";
import { getApiRoutes } from "../../appnebula/AppRoutes/apiRoutesHandler";
import { magicTrimText, mosyGetData } from "../../MosyUtils/hiveUtils";
import { hiveRoutes } from "../../appConfigs/hiveRoutes";

const apiRoutes = getApiRoutes()

export default function CaseStudies() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);


    useEffect(() => {
      async function loadCases() {
        try {
          const data = await mosyGetData({ endpoint: apiRoutes.blogposts.base });
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

  return (
    <>
      <style jsx>{`
        .elforge_mosy_cases_v1 {
          padding: 80px 20px;
          background: #fdfdfd;
        }
        .elforge_mosy_cases_v1 h2 {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 50px;
          color: #222;
        }
        .elforge_mosy_case_card {
          background: #fff;
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          transition: 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .elforge_mosy_case_card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
        }
        .elforge_mosy_case_title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 10px;
          color: #111;
        }
        .elforge_mosy_case_industry {
          font-size: 0.95rem;
          font-weight: 500;
          color: #0070f3;
          margin-bottom: 15px;
        }
        .elforge_mosy_case_desc {
          font-size: 1rem;
          color: #555;
          margin-bottom: 20px;
          flex-grow: 1;
        }
        .elforge_mosy_case_btn {
          display: inline-block;
          padding: 10px 18px;
          border-radius: 12px;
          background: #0070f3;
          color: #fff;
          text-decoration: none;
          font-weight: 500;
          transition: 0.3s ease;
        }
        .elforge_mosy_case_btn:hover {
          background: #0057c2;
        }
      `}</style>

<section className="row col-md-12 justify-content-center m-0 p-0 ">
<div className="row col-md-12 justify-content-center m-0 p-0 ">
      <h2 className="p-3">Case Studies</h2>
          <div className="row col-md-12 justify-content-center m-0 p-0 ">
            {studies.map((study, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="elforge_mosy_case_card">
                  <div>
                    <img
                    src={`${hiveRoutes.hiveBaseRoute}/api/mediaroom?media=${btoa(study.post_photo)}`}
                    className="card-img-top rounded mb-3"
                    alt={study.post_title}
                    style={{ objectFit: "cover", height: "180px" }}
                    />                     
                    <h3 className="elforge_mosy_case_title">{study.post_title}</h3>
                    <div className="elforge_mosy_case_industry">
                      {magicTrimText(study.post_tag, 100)}
                    </div>
                    <p className="elforge_mosy_case_desc">
                      {study.post}
                    </p>
                  </div>
                  <div className="col-md-12 text-right">
                  <a href={`post?id=${study.post_id}`} className="">
                    Read more  <i className="fa fa-arrow-right ml-2"></i>
                  </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
