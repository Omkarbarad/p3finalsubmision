import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { initializePlaylist } from '../initialize';
import Navbar from './Navbar';
import { useMusicContext } from '../Context';
import './Home.css';

function Home() {
  const [keyword, setKeyword] = useState('');
  const [message, setMessage] = useState('');
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('email') || '');
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/signin');
  };

  const {
    isLoading,
    setIsLoading,
    setLikedMusic,
    setPinnedMusic,
    resultOffset,
    setResultOffset,
  } = useMusicContext();

  const resultOffsetRef = useRef(resultOffset);
  resultOffsetRef.current = resultOffset;

  const fetchMusicData = async (offset = 0) => {
    setTracks([]);
    setMessage('');
    window.scrollTo(0, 0);
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/songs`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch music data: ${response.statusText}`);
      }

      const jsonData = await response.json();
      console.log('Fetched songs:', jsonData);

      if (jsonData.length === 0) {
        setMessage('No songs found.');
      } else {
        setTracks(jsonData.slice(offset, offset + 10));
        setFilteredTracks(jsonData.slice(offset, offset + 10));
      }
    } catch (error) {
      setMessage('We couldn’t retrieve the music data. Please try again.');
      console.error('Error fetching music data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (keyword.trim() === '') {
      setFilteredTracks(tracks);
    } else {
      setFilteredTracks(
        tracks.filter((track) =>
          track.songname.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
  }, [keyword, tracks]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setResultOffset(0);
      fetchMusicData(0);
    }
  };

  const handleSearchClick = () => {
    if (!keyword.trim()) {
      setMessage('Please enter a search term');
      return;
    }
    setResultOffset(0);
    fetchMusicData(0);
  };

  useEffect(() => {
    initializePlaylist();
    fetchMusicData();
    setLikedMusic(JSON.parse(localStorage.getItem('likedMusic')) || []);
    setPinnedMusic(JSON.parse(localStorage.getItem('pinnedMusic')) || []);
  }, [setLikedMusic, setPinnedMusic]);

  useEffect(() => {
    if (!hasSearched) {
      fetchMusicData();
      setHasSearched(true);
    }
  }, [hasSearched]);

  const [currentAudio, setCurrentAudio] = useState(null);

  const playSong = (track) => {
    const audioUrl = `http://localhost:3000${track.url}`;
    if (currentAudio) {
      currentAudio.pause();
    }
    const audio = new Audio(audioUrl);
    audio.play();
    setCurrentAudio(audio);
    console.log(`Playing song: ${track.songname}, URL: ${audioUrl}`);
  };

  return (
    <>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={handleKeyPress}
        fetchMusicData={handleSearchClick}
        userEmail={userEmail}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        handleLogout={handleLogout}
      />

      <div className="container">
        {isLoading && (
          <div className="row">
            <div className="col-12 py-5 text-center">
              <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
        {message && (
          <div className="row">
            <div className="col-12 py-2 text-center">
              <h4 className="text-center text-danger">{message}</h4>
            </div>
          </div>
        )}
        <div className="row">
          {filteredTracks.length > 0 ? (
            filteredTracks.map((element) => (
              <Card key={element._id || `${element.songname}-${element.singer}`} element={element}>
                <img
                  src={`http://localhost:3000${element.image || '/placeholder.png'}`}
                  alt={element.singer || 'Unknown Artist'}
                  className="img-fluid"
                />
                <h5>{element.songname || 'Unknown Song'}</h5>
                <p>{`Artist: ${element.singer || 'Unknown Artist'}`}</p>
                <p>{`Release date: ${element.releaseDate || 'Unknown Date'}`}</p>
                <button onClick={() => playSong(element)} className="btn btn-primary mt-2">
                  Play
                </button>
              </Card>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No tracks available. Please perform a search.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
