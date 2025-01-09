import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { MusicContext } from "../Context";

function LikedMusic() {
  const { likedMusic, setLikedMusic } = useContext(MusicContext);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Retrieve liked music from localStorage
    const localLikedMusic = JSON.parse(localStorage.getItem("likedMusic")) || [];
    setLikedMusic(localLikedMusic);
  }, [setLikedMusic]);

  return (
    <div className="liked-music-container">
      {/* If no liked music, show a friendly message */}
      {likedMusic.length === 0 ? (
        <div className="container text-center">
          <h3 className="py-5">You don't have any liked music yet!</h3>
          <div>
            <i className="bi bi-emoji-frown fs-1"></i>
          </div>
        </div>
      ) : (
        <>
          {/* Title for liked music */}
          <h1 className="text-danger text-center py-3">
            Your Liked Music <i className="bi bi-heart-fill text-danger"></i>
          </h1>

          {/* Display liked music cards */}
          <div className="container">
            <div className="row">
              {likedMusic.map((element) => (
                <div className="col-md-4 mb-4" key={element.id}>
                  <Card element={element} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LikedMusic;
