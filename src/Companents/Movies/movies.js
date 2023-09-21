import React, { useContext } from "react";
import { ContextApi } from "../../Api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Typography } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const Movies = () => {
  const api = useContext(ContextApi);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery("kinolar", () =>
    api.get("/kinolar"),
  );

  return (
    <>
      <Typography className={"font-bold text-3xl text-white px-3 py-5"}>
        Tarjima kinolar...
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
            slidesPerView: 7.5,
            spaceBetween: 10,
          },
        }}
      >
        {data?.data
          .filter((item) => item.genre.includes("Tarjima kinolar"))
          .map((item2, index) => {
            return (
              <SwiperSlide
                key={index}
                onClick={() =>
                  navigate(
                    `/${item2.name.toLowerCase().replaceAll(" ", "-")}/${
                      item2.id
                    }`,
                  )
                }
              >
                <div className={"movieHover cursor-pointer"}>
                  <img
                    src={item2.img}
                    alt="rasm"
                    style={{
                      borderRadius: 5,
                    }}
                  />
                  <div className={"my-2"}>
                    <Typography
                      className={"text-white font-bold"}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item2.name}
                    </Typography>
                    <Typography className={"text-blue-600 font-bold"}>
                      {item2.movieyear}
                    </Typography>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <Typography className={"font-bold text-3xl text-white px-3 py-5"}>
        Ujas kinolar...
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
            slidesPerView: 7.5,
            spaceBetween: 10,
          },
        }}
      >
        {data?.data
          .filter((item) => item.genre.includes("Ujas"))
          .map((item2, index) => {
            return (
              <SwiperSlide
                className={"movieHover cursor-pointer"}
                key={index}
                onClick={() =>
                  navigate(
                    `/${item2.name.toLowerCase().replaceAll(" ", "-")}/${
                      item2.id
                    }`,
                  )
                }
              >
                <div className={"movieHover cursor-pointer"}>
                  <img
                    src={item2.img}
                    alt="rasm"
                    style={{
                      borderRadius: 5,
                    }}
                  />
                  <div className={"my-2"}>
                    <Typography
                      className={"text-white font-bold"}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item2.name}
                    </Typography>
                    <Typography className={"text-blue-600 font-bold"}>
                      {item2.movieyear}
                    </Typography>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <Typography className={"font-bold text-3xl text-white px-3 py-5"}>
        Hind kinolar...
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
            slidesPerView: 7.5,
            spaceBetween: 10,
          },
        }}
      >
        {data?.data
          .filter((item) => item.genre.includes("Hind"))
          .map((item2, index) => {
            return (
              <SwiperSlide
                className={"movieHover cursor-pointer"}
                key={index}
                onClick={() =>
                  navigate(
                    `/${item2.name.toLowerCase().replaceAll(" ", "-")}/${
                      item2.id
                    }`,
                  )
                }
              >
                <div className={"movieHover cursor-pointer"}>
                  <img
                    src={item2.img}
                    alt="rasm"
                    style={{
                      borderRadius: 5,
                    }}
                  />
                  <div className={"my-2"}>
                    <Typography
                      className={"text-white font-bold"}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item2.name}
                    </Typography>
                    <Typography className={"text-blue-600 font-bold"}>
                      {item2.movieyear}
                    </Typography>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};
