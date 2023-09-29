import { Button, Form, Input, Typography } from "antd";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const UserLogin = () => {
  const [userToken, setUserToken] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  console.log(userToken);

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
      setUserToken(data.tokens.access);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ToastContainer />
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
