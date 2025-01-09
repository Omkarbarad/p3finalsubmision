import React, { useState, useContext } from "react";
import { MusicContext } from "../Context";
import PinnedMusic from "./PinnedMusic";
import LikedMusic from "./LikedMusic";
import "./Navbar.css";

const Navbar = ({
  keyword,
  handleKeyPress,
  setKeyword,
  fetchMusicData,
  userEmail,
  handleLogout,
}) => {
  const { setResultOffset } = useContext(MusicContext);

  // State for modals and dropdown
  const [showPinnedModal, setShowPinnedModal] = useState(false);
  const [showLikedModal, setShowLikedModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
        <div className="container-fluid">
          <span className="navbar-brand text-light">
            <i className="bi bi-music-note-list mx-2"></i>Music App
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex w-100 justify-content-center align-items-center">
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                onKeyDown={handleKeyPress}
                className="form-control me-2 search-input"
                type="search"
                placeholder="Search music..."
                aria-label="Search"
              />
              <button
                onClick={() => {
                  setResultOffset(0);
                  fetchMusicData();
                }}
                className="btn btn-primary search-btn"
              >
                Search
              </button>
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  type="button"
                  onClick={() => setShowPinnedModal(true)}
                  className="btn btn-outline-light btn-sm mx-1 nav-btn"
                >
                  <i className="bi bi-pin-angle-fill"></i> Pinned Playlist
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  onClick={() => setShowLikedModal(true)}
                  className="btn btn-outline-light btn-sm mx-1 nav-btn"
                >
                  <i className="bi bi-heart-fill"></i> Liked Playlist
                </button>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle btn-sm mx-1 nav-btn"
                  onClick={() => setShowDropdown((prev) => !prev)}
                  id="navbarDropdown"
                  aria-expanded={showDropdown}
                >
                  {userEmail}
                </button>
                <ul
                  className={`dropdown-menu ${showDropdown ? "show" : ""}`}
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Pinned Music Modal */}
      {showPinnedModal && (
        <div className="modal d-block">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pinned Music</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPinnedModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <PinnedMusic />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Liked Music Modal */}
      {showLikedModal && (
        <div className="modal d-block">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Liked Music</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLikedModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <LikedMusic />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
