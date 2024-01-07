import React, { useContext, useEffect, useState } from "react";
import { Pagination, Col, Row, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ContextApi } from "../../Api";
import { Fade } from "react-awesome-reveal";
import axios from "axios";
import styles from "./index.module.sass";

export const FilterKinolar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(16);
  const [filmsFilter, setFilmsFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = useContext(ContextApi);
  const navigate = useNavigate();
  const { filterFilms } = useParams();

  useEffect(() => {
    axios
      .get("https://last-movies-beckend.onrender.com/kinolar")
      .then((res) => {
        setFilmsFilter(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const filterMovies = filmsFilter.filter((item) =>
    item.category.some((item2) => item2.slug.includes(filterFilms)),
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentFilms = filterMovies.slice(indexOfFirstPost, indexOfLastPost);

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
      <div className={"my-5 ps-5 font-bold text-[#666]"}>
        {filterFilms.toUpperCase()}
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
                  className={styles.filterHeight}
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
          total={filmsFilter.length}
          pageSize={postsPerPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};
