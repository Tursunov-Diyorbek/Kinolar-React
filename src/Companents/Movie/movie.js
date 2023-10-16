import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useMemo, useState } from "react";
import { ContextApi } from "../../Api/index";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button, Col, Row, Typography, Form, message, Card } from "antd";
import { BsDownload } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { SlLike, SlDislike } from "react-icons/sl";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import axios from "axios";

export const Movie = () => {
  const api = useContext(ContextApi);
  const { movie } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [infoFilm, setInfoFilm] = useState("");
  const [form] = Form.useForm();

  let userData = JSON.parse(localStorage.getItem("user"));

  const { data, isLoading, isError, error } = useQuery(["movies", movie], () =>
    axios.get(`https://kinolaruz.pythonanywhere.com/movies/${movie}/`),
  );

  const filterMovie = useMemo(
    () => data?.data || { messages: [] },
    [data?.data],
  );

  const {
    mutate: putFilm,
    isLoading: isLoadingPut,
    isError: isErrorPut,
  } = useMutation(
    (newMessage) => {
      return axios.post(
        `https://kinolaruz.pythonanywhere.com/movies/movies/${filterMovie.id}/reviews-create/`,
        newMessage,
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["movies", movie]);
      },
    },
  );

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Izoh joylandi 📝",
    });
  };

  const saveMessages = async (values) => {
    putFilm({
      ...values,
      full_name: userData.username,
    });
    success();
    form.resetFields();
  };

  const { mutate: movieLike } = useMutation(
    () =>
      axios.post(
        `https://kinolaruz.pythonanywhere.com/movies/${filterMovie.id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokens")}`,
          },
        },
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["movies", movie]);
      },
    },
  );

  const UserLike = () => {
    movieLike();
  };

  if (isLoading)
    return (
      <div className={"flex justify-center items-center h-[100vh]"}>
        <div className="three-body">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
      </div>
    );
  if (isError)
    return (
      <div className={"flex justify-center items-center h-[100vh] flex-col"}>
        <div className={"text-red-700 font-bold text-3xl text-center"}>
          Xatolik yuz berdi {error.message}
        </div>
        <button
          className="button mt-3"
          onClick={() => window.location.reload()}
        >
          <svg
            className="svg-icon"
            fill="none"
            height="20"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="#ff342b" stroke-linecap="round" stroke-width="1.5">
              <path d="m3.33337 10.8333c0 3.6819 2.98477 6.6667 6.66663 6.6667 3.682 0 6.6667-2.9848 6.6667-6.6667 0-3.68188-2.9847-6.66664-6.6667-6.66664-1.29938 0-2.51191.37174-3.5371 1.01468"></path>
              <path d="m7.69867 1.58163-1.44987 3.28435c-.18587.42104.00478.91303.42582 1.0989l3.28438 1.44986"></path>
            </g>
          </svg>
          <span className="lable">Qayta yuklash</span>
        </button>
      </div>
    );

  return (
    <>
      {contextHolder}
      <Row className={"flex items-start p-2"}>
        <Col
          xs={{ span: 24 }}
          md={{ span: 16 }}
          xl={{ span: 16 }}
          className={"pe-3"}
        >
          <video
            src={filterMovie.video_url}
            style={{ width: "100%", maxHeight: 550, borderRadius: 5 }}
            controls
            poster={filterMovie.poster_url}
          ></video>
          <div className={"flex justify-between items-center"}>
            <a href={filterMovie.video_url} download>
              <Button
                className={
                  "bg-[#272727] rounded-3xl my-3 flex text-white gap-1"
                }
              >
                <BsDownload style={{ fontSize: 20 }} />
                <span>Yuklab olish</span>
              </Button>
            </a>
            <div
              className={"flex items-center gap-3  cursor-pointer text-white"}
            >
              {filterMovie.liked ? (
                <Typography className={"text-2xl"}>
                  <SlLike style={{ color: "red" }} onClick={UserLike} />
                </Typography>
              ) : (
                <Typography className={"text-2xl"}>
                  <SlDislike style={{ color: "#fff" }} onClick={UserLike} />
                </Typography>
              )}
              <Typography className={"text-2xl text-white"}>
                {filterMovie.num_likes}
              </Typography>
            </div>
          </div>
          <div className={"bg-[#272727] p-2 mb-4"} style={{ borderRadius: 5 }}>
            <div className={"flex"}>
              <div className={"w-[200px] h-[100%]"}>
                <img
                  src={filterMovie.img_url}
                  alt="rasm"
                  style={{ borderRadius: 5 }}
                />
              </div>
              <div className={"ms-3"}>
                <div className={"text-white flex"}>
                  <Typography className={"text-[#a5bbdc] font-bold w-[130px]"}>
                    Kino nomi:
                  </Typography>
                  {filterMovie.name}
                </div>
                <div className={"text-white mt-1 flex"}>
                  <Typography className={"text-[#a5bbdc] font-bold w-[130px]"}>
                    Joylandi:
                  </Typography>
                  {filterMovie.created_at?.slice(0, 10)}
                </div>
                <div className={"text-white mt-1 flex"}>
                  <Typography className={"text-[#a5bbdc] font-bold w-[130px]"}>
                    Yil:{" "}
                  </Typography>
                  {filterMovie.movie_year}
                </div>
                <div className={"text-white mt-1 flex"}>
                  <Typography className={"text-[#a5bbdc] font-bold w-[130px]"}>
                    Davomiyligi:{" "}
                  </Typography>
                  {filterMovie.duration}
                </div>
                <div className={"text-white mt-1 flex"}>
                  <Typography className={"text-[#a5bbdc] font-bold w-[130px]"}>
                    Mamlakat:{" "}
                  </Typography>
                  {filterMovie.country}
                </div>
                <div className={"text-white mt-1 flex"}>
                  <Typography className={"text-[#a5bbdc] font-bold w-[130px]"}>
                    Janr:{" "}
                  </Typography>
                  <div>
                    {filterMovie.category?.map((item, index) => {
                      return (
                        <Button
                          key={index}
                          type={"link"}
                          onClick={() => navigate(`/filtr/${item.slug}`)}
                          className={"p-0 me-5"}
                        >
                          {item.name},
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() =>
                infoFilm === "" ? setInfoFilm("active") : setInfoFilm("")
              }
              className={"overflow-hidden cursor-pointer mt-5 readmore"}
              style={{
                height: infoFilm === "active" ? "auto" : 45,
              }}
            >
              {filterMovie.description}
            </div>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          md={{ span: 8 }}
          xl={{ span: 8 }}
          className={"bg-[#272727] p-2 my-3"}
          style={{ borderRadius: 5 }}
        >
          <Form onFinish={saveMessages} className={"w-[100%]"} form={form}>
            <label>
              <Typography className={"text-gray-500 mt-2"}>
                Izohingizni qoldiring 📝
              </Typography>
              <Form.Item
                name={"comment"}
                rules={[
                  {
                    required: true,
                    message: "Kechirasiz siz izoh qoldirmadingiz 📝!",
                  },
                ]}
              >
                <TextArea
                  rows={3}
                  style={{
                    background: "none",
                    color: "gray",
                    border: "1px solid gray",
                  }}
                />
              </Form.Item>
            </label>
            <div className={"flex justify-end"}>
              <Button
                htmlType={"submit"}
                className={"bg-green-500 text-white"}
                type={"success"}
              >
                Yuborish
              </Button>
            </div>
          </Form>
          <div>
            <Typography className={"text-gray-500 text-center my-2"}>
              Izohlar
            </Typography>
            <div style={{ maxHeight: 678, overflowY: "scroll" }}>
              {filterMovie.reviews?.map((item, index) => {
                return (
                  <div key={index} className={"p-1"}>
                    <Card
                      className={"p-1 bg-[#333333] border-0"}
                      title={
                        <span
                          className={"flex items-center gap-1 text-gray-400"}
                        >
                          <FaUser /> {item.full_name}
                        </span>
                      }
                      size="small"
                    >
                      <div className={"flex justify-between"}>
                        <Typography className={"text-[#a5bbdc]"}>
                          {item.comment}
                        </Typography>
                        <Typography
                          style={{
                            fontSize: 7,
                            display: "flex",
                            alignItems: "end",
                            minWidth: 60,
                          }}
                          className={"text-blue-100"}
                        >
                          {item.created_at
                            ? dayjs(item.created_at).format("YYYY.MM.DD HH:mm")
                            : ""}
                        </Typography>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
