import { Button, Form, Input, Typography, message } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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
      navigate("/kirish");
    } catch (e) {
      warning();
    }
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
              <Button
                htmlType={"submit"}
                type={"primary"}
                className={"bg-blue-700"}
                // loading
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
