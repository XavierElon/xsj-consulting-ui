'use client'
import React, { PropsWithChildren, useEffect, useState } from "react";
import Navbar from "./cards/navigation/Navbar";
import Sidebar from "./cards/navigation/Sidebar";
import Footer from "./cards/navigation/Footer";

const Layout = (props: PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex-grid min-h-screen grid-rows-header">

        <Navbar open={isOpen} handleClick={() => setIsOpen(!isOpen)} />

      <div className="grid grid-cols-sidebar-content">
      
                  <Sidebar open={isOpen} setOpen={setIsOpen} />
              
              <div>
                  {props.children}
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