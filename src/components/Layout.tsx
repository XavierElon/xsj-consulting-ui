'use client'
import React, { PropsWithChildren, useState } from "react";
import CardOne from "./cards/CardOne";
import CardTwo from "./cards/CardTwo";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { CityCard } from "./cards/CityCard";

const Layout = (props: PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid min-h-screen grid-rows-header">

        <Navbar open={isOpen} handleClick={() => setIsOpen(!isOpen)} />

      <div className="grid grid-cols-sidebar-content">
      
                  <Sidebar open={isOpen} setOpen={setIsOpen} />
              
              <div>
                  {props.children}
        </div>
    
      <div className="row-span-1 py-20">
          <CardOne />
        </div>
       
          <CityCard />
        
        <div className="row-span-2">
          <CardTwo />
          </div>
      </div>
        <div className="flex justify-center">
          <div className="flex flex-col">
          <Footer />
        </div>
        </div>

    </div>
  );
};

export default Layout;