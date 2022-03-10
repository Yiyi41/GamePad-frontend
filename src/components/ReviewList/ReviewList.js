import "./Review.css";
import axios from "axios";
import { useEffect, useState } from "react";

const ReviewList = ({ gameId }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();
  //   console.log(gameId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/reviewlist/${gameId}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [gameId]);

  return isLoading ? (
    <div>is loading</div>
  ) : (
    <div style={{ color: "white" }}>
      {data.map((review, index) => {
        return (
          <div key={index} className="reviewCard">
            <p className="reviewTitle">{review.title}</p>
            <p className="reviewContent">{review.content}</p>
            <div></div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;
