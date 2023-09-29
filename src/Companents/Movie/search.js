import { FcLeft } from "react-icons/fc";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Pagination, Col, Row, Typography } from "antd";
import { Container } from "../../Container/container";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
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
  const api = useContext(ContextApi);
  const navigate = useNavigate();

  // const { data, isLoading, isError, error } = useQuery("kinolar", () =>
  //   api.get("/kinolar"),
  // );
  //
  // const tarjimaKinolar = useMemo(() => data?.data || [], [data?.data]);

  useEffect(() => {
    axios
      .get(
        `https://kinolaruz.pythonanywhere.com/search/?search=${searchMovies}`,
      )
      .then((res) => setSearchFilms(res.data.results))
      .catch((err) => console.log(err));
  }, [searchMovies]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentFilms = searchFilms.slice(indexOfFirstPost, indexOfLastPost);

  // if (isLoading)
  //   return (
  //     <div className={"flex justify-center items-center h-[100vh]"}>
  //       <div className={"text-blue-600 font-bold text-3xl"}>Kuting...</div>
  //     </div>
  //   );
  // if (isError)
  //   return (
  //     <div className={"flex justify-center items-center h-[100vh]"}>
  //       <div className={"text-red-700 font-bold text-3xl"}>
  //         Xatolik yuz berdi {error.message}
  //       </div>
  //     </div>
  //   );

  return (
    <>
      <Menu />
      <Container className={"my-10"}>
        <div className={"mb-5 font-bold text-[#666]"}>
          Qidiruv > {searchMovies}
        </div>
        <Row>
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
            // className={"my-10 text-white"}
            // style={{ color: "red" }}
          />
        </div>
      </Container>
    </>
  );
};
