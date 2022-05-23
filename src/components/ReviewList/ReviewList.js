import "./Review.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReviewList = ({ gameId, userId }) => {
  const [ReviewListData, setReviewListData] = useState([]);
  const [isLoadingReviewList, setIsLoadingReviewList] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://my-gamepad-backend-projet.herokuapp.com/reviewlist/${gameId}`
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
    <div className="loading">🤖 in a few seconds... 🤩</div>
  ) : ReviewListData.length === 0 ? (
    <h2 className="review-title">No reviews for this game !</h2>
  ) : (
    <div>
      <h2 className="titleReviews">Reviews</h2>
      {ReviewListData.map((review) => {
        return (
          <div key={review._id} className="reviewCard">
            <p className="reviewTitle">{review.title}</p>
            <p className="reviewContent">{review.content}</p>
            <div className="userInfo">
              <div></div>
              {review.user.account.picture.secure_url ? (
                <img
                  src={review.user.account.picture.secure_url}
                  alt=""
                  className="userPicture"
                />
              ) : (
                <FontAwesomeIcon icon="faUserSecret" />
              )}

              <p className="reviewUser">{review.user.account.username}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;
