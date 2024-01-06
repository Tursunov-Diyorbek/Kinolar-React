import React, { useContext, useEffect, useState } from "react";
import { Button, Drawer, Form, Input } from "antd";
import { ContextSearch } from "../../Contex/context";
import { useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { AiOutlineMenuFold } from "react-icons/ai";
import axios from "axios";

export const Menu = () => {
  const { searchMovies, setSearchMovies, userData, setUserData } =
    useContext(ContextSearch);
  const [categorys, setCategorys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://last-movies-beckend.onrender.com/category")
      .then((res) => setCategorys(res?.data))
      .catch((err) => console.log(err));
  }, []);

  const onSearch = (values) => {
    setSearchMovies(values.search);
    navigate("/qidiruv");
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <div className={"py-8 px-5 flex justify-between items-center"}>
        <Form onFinish={onSearch}>
          <Form.Item name="search" className={"m-0"}>
            <Input
              placeholder={"Qidirish... (lar ishlatmang)"}
              size={"large"}
              className={"bg-[#131A20] border-0 text-white ant-input-login"}
            />
          </Form.Item>
        </Form>
        <Button onClick={showDrawer} className={"text-white"}>
          <AiOutlineMenuFold />
        </Button>
      </div>
      <Drawer
        title="Bo'limlar"
        placement="right"
        onClose={onClose}
        open={open}
        width={300}
        style={{ background: "rgb(39, 39, 39)", color: "#fff" }}
      >
        <div className={"flex flex-col h-[100%] justify-between"}>
          <div>
            {categorys.map((item, index) => (
              <div
                key={index}
                className={"p-2 px-5 cursor-pointer categor rounded-2xl"}
                onClick={() => navigate(`/filter/${item.slug}`)}
              >
                <span>{item.name}</span>
              </div>
            ))}
          </div>
          {/* <div>
            <Button
              onClick={() => {
                window.location.href = "/";
                localStorage.removeItem("tokens");
                localStorage.removeItem("user");
              }}
              className={"flex items-center gap-2 w-[100%] justify-center"}
              danger
            >
              <ImExit style={{ color: "red" }} /> Chiqish
            </Button>
          </div> */}
        </div>
      </Drawer>
    </>
  );
};
