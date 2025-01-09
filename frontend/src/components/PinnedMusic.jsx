import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { MusicContext } from "../Context";

function PinnedMusic() {
  const { pinnedMusic, setPinnedMusic } = useContext(MusicContext);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Retrieve pinned music from localStorage
    const localPinnedMusic = JSON.parse(localStorage.getItem("pinnedMusic")) || [];
    setPinnedMusic(localPinnedMusic);
  }, [setPinnedMusic]);

  return (
    <div className="pinned-music-container">
      <div className="container">
        {/* If no pinned music, show a friendly message */}
        {pinnedMusic.length === 0 ? (
          <div className="row">
            <div className="col text-center py-5">
              <h3>You don't have any pinned music yet!</h3>
              <div>
                <i className="bi bi-emoji-frown fs-1"></i>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Title for pinned music */}
            <h1 className="text-primary text-center py-3">
              Your Pinned Music <i className="bi bi-pin-angle-fill text-primary"></i>
            </h1>

            {/* Display pinned music cards */}
            <div className="row">
              {pinnedMusic.map((element) => (
                <div className="col-md-4 mb-4" key={element.id}>
                  <Card element={element} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PinnedMusic;
