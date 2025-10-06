import { Suspense } from 'react';

import { NavBar } from '../elements/navbar';    
import { hiveRoutes } from '../../appConfigs/hiveRoutes';
import AppList from '../apps/AppList';
import CaseStudies from './caseStudies';
import Footer from '../elements/footer';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Kibao business apps "//searchParams?.mosyTitle || "Project Portfolio";

  return {
    title: mosyTitle,
    description: 'App Nebula: your haven for tailored business software.',        
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function ProjectportfolioMainListPage() {

return (
        <>
         <div className="main-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                    <NavBar/> 
                    <CaseStudies/>
                    <AppList />
                    <Footer/>
                    
                  </Suspense>                 
            </div>
          </div>
        </>
      );
    }