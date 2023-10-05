import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Typography } from "antd";
import { ContextSearch } from "../../Contex/context";
import { useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";
import axios from "axios";

export const Menu = () => {
  const { searchMovies, setSearchMovies, userData, setUserData } =
    useContext(ContextSearch);
  const [categorys, setCategorys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://kinolaruz.pythonanywhere.com/category/")
      .then((res) => setCategorys(res?.data))
      .catch((err) => console.log(err));
  }, []);

  const onSearch = (values) => {
    setSearchMovies(values.search);
    navigate("/qidiruv");
  };

  return (
    <>
      <div className={"py-8 px-5 flex justify-between items-center"}>
        <Form onFinish={onSearch}>
          <Form.Item name="search" className={"m-0"}>
            <Input
              placeholder={"Qidirish..."}
              size={"large"}
              className={"bg-[#131A20] border-0 text-white ant-input-login"}
            />
          </Form.Item>
        </Form>
        <Button
          onClick={() => {
            navigate("/royxatdan-otish");
            localStorage.removeItem("tokens");
            localStorage.removeItem("user");
          }}
          className={"flex items-center text-white gap-2"}
        >
          <ImExit style={{ color: "#fff" }} /> Chiqish
        </Button>
      </div>
      <div className={"mb-10 flex flex-wrap gap-4 px-5"}>
        {categorys.map((item, index) => (
          <Button
            key={index}
            className={"text-white"}
            onClick={() => navigate(`/filtr/${item.slug}`)}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </>
  );
};
