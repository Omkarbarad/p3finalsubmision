import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/addsong" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p>Add Song</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
