import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

export const AdminPassword = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    if (values.username === "Diko" && values.password === "2526")
      return navigate("/kinoadminpanel/kirildi");
  };

  return (
    <div className={"flex items-center justify-center h-[97vh]"}>
      <div className={"bg-[#38434B] p-5 rounded-2xl w-[300px]"}>
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Iltimos ismingizni kiriting!",
              },
            ]}
          >
            <Input
              size="large"
              placeholder={"Diko"}
              style={{
                outline: "none",
                backgroundColor: "#222E37",
                color: "#fff",
                border: 0,
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Iltimos parolingizni kiriting!",
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="2526"
              style={{
                outline: "none",
                backgroundColor: "#222E37",
                color: "#fff",
                border: 0,
              }}
            />
          </Form.Item>
          <div className={"flex justify-end"}>
            <Button htmlType="submit" className={"bg-[#222E37] text-white"}>
              Kirish
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
