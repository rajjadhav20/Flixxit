import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import axios from "axios";

const Carousel = () => {
  const data = [
    {
      id: 653346,
      src: "/assets/caro1.webp",
      alt: "Image 1",
      title: "Kingdom of the Planet of the Apes",
    },
    {
      id: 823464,
      src: "/assets/caro2.webp",
      alt: "Image 2",
      title: "Godzilla x Kong: The New Empire",
    },
    {
      id: 693134,
      src: "/assets/caro3.webp",
      alt: "Image 3",
      title: "Dune: Part Two ",
    },
    {
      id: 746036,
      src: "/assets/caro4.webp",
      alt: "Image 4",
      title: "The Fall Guy",
    },
    {
      id: 786892,
      src: "/assets/caro5.webp",
      alt: "Image 5",
      title: "Furiosa: A Mad Max Saga",
    },
    {
      id: 872585,
      src: "/assets/caro6.webp",
      alt: "Image 6",
      title: "Oppenheimer",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesContainerRef = useRef(null);
  const navigate = useNavigate();
  const slideWidth = 100;
  const [trailerUrl, setTrailerUrl] = useState("");
  const [play, setPlay] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  const fetchTrailer = useCallback(async (movieId) => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
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
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? data.length - 1 : prevSlide - 1
    );
  }, [data.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === data.length - 1 ? 0 : prevSlide + 1
    );
  }, [data.length]);

  useEffect(() => {
    slidesContainerRef.current.style.transform = `translateX(-${
      currentSlide * slideWidth
    }%)`;
  }, [currentSlide, slideWidth]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [nextSlide]);

  const handleWatchNowClick = async (movieId) => {
    await fetchTrailer(movieId);
    setPlay(true);
    setMovieDetails(data.find((item) => item.id === movieId));
  };

  const handleCloseVideo = () => {
    setPlay(false);
    setTrailerUrl("");
  };

  return (
    <div className="carousel">
      <div className="slides-container" ref={slidesContainerRef}>
        {data.map((item) => (
          <div key={item.id} className="slide">
            <img src={item.src} alt={item.alt} />
            <div className="play-button">
              <span className="detail-span">{item.title}</span>
              <br />
              <br />
              <button
                className="btn"
                onClick={() => handleWatchNowClick(item.id)}
              >
                Watch Now
              </button>
              <button
                className="btn btn2"
                onClick={() => navigate(`/movie/${item.id}`)}
              >
                Get Detail
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="prev-button" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next-button" onClick={nextSlide}>
        &#10095;
      </button>
      {play && (
        <div className="video-overlay" onClick={handleCloseVideo}>
          <div className="video-player-wrapper">
            <button className="close-button" onClick={handleCloseVideo}>
              &times;
            </button>
            <VideoPlayer
              movie={movieDetails}
              play={play}
              setPlay={setPlay}
              trailerUrl={trailerUrl}
              className="video-player-section"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;


// //Old Code
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import "./Carousel.css";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import VideoPlayer from "../VideoPlayer/VideoPlayer";

// const Carousel = () => {
//   const data = [
//     {
//       id: 653346,
//       src: "/assets/caro1.webp",
//       alt: "Image 1",
//       title: "Kingdom of the Planet of the Apes",
//     },
//     {
//       id: 823464,
//       src: "/assets/caro2.webp",
//       alt: "Image 2",
//       title: "Godzilla x Kong: The New Empire",
//     },
//     {
//       id: 693134,
//       src: "/assets/caro3.webp",
//       alt: "Image 3",
//       title: "Dune: Part Two ",
//     },
//     {
//       id: 746036,
//       src: "/assets/caro4.webp",
//       alt: "Image 4",
//       title: "The Fall Guy",
//     },
//     {
//       id: 786892,
//       src: "/assets/caro5.webp",
//       alt: "Image 5",
//       title: "Furiosa: A Mad Max Saga",
//     },

//     {
//       id: 872585,
//       src: "/assets/caro6.webp",
//       alt: "Image 6",
//       title: "Oppenheimer",
//     },
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slidesContainerRef = useRef(null);
//   const { userInfo } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const slideWidth = 100;

//   const prevSlide = useCallback(() => {
//     setCurrentSlide((prevSlide) =>
//       prevSlide === 0 ? data.length - 1 : prevSlide - 1
//     );
//   }, [data.length]);

//   const nextSlide = useCallback(() => {
//     setCurrentSlide((prevSlide) =>
//       prevSlide === data.length - 1 ? 0 : prevSlide + 1
//     );
//   }, [data.length]);

//   useEffect(() => {
//     slidesContainerRef.current.style.transform = `translateX(-${
//       currentSlide * slideWidth
//     }%)`;
//   }, [currentSlide, slideWidth]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 5000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, [nextSlide]);

//   return (
//     <div className="carousel">
//       <div className="slides-container" ref={slidesContainerRef}>
//         {data.map((item) => (
//           <div key={item.id} className="slide">
//             <img src={item.src} alt={item.alt} />
//             <div className="play-button">
//               <span className="detail-span">{item.title}</span>

//               <br />
//               <br />
//               <button
//                 className="btn"
//                 onClick={
//                   userInfo.membership === "Plus"
//                     ? () => navigate(VideoPlayer)
//                     : () =>
//                         toast.info("Only accessible for Flixxit Plus Members")
//                 }
//               >
//                 Watch Now
//               </button>
//               <button
//                 className="btn btn2"
//                 onClick={() => navigate(`/movie/${item.id}`)}
//               >
//                 Get Detail
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button className="prev-button" onClick={prevSlide}>
//         &#10094;
//       </button>
//       <button className="next-button" onClick={nextSlide}>
//         &#10095;
//       </button>
//     </div>
//   );
// };

// export default Carousel;
