import React from "react";
import {
  BsGrid1X2Fill,
  BsPeopleFill,
  BsTable,
} from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaSignInAlt } from "react-icons/fa";
import { SiGnuprivacyguard } from "react-icons/si";

export const Sidebar =({ openSidebarToggle, OpenSidebar })=> {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        {/* <div className="sidebar-brand">
          <BsGrid1X2Fill className="icon_header" /> Dashboard
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span> */}
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsPeopleFill className="icon" /> Profile
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsTable className="icon" /> Table
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <IoIosNotificationsOutline className="icon" /> Notifications
          </a>
        </li>
        <div className="bottom-red">
          <h1 className="Auth_link">AuthPages</h1>
          <li className="sidebar-list-item">
            <a href="">
              <FaSignInAlt className="icon" /> Sign In
            </a>
          </li>
          <li className="sidebar-list-item">
            <a href="">
              <SiGnuprivacyguard className="icon" /> Signup
            </a>
          </li>
         
        </div>
      </ul>
    </aside>
  );
}


