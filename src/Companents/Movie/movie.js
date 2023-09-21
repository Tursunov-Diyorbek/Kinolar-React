import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ContextApi } from "../../Api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  Button,
  Col,
  Row,
  Typography,
  Form,
  Input,
  Alert,
  message,
} from "antd";
import {
  BsHeart,
  BsHeartbreak,
  BsHeartFill,
  BsHeartbreakFill,
  BsDownload,
} from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

export const Movie = () => {
  const { id } = useParams();
  const api = useContext(ContextApi);
  const [count, setCount] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery(["kinolar", id], () =>
    api.get(`/kinolar/${id}`),
  );
  const kino = useMemo(() => data?.data || { messages: [] }, [data?.data]);

  const {
    mutate: putFilm,
    isLoading: isLoadingPut,
    isError: isErrorPut,
  } = useMutation(
    (newMessage) => {
      return api.put(`/kinolar/${id}`, newMessage);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["kinolar", id]);
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

  const saveMessages = (values) => {
    putFilm({
      ...kino,
      messages: [
        { ...values, time: dayjs(new Date()).format("YYYY-MM-DD HH-mm") },
        ...kino?.messages,
      ],
    });
    success();
  };

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
            src={kino.movie}
            style={{ width: "100%", maxHeight: 550, borderRadius: 5 }}
            controls
            poster={kino.poster}
          ></video>
          <div className={"flex justify-between items-center"}>
            <a href={kino.movie} download>
              <Button
                className={
                  "bg-[#38434B] rounded-3xl my-3 flex text-white gap-1"
                }
              >
                <BsDownload style={{ fontSize: 20 }} />{" "}
                <span>Yuklab olish</span>
              </Button>
            </a>
            <div className={"flex items-center gap-3"}>
              {count === true ? (
                <BsHeartFill style={{ fontSize: 20, color: "red" }} />
              ) : (
                <BsHeart
                  style={{ fontSize: 20, cursor: "pointer" }}
                  onClick={() => setCount(true)}
                />
              )}
              <span className={"font-bold text-2xl"}>{kino.likes}</span>
              {count === false ? (
                <BsHeartbreakFill style={{ fontSize: 20, color: "red" }} />
              ) : (
                <BsHeartbreak
                  style={{ fontSize: 20, cursor: "pointer" }}
                  onClick={() => setCount(false)}
                />
              )}
            </div>
          </div>
          <div className={"bg-[#38434B] p-2 mb-4"} style={{ borderRadius: 5 }}>
            <div className={"flex"}>
              <div className={"w-[200px] h-[100%]"}>
                <img src={kino.img} alt="rasm" style={{ borderRadius: 5 }} />
              </div>
              <div className={"ms-3"}>
                <Typography className={"text-white font-bold"}>
                  Kino nomi: {kino.name}
                </Typography>
                <Typography className={"text-white font-bold my-1"}>
                  Joylandi: {kino.placed}
                </Typography>
                <Typography className={"text-white font-bold my-1"}>
                  Yil: {kino.movieyear}
                </Typography>
                <Typography className={"text-white font-bold my-1"}>
                  Davomiyligi: {kino.duration}
                </Typography>
                <Typography className={"text-white font-bold my-1"}>
                  Mamlakat: {kino.country}
                </Typography>
                <Typography className={"text-white font-bold"}>
                  Janr: {kino.genre}
                </Typography>
              </div>
            </div>
            <details className={"my-2"}>
              <summary className={"font-bold cursor-pointer"}>
                Kino tavsifi
              </summary>
              <Typography className={"text-white"}>
                {kino.description}
              </Typography>
            </details>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          md={{ span: 8 }}
          xl={{ span: 8 }}
          className={"bg-[#38434B] p-2 my-3"}
          style={{ borderRadius: 5 }}
        >
          <Form onFinish={saveMessages} className={"w-[100%]"}>
            <label>
              <Typography className={"text-white"}>
                Ismingizni kiriting 📝
              </Typography>
              <Form.Item className={"m-0"} name={"name"}>
                <Input
                  style={{
                    background: "none",
                    color: "#fff",
                    border: "1px solid grey",
                  }}
                />
              </Form.Item>
            </label>
            <label>
              <Typography className={"text-white mt-2"}>
                Izohingizni qoldiring 📝
              </Typography>
              <Form.Item name={"message"}>
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
              <Button
                type="primary"
                htmlType={"submit"}
                className={"bg-blue-600"}
              >
                Yuborish
              </Button>
            </div>
          </Form>
          <div>
            <Typography className={"text-white text-center my-2"}>
              Izohlar
            </Typography>
            <div style={{ maxHeight: 678, overflowY: "scroll" }}>
              {kino?.messages.map((item, index) => {
                return (
                  <div key={index} className={"p-1"}>
                    <Alert
                      message={
                        <span className="font-bold flex items-center gap-1 text-white">
                          <CiUser /> {item.name}
                        </span>
                      }
                      description={
                        <span className={"ps-5 text-gray-400"}>
                          {item.message}
                        </span>
                      }
                      type="info"
                      className={"p-1 bg-[#222E37] border-0 text-white"}
                    />
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
