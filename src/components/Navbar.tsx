'use client'

import React from 'react'
import { CgMenuGridR } from 'react-icons/cg'
import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

type Props = {
  open: boolean;
  handleClick(): void;
};
const Navbar = (props: Props) => {
  return (
    <nav
      className={classNames({
        "text-zinc-500": true, // colors
        "flex items-center": true, // layout
        "w-full fixed z-10 px-4 shadow-sm h-16": true, //positioning & styling
      })}
    >
      <div className="font-bold text-lg">My Logo</div>
      <div className="flex-grow"></div>
      {props.open ? (
        <button onClick={props.handleClick}>
          <XMarkIcon className="h-6 w-6" />
        </button>
      ) : (
      <button onClick={props.handleClick}>
        <CgMenuGridR  className="h-6 w-6" />
          </button>
      )}
    </nav>
  );
};

export default Navbar;