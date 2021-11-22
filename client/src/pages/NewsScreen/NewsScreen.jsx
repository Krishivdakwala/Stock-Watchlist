import React, { useEffect, useState } from "react";
import axiosApi from "../../api/axiosApi";
import { Button, Carousel } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";

const NewsScreen = () => {
  const [news, setNews] = useState([]);

  const getNews = async (req, res) => {
    try {
      const newsData = await axiosApi.get("/news");
      console.log(newsData.data);
      setNews(() => newsData.data.articles);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  var newsCar = <h2>Loading Your Top News</h2>;

  if (news) {
    newsCar = (
      <Carousel interval={3000} controls={true}>
        {news?.map((item, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={item.urlToImage}
              alt="Img Here"
            />

            <Carousel.Caption>
              <div style={{ backgroundColor: "rgba(52, 52, 52, 0.5)" }}>
                <h2>{item.title}</h2>
                <h4>{item.description}</h4>
                <br />
                <h6>Source : {item.source.name}</h6>
                <h6>
                  Author : {item.author == null ? "Unknown" : item.author}
                </h6>
                <h6>
                  Published At : {new Date(item.publishedAt).toLocaleString()}
                </h6>
              </div>

              <Button
                onClick={() => window.open(`${item.url}`, "_blank")}
                variant="primary"
              >
                Read Full Article
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }

  return <MainScreen title="Top News">{newsCar}</MainScreen>;
};

export default NewsScreen;
