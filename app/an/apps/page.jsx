import { Suspense } from 'react';

import AppList from './AppList';
import { NavBar } from '../Includes';
    
import { hiveRoutes } from '../../appConfigs/hiveRoutes';
import { SeoMeta } from '../seoTag';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "App Nebula Portfolio "//searchParams?.mosyTitle || "Project Portfolio";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Project Portfolio`,
    description: 'appnebula Project Portfolio',
    
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
                    <AppList />
                    
                  </Suspense>                 
            </div>
          </div>
        </>
      );
    }