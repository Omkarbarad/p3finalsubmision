import { createContext, useState, useEffect, useContext } from "react";

// MusicContext for handling music-related state
export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  // Lazy initialization of state based on localStorage
  const getInitialState = (key) => JSON.parse(localStorage.getItem(key)) || [];

  const [isLoading, setIsLoading] = useState(false);
  const [likedMusic, setLikedMusic] = useState(() => getInitialState("likedMusic"));
  const [pinnedMusic, setPinnedMusic] = useState(() => getInitialState("pinnedMusic"));
  const [resultOffset, setResultOffset] = useState(0);

  // Sync likedMusic with localStorage
  useEffect(() => {
    if (likedMusic.length) {
      localStorage.setItem("likedMusic", JSON.stringify(likedMusic));
    }
  }, [likedMusic]);

  // Sync pinnedMusic with localStorage
  useEffect(() => {
    if (pinnedMusic.length) {
      localStorage.setItem("pinnedMusic", JSON.stringify(pinnedMusic));
    }
  }, [pinnedMusic]);

  return (
    <MusicContext.Provider
      value={{
        isLoading,
        setIsLoading,
        likedMusic,
        setLikedMusic,
        resultOffset,
        setResultOffset,
        pinnedMusic,
        setPinnedMusic,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

// Custom hook to access MusicContext more easily
export const useMusicContext = () => {
  return useContext(MusicContext);
};
