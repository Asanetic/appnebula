import { Suspense } from 'react';

import { NavBar } from '../elements/navbar';    
import { hiveRoutes } from '../../appConfigs/hiveRoutes';
import Footer from '../elements/footer';
import TestimonialsSection from './testimonialcard';
import ClientsGrid from './clientdata';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Our clients  : Kibao business apps "//searchParams?.mosyTitle || "Project Portfolio";

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
                    <div className="col-md-12 p-3 m-0 ">
                    <ClientsGrid limit="100" />
                    <TestimonialsSection limit="100"/>
                    </div>
                    <Footer/>                    
                  </Suspense>                 
            </div>
          </div>
        </>
      );
    }