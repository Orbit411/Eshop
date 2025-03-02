import { useEffect, useState } from "react";
import "./side.css";
import { MdClose } from "react-icons/md";

const Sidebar = ({ choose, isSidebarOpen }) => {
  const[closed,setclosed]=useState(false)
  useEffect(()=>{
setclosed(isSidebarOpen)
  },[isSidebarOpen])

  const target = (params) => {
    choose(params);
  };

  return (
    <>
      <div className={`side  `} style={{left:closed==false? "-100%":"0" , }} >
        <a
          href="#"
        
          className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
        >
          Eshop    
        </a>
        <button className="close-button" onClick={() => {
            setclosed(false)
          }}><MdClose /></button>
        <ul>
          <li
            onClick={() => {
              target("Products");
            }}
          >
            All Product
          </li>
          <li
            onClick={() => {
              target("Orders");
            }}
          >
            Orders
          </li>
          <li
            onClick={() => {
              target("Add");
            }}
          >
            Add
          </li>
        </ul>

        <div className="by">By Codeorbit team</div>
      </div>
    </>
  );
};

export default Sidebar;
