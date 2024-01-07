import React, { useContext, useEffect, useState } from "react";
import { Pagination, Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ContextApi } from "../../Api";
import { Fade } from "react-awesome-reveal";
import axios from "axios";
import { ContextSearch } from "../../Contex/context";
import { Menu } from "../Menu/menu";

export const SearchMovies = () => {
  const { searchMovies, setSearchMovies } = useContext(ContextSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(16);
  const [searchFilms, setSearchFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = useContext(ContextApi);
  const navigate = useNavigate();

  const searchFilm = searchFilms.filter((item) => {
    const searchLowerCase = searchMovies.toLowerCase();
    const yearString = String(item.year).toLowerCase();

    return (
      item.name.toLowerCase().includes(searchLowerCase) ||
      item.country.toLowerCase().includes(searchLowerCase) ||
      yearString.includes(searchLowerCase) ||
      item.category.filter((item2) =>
        item2.name.toLowerCase().includes(searchLowerCase),
      ).length > 0
    );
  });

  useEffect(() => {
    axios
      .get("https://last-movies-beckend.onrender.com/kinolar")
      .then((res) => {
        setSearchFilms(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [searchMovies]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentFilms = searchFilm.slice(indexOfFirstPost, indexOfLastPost);

  if (loading) {
    return (
      <div className={"flex justify-center items-center h-[100vh]"}>
        <div className="three-body">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Menu />
      <div className={"mb-5 ps-5 font-bold text-[#666]"}>
        Qidiruv > {searchMovies}
      </div>
      <Row className={"px-5"}>
        {currentFilms.map((item, index) => {
          return (
            <Col
              xs={{ span: 8 }}
              md={{ span: 4 }}
              xl={{ span: 3 }}
              key={index}
              className={"p-1"}
            >
              <div
                className={"movieHover cursor-pointer"}
                onClick={() => navigate(`/${item.slug}`)}
              >
                <img
                  src={item.img_url}
                  alt="rasm"
                  style={{ borderRadius: 5, height: 253, objectFit: "cover" }}
                />
                <Fade duration={3000}>
                  <Typography
                    className={"my-2 text-[#a5bbdc]"}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography className={"text-blue-600 font-bold"}>
                    {item.movie_year}
                  </Typography>
                </Fade>
              </div>
            </Col>
          );
        })}
      </Row>
      <div className={"flex justify-end"}>
        <Pagination
          current={currentPage}
          total={searchFilms.length}
          pageSize={postsPerPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};
