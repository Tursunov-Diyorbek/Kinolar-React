import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useMemo, useState } from "react";
import { ContextApi } from "../../Api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  Button,
  Col,
  Row,
  Typography,
  Form,
  message,
  Card,
  Space,
  Spin,
} from "antd";
import { BsDownload } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { SlLike, SlDislike } from "react-icons/sl";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

export const Movie = () => {
  const api = useContext(ContextApi);
  const { movie } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [infoFilm, setInfoFilm] = useState("");
  const [form] = Form.useForm();

  let userData = JSON.parse(localStorage.getItem("user"));

  const { data, isLoading, isError, error } = useQuery(["movies", movie], () =>
    api.get(`movies/${movie}/`),
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
      return api.post(
        `movies/movies/${filterMovie.id}/reviews-create/`,
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
    () => {
      return api.post(`movies/${filterMovie.id}/like`);
    },
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
      <div className={"flex justify-center items-center h-[100vh]"}>
        <div className={"text-red-700 font-bold text-3xl"}>
          Xatolik yuz berdi {error.message}
        </div>
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
                <Typography className={"text-white"}>
                  <span className={"text-[#a5bbdc] font-bold"}>
                    Kino nomi:{" "}
                  </span>
                  {filterMovie.name}
                </Typography>
                <Typography className={"text-white my-1"}>
                  <span className={"text-[#a5bbdc] font-bold"}>Joylandi: </span>
                  {filterMovie.created_at?.slice(0, 10)}
                </Typography>
                <Typography className={"text-white my-1"}>
                  <span className={"text-[#a5bbdc] font-bold"}>Yil: </span>{" "}
                  {filterMovie.movie_year}
                </Typography>
                <Typography className={"text-white my-1"}>
                  <span className={"text-[#a5bbdc] font-bold"}>
                    Davomiyligi:{" "}
                  </span>{" "}
                  {filterMovie.duration}
                </Typography>
                <Typography className={"text-white my-1"}>
                  <span className={"text-[#a5bbdc] font-bold"}>Mamlakat: </span>{" "}
                  {filterMovie.country}
                </Typography>
                <Typography className={"text-white font-bold"}>
                  <span className={"text-[#a5bbdc] font-bold"}>Janr: </span>
                  {filterMovie.category?.map((item, index) => {
                    return (
                      <Button
                        key={index}
                        type={"link"}
                        onClick={() => navigate(`/filtr/${item.slug}`)}
                        className={"font-bold px-2"}
                      >
                        {item.name},
                      </Button>
                    );
                  })}
                </Typography>
              </div>
            </div>
            <div
              onClick={() =>
                infoFilm === "" ? setInfoFilm("active") : setInfoFilm("")
              }
              className={"overflow-hidden cursor-pointer mt-5 readmore"}
              style={{
                height: infoFilm === "active" ? "auto" : 55,
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
              <Typography className={"text-white mt-2"}>
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
                    color: "#fff",
                    border: "1px solid grey",
                  }}
                />
              </Form.Item>
            </label>
            <div className={"flex justify-end"}>
              <Button htmlType={"submit"} className={"bg-[#272727] text-white"}>
                Yuborish
              </Button>
            </div>
          </Form>
          <div>
            <Typography className={"text-white text-center my-2"}>
              Izohlar
            </Typography>
            <div style={{ maxHeight: 678, overflowY: "scroll" }}>
              {filterMovie.reviews?.map((item, index) => {
                return (
                  <div key={index} className={"p-1"}>
                    <Card
                      className={"p-1 bg-[#333333] border-0"}
                      title={
                        <span className={"flex items-center gap-1 text-white"}>
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
