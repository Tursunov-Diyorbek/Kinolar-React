import { Button, Form, Input, message, Typography } from "antd";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const UserLogin = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const error = () => {
    messageApi.open({
      type: "warning",
      content: "Kirishga ruxsat yo'q malumotlarni to'g'ri kiriting ⚠️!",
    });
  };

  const open = () => {
    toast.success("Sizga maroqli xordiq tilaymiz 🍿🎬", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(
        `https://kinolaruz.pythonanywhere.com/users/login/`,
        values,
      );
      signIn({
        token: data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { username: values.username },
      });
      localStorage.setItem("tokens", data.tokens.access);
      localStorage.setItem("user", JSON.stringify(data.user));
      open();
      navigate("/");
    } catch (e) {
      error();
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
    }, 4000);
  };

  return (
    <>
      <ToastContainer />
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
          <Typography className={"text-white font-bold"}>Kirish...</Typography>
          <span style={{ fontSize: 10, color: "#a5bbdc" }}>
            Username va password kiriting
          </span>
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
            <div className={"flex items-center justify-between mt-5"}>
              <Button type="link" onClick={() => navigate("/royxatdan-otish")}>
                Register
              </Button>
              <Button
                htmlType={"submit"}
                type={"primary"}
                className={"bg-blue-700"}
                loading={loadings[0]}
                onClick={() => enterLoading(0)}
              >
                Yuborish
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
