import React, { useState } from 'react';
import { MusicContext } from '../Context';
import PinnedMusic from './PinnedMusic';
import LikedMusic from './LikedMusic';
import './Navbar.css';

const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData, userEmail, handleLogout }) => {
  const { setResultOffset } = React.useContext(MusicContext);

  // State to control the visibility of the modals and user dropdown
  const [showPinnedModal, setShowPinnedModal] = useState(false);
  const [showLikedModal, setShowLikedModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);  // Track if email is clicked

  const togglePinnedModal = () => {
    setShowPinnedModal(!showPinnedModal);
  };

  const toggleLikedModal = () => {
    setShowLikedModal(!showLikedModal);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
        <div className="container-fluid">
          {/* Music App Text (non-clickable) */}
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
                  onClick={togglePinnedModal}
                  className="btn btn-outline-light btn-sm mx-1 nav-btn"
                >
                  <i className="bi bi-pin-angle-fill"></i> Pinned Playlist
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  onClick={toggleLikedModal}
                  className="btn btn-outline-light btn-sm mx-1 nav-btn"
                >
                  <i className="bi bi-heart-fill"></i> Liked Playlist
                </button>
              </li>

              {/* Email Dropdown */}
              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle btn-sm mx-1 nav-btn"
                  onClick={toggleDropdown}
                  id="navbarDropdown"
                  aria-expanded={showDropdown}
                >
                  {userEmail}
                </button>
                <ul
                  className={`dropdown-menu ${showDropdown ? 'show' : ''}`}
                  aria-labelledby="navbarDropdown"
                >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
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
        <div
          className="modal fade modal-xl"
          id="exampleModal"
          tabIndex={1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Pinned Music
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={togglePinnedModal}
                  aria-label="Close"
                />
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
        <div
          className="modal fade modal-xl"
          id="likedMusicModal"
          tabIndex={1}
          aria-labelledby="likedMusicModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="likedMusicModalLabel">
                  Liked Music
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggleLikedModal}
                  aria-label="Close"
                />
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
