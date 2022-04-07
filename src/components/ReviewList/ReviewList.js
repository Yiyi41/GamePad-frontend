import "./Review.css";
import axios from "axios";
import { useEffect, useState } from "react";

const ReviewList = ({ gameId }) => {
  const [Reviewdata, setReviewData] = useState([]);
  const [isLoadingReviewList, setIsLoadingReviewList] = useState();
  //   console.log(gameId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingReviewList(true);
        const response = await axios.get(
          `http://localhost:3000/reviewlist/${gameId}`
        );
        console.log("review list: ", response.data);
        setReviewData(response.data);
        setIsLoadingReviewList(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [gameId]);

  return isLoadingReviewList ? (
    <div>is loading</div>
  ) : Reviewdata.length === 0 ? (
    <h2 className="review-title" style={{ fontWeight: "normal" }}>
      No reviews for this game !
    </h2>
  ) : (
    <div style={{ color: "white" }}>
      {Reviewdata.map((review, index) => {
        return (
          <div key={index} className="reviewCard">
            <p className="reviewUser">{review.user}</p>
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
