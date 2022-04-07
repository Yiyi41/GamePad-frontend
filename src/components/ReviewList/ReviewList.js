import "./Review.css";
import axios from "axios";
import { useEffect, useState } from "react";

const ReviewList = ({ gameId, userId }) => {
  const [ReviewListData, setReviewListData] = useState([]);
  const [isLoadingReviewList, setIsLoadingReviewList] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/reviewlist/${gameId}`
        );

        setReviewListData(response.data);
        setIsLoadingReviewList(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [gameId]);

  return isLoadingReviewList ? (
    <div>is loading</div>
  ) : ReviewListData.length === 0 ? (
    <h2 className="review-title">No reviews for this game !</h2>
  ) : (
    <div>
      <h2 className="titleReviews">Reviews</h2>
      {ReviewListData.map((review) => {
        return (
          <div key={review.id} className="reviewCard">
            <p className="reviewTitle">{review.title}</p>
            <p className="reviewContent">{review.content}</p>
            <p className="reviewUser">{review.user.account.username}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;
