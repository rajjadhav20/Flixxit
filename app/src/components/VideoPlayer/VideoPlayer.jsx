import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import "./VideoPlayer.css";

const VideoPlayer = ({ movie, play, setPlay }) => {
  const [player, setPlayer] = useState(null); 
  const [skipIntro, setSkipIntro] = useState(false);
  //const [selectedQuality, setSelectedQuality] = useState("auto");
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      const api_key = process.env.REACT_APP_API_KEY;
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${api_key}&language=en-US`
        );
        const trailers = response.data.results.filter(
          (video) => video.type === "Trailer"
        );
        if (trailers.length > 0) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailers[0].key}`);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailer();
  }, [movie.id]);

  const handlePlayerReady = (player) => {
    setPlayer(player);
  };

  const handleSkipIntro = () => {
    if (player) {
      const secondsToSkip = 6;
      player.seekTo(secondsToSkip, "seconds");
      setSkipIntro(true);
    }
  };

  // const handleQualityChange = (event) => {
  //   setSelectedQuality(event.target.value);
  // };

  //const qualityOptions = ["auto", "4k", "1080p", "720p", "480p", "360p", "240p", "144p"];

  return (
    <div className="video-player-container">
      {trailerUrl ? (
        <ReactPlayer
          url={trailerUrl}
          controls
          width="100%"
          height="auto"
          playing
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onEnded={() => setSkipIntro(false)}
          onReady={handlePlayerReady}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload", 
              },
            },
          }}
        />
      ) : (
        <p>Loading trailer...</p>
      )}
      {skipIntro ? (
        <div className="skip-intro-message">Intro skipped!</div>
      ) : (
        <button onClick={handleSkipIntro} className="skip-intro-button">
          Skip Intro
        </button>
      )}

      <div className="quality-options">
        {play ? (
          <button
            style={{ backgroundColor: "#00000063" }}
            onClick={() => {
              setPlay(!play);
            }}
          >
            {"<"}
          </button>
        ) : null}
        {/* <select
          value={selectedQuality}
          onChange={handleQualityChange}
          className="quality-select"
        >
          {qualityOptions.map((quality) => (
            <option key={quality} value={quality}>
              {quality}
            </option>
          ))}
        </select> */}
      </div>
    </div>
  );
};

export default VideoPlayer;