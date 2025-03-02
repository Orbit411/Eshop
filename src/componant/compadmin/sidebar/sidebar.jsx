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

    
      </div>
    </>
  );
};

export default Sidebar;
