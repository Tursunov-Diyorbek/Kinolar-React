import React, { useContext } from "react";
import { ContextApi } from "../../Api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export const NewMovie = () => {
  const api = useContext(ContextApi);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery("kinolar", () =>
    api.get("/kinolar"),
  );

  if (isLoading)
    return (
      <div className={"flex justify-center items-center h-[100vh]"}>
        <div className={"text-blue-600 font-bold text-3xl"}>Kuting...</div>
      </div>
    );
  if (isError)
    return (
      <div className={"flex justify-center items-center h-[100vh]"}>
        <div className={"text-red-700 font-bold text-3xl"}>
          Xatolik yuz berdi {error.message}
        </div>
      </div>
    );

  const movieNew = data?.data.slice(-3).reverse();

  return (
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
      {movieNew.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div
              style={{
                height: "100%",
                cursor: "pointer",
                backgroundImage: `url(${item.poster})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
              onClick={() =>
                navigate(
                  `/${item.name.toLowerCase().replaceAll(" ", "-")}/${item.id}`,
                )
              }
            ></div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
