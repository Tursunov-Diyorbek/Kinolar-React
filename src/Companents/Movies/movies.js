import React, { useContext, useMemo, useState, useEffect } from "react";
import { ContextApi } from "../../Api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Form, Input, Typography } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Fade } from "react-awesome-reveal";
import "swiper/css";
import axios from "axios";
import { FaTelegram } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Menu } from "../Menu/menu";

export const Movies = () => {
  const api = useContext(ContextApi);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("tokens");
    if (!token) {
      return navigate("/royxatdan-otish");
    }
  }, []);

  // const { data, isLoading, isError, error } = useQuery("movies", () =>
  //   api.get("movies/"),
  // );
  //
  // console.log(data);
  //
  // // const newFilms = useMemo(() => , [])
  //
  // if (isLoading)
  //   return (
  //     <div className={"flex justify-center items-center h-[100vh]"}>
  //       <div className={"text-blue-600 font-bold text-3xl"}>Kuting...</div>
  //     </div>
  //   );
  // if (isError)
  //   return (
  //     <div className={"flex justify-center items-center h-[100vh]"}>
  //       <div className={"text-red-700 font-bold text-3xl"}>
  //         Xatolik yuz berdi {error.message}
  //       </div>
  //     </div>
  //   );

  const [newFilms, setNewFilms] = useState([]);

  useEffect(() => {
    axios
      .get("https://kinolaruz.pythonanywhere.com/movies/")
      .then((res) => {
        const films = res?.data.results;
        const reversedFilms = films.slice(0, 3);
        setNewFilms(reversedFilms);
      })
      .catch((err) => console.log(err));
  }, []);

  //Categoriyalar

  // const { data, isLoading, isError, error } = useQuery("kinolar", () =>
  //   api.get("/kinolar"),
  // );
  //
  // const movies = useMemo(() => data?.data || [], [data?.data]);

  // const movieFilter = movies.map((item) =>
  //   item.name.toLowerCase().includes(search.toLowerCase()),
  // );
  const [translationMovies, setTranslationMovies] = useState([]);
  const [ujasMovies, setUasMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [cartoons, setCartoons] = useState([]);

  useEffect(() => {
    axios
      .get("https://kinolaruz.pythonanywhere.com/category/tarjima-kinolar/")
      .then((res) => setTranslationMovies(res?.data.results))
      .catch((err) => console.log(err));

    axios
      .get("https://kinolaruz.pythonanywhere.com/category/ujas/")
      .then((res) => setUasMovies(res?.data.results))
      .catch((err) => console.log(err));

    axios
      .get("https://kinolaruz.pythonanywhere.com/category/komediya/")
      .then((res) => setComedyMovies(res?.data.results))
      .catch((err) => console.log(err));

    axios
      .get("https://kinolaruz.pythonanywhere.com/category/multfilm/")
      .then((res) => setCartoons(res?.data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Menu />
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        style={{ height: 500 }}
      >
        {newFilms.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                style={{
                  height: "100%",
                  cursor: "pointer",
                  backgroundImage: `url(${item.poster_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
                onClick={() => navigate(`/${item.slug}`)}
              ></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Typography
        className={
          "font-bold text-2xl text-[#a5bbdc] px-3 pb-5 cursor-pointer inline-block mt-10"
        }
        onClick={() => navigate("/filtr/tarjima-kinolar")}
      >
        TARJIMA KINOLAR...
      </Typography>
      <Swiper
        style={{ padding: "0 10px" }}
        breakpoints={{
          100: {
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4.5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 8.5,
            spaceBetween: 10,
          },
        }}
      >
        {translationMovies.map((item2, index) => {
          return (
            <SwiperSlide key={index} onClick={() => navigate(`/${item2.slug}`)}>
              <Fade duration={1000}>
                <div className={"movieHover cursor-pointer"}>
                  <img
                    src={item2.img_url}
                    alt="rasm"
                    style={{
                      borderRadius: 10,
                    }}
                  />
                  <div className={"my-2"}>
                    <Typography
                      className={"text-[#a5bbdc] font-bold"}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item2.name}
                    </Typography>
                    <Typography className={"text-blue-600 font-bold"}>
                      {item2.movie_year}
                    </Typography>
                  </div>
                </div>
              </Fade>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Typography
        className={
          "font-bold text-2xl text-[#a5bbdc] px-3 pb-5 cursor-pointer inline-block mt-10"
        }
        onClick={() => navigate("/filtr/ujas")}
      >
        UJAS KINOLAR...
      </Typography>
      <Swiper
        style={{ padding: "0 10px" }}
        breakpoints={{
          100: {
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4.5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 8.5,
            spaceBetween: 10,
          },
        }}
      >
        {ujasMovies.map((item2, index) => {
          return (
            <SwiperSlide key={index} onClick={() => navigate(`/${item2.slug}`)}>
              <Fade duration={1000}>
                <div className={"movieHover cursor-pointer"}>
                  <img
                    src={item2.img_url}
                    alt="rasm"
                    style={{
                      borderRadius: 10,
                    }}
                  />
                  <div className={"my-2"}>
                    <Typography
                      className={"text-[#a5bbdc] font-bold"}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item2.name}
                    </Typography>
                    <Typography className={"text-blue-600 font-bold"}>
                      {item2.movie_year}
                    </Typography>
                  </div>
                </div>
              </Fade>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Typography
        className={
          "font-bold text-2xl text-[#a5bbdc] px-3 pb-5 cursor-pointer inline-block mt-10"
        }
        onClick={() => navigate("/filtr/komediya")}
      >
        KOMEDIYA KINOLAR...
      </Typography>
      <Swiper
        style={{ padding: "0 10px" }}
        breakpoints={{
          100: {
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4.5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 8.5,
            spaceBetween: 10,
          },
        }}
      >
        {comedyMovies.map((item2, index) => {
          return (
            <SwiperSlide key={index} onClick={() => navigate(`/${item2.slug}`)}>
              <Fade duration={1000}>
                <div className={"movieHover cursor-pointer"}>
                  <img
                    src={item2.img_url}
                    alt="rasm"
                    style={{
                      borderRadius: 10,
                    }}
                  />
                  <div className={"my-2"}>
                    <Typography
                      className={"text-[#a5bbdc] font-bold"}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item2.name}
                    </Typography>
                    <Typography className={"text-blue-600 font-bold"}>
                      {item2.movie_year}
                    </Typography>
                  </div>
                </div>
              </Fade>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Typography
        className={
          "font-bold text-2xl text-[#a5bbdc] px-3 pb-5 cursor-pointer inline-block mt-10"
        }
        onClick={() => navigate("/filtr/multfilm")}
      >
        MULTFILIMLAR...
      </Typography>
      <Swiper
        style={{ padding: "0 10px" }}
        breakpoints={{
          100: {
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4.5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 8.5,
            spaceBetween: 10,
          },
        }}
      >
        {cartoons.map((item2, index) => {
          return (
            <SwiperSlide key={index} onClick={() => navigate(`/${item2.slug}`)}>
              <Fade duration={1000}>
                <div className={"movieHover cursor-pointer"}>
                  <img
                    src={item2.img_url}
                    alt="rasm"
                    style={{
                      borderRadius: 10,
                    }}
                  />
                  <div className={"my-2"}>
                    <Typography
                      className={"text-[#a5bbdc] font-bold"}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item2.name}
                    </Typography>
                    <Typography className={"text-blue-600 font-bold"}>
                      {item2.movie_year}
                    </Typography>
                  </div>
                </div>
              </Fade>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <footer
        style={{
          padding: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#272727",
          marginTop: 30,
        }}
      >
        <Typography className={"text-white text-2xl italic"}>
          Last Movies
        </Typography>
        <a
          href="https://t.me/Front_End_DeveIoper"
          target={"_blank"}
          className={"flex items-center gap-2"}
        >
          <FaTelegram style={{ fontSize: 20 }} /> Biz bilan bog'lanish
        </a>
      </footer>
    </>
  );
};
