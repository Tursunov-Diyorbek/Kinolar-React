import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
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
import styles from "./index.module.sass";

export const Movies = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [newFilms, setNewFilms] = useState([]);

  useEffect(() => {
    axios
      .get("https://last-movies-beckend.onrender.com/kinolar")
      .then((res) => {
        const films = res?.data;
        const reversedFilms = films.reverse().slice(0, 3);
        setNewFilms(reversedFilms);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Categoriyalar

  const [translationMovies, setTranslationMovies] = useState([]);
  const [ujasMovies, setUasMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [cartoons, setCartoons] = useState([]);

  useEffect(() => {
    axios
      .get("https://last-movies-beckend.onrender.com/tarjima-kinolar/")
      .then((res) => setTranslationMovies(res?.data))
      .catch((err) => console.log(err));

    axios
      .get("https://last-movies-beckend.onrender.com/ujas")
      .then((res) => setUasMovies(res?.data))
      .catch((err) => console.log(err));

    axios
      .get("https://last-movies-beckend.onrender.com/komediya/")
      .then((res) => setComedyMovies(res?.data))
      .catch((err) => console.log(err));

    axios
      .get("https://last-movies-beckend.onrender.com/multfilm/")
      .then((res) => setCartoons(res?.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {loading ? (
        <div className={"flex justify-center items-center h-[100vh]"}>
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      ) : (
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
                      backgroundImage: `url(${item.img_url})`,
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
            className={styles.filter}
            onClick={() => navigate("/filter/tarjima-kino")}
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
            {translationMovies?.map((item2, index) => {
              return (
                <SwiperSlide
                  key={index}
                  onClick={() => navigate(`/${item2.slug}`)}
                >
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
            className={styles.filter}
            onClick={() => navigate("/filter/ujas")}
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
            {ujasMovies?.map((item2, index) => {
              return (
                <SwiperSlide
                  key={index}
                  onClick={() => navigate(`/${item2.slug}`)}
                >
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
            className={styles.filter}
            onClick={() => navigate("/filter/komediya")}
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
            {comedyMovies?.map((item2, index) => {
              return (
                <SwiperSlide
                  key={index}
                  onClick={() => navigate(`/${item2.slug}`)}
                >
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
            className={styles.filter}
            onClick={() => navigate("/filter/multfilm")}
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
            {cartoons?.map((item2, index) => {
              return (
                <SwiperSlide
                  key={index}
                  onClick={() => navigate(`/${item2.slug}`)}
                >
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
            className={styles.footer}
          >
            <Typography className={"text-white text-2xl italic"}>
              Last Movies
            </Typography>
            <a
              href="https://t.me/Front_End_DeveIoper"
              target={"_blank"}
              className={"flex items-center gap-2"}
            >
              <FaTelegram /> Biz bilan bog'lanish
            </a>
          </footer>
        </>
      )}
    </>
  );
};
