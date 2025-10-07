import { Suspense } from 'react';

import { NavBar } from '../elements/navbar';    
import { hiveRoutes } from '../../appConfigs/hiveRoutes';
import Footer from '../elements/footer';
import PostProfile from './post';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Case Studies  : Kibao business apps "//searchParams?.mosyTitle || "Project Portfolio";

  return {
    title: mosyTitle,
    description: 'The app nebula. Your haven for business custom software',
    
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
                    <PostProfile />
                    <Footer/>                    
                  </Suspense>                 
            </div>
          </div>
        </>
      );
    }