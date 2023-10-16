import { Button, Form, Input, Typography, message, Space } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const UserRegistr = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Kechirasiz bu Username alaqachon ro'yxatdan o'tilgan ⚠️!",
    });
  };

  const postReg = () => {
    toast.success("Tabriklayman siz ro'yxatdan o'tdingiz 🥳", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const onFinish = async (values) => {
    try {
      await axios.post(
        `https://kinolaruz.pythonanywhere.com/users/register/`,
        values,
      );
      postReg();
      navigate("/auth/kirish");
    } catch (e) {
      warning();
    }
  };

  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  return (
    <>
      {contextHolder}
      <div
        className={"flex justify-center items-center h-[100vh]"}
        style={{
          backgroundImage: `url(${require("../img/197754827-flat-lay-composition-with-clapperboard-and-cinema-tickets-on-orange-background-space-for-text.jpg")})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className={"bg-[#272727] p-5 rounded-2xl"}>
          <Typography className={"text-white font-bold"}>
            Ro'yxatdan o'tish...
          </Typography>
          <Form onFinish={onFinish} className={"w-[300px]"}>
            <label>
              <Typography className={"text-white mt-5"}>*Username</Typography>
              <Form.Item
                className={"m-0"}
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Foydalanuvchi nomini kiriting!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </label>
            <label>
              <Typography className={"text-white mt-5"}>*Password</Typography>
              <Form.Item
                className={"m-0"}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Parolingizni kiriting!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </label>
            <div className={"flex justify-end mt-5"}>
              <Space wrap>
                <Button
                  htmlType={"submit"}
                  type={"primary"}
                  className={"bg-blue-700"}
                  loading={loadings[0]}
                  onClick={() => enterLoading(0)}
                >
                  Yuborish
                </Button>
              </Space>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
