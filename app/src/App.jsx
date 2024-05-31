import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/HomePage.jsx";
import Profile from "./pages/Profile/ProfilePage.jsx";
import Watchlist from "./pages/WatchList/WatchlistPage.jsx";
import AboutUs from "./pages/About/AboutPage.jsx";
import SearchMovies from "./components/SearchMovie/SearchMovies.jsx";
import MovieDetail from "./components/MovieDetail/MovieDetail.jsx";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer.jsx";
import Register from "./pages/Login/RegisterPage.jsx";
import Login from "./pages/Login/LoginPage.jsx";
import CategoryPage from "./pages/Category/CategoryPage.jsx";
import PaymentPage from "./pages/Payments/PaymentPage.jsx";
import NotFound from "./pages/Login/NotFoundPage.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/search/:query" element={<SearchMovies />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/Payment" element={<PaymentPage />} />
          <Route path="/videos" element={<VideoPlayer />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
