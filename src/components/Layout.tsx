'use client'
import React, { PropsWithChildren, useState } from "react";
import CardOne from "./cards/CardOne";
import CardTwo from "./cards/CardTwo";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Head from 'next/head'
import { Suspense } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import Footer from "./Footer";

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/earth/scene.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={0.01} />
    </>
  );
};


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
    
      <div className="row-span-2 pt-10">
          <CardOne />
        </div>
       <div className="globe">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
          <Suspense fallback={null}>
            <Model />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls autoRotate />
        </Canvas>
      </div>
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