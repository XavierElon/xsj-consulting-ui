'use client'
import React, { PropsWithChildren, useState } from "react";
import CardOne from "./cards/CardOne";
import CardTwo from "./cards/CardTwo";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = (props: PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid min-h-screen grid-rows-header">

        <Navbar open={isOpen} handleClick={() => setIsOpen(!isOpen)} />

      <div className="grid grid-cols-sidebar-content">
      
                  <Sidebar open={isOpen} setOpen={setIsOpen} />
              
              <div className="p-4">
                  {props.children}
        </div>
    
      <div className="row-span-2">
          <CardOne />
        </div>
        <div className="row-span-2">
          <CardTwo />
          </div>
      </div>
    </div>
  );
};

export default Layout;