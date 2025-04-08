import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = (asin) => {
  // state = {
  //   comments: [],
  //   isLoading: true,
  //   isError: false,
  // };

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      if (!asin) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/" + asin,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMmI3NzM4MzRiZjAwMTUwMDA3MDMiLCJpYXQiOjE3NDQxMTYyNTEsImV4cCI6MTc0NTMyNTg1MX0.bzgcEjtI3T1gzBZDDx9vobe0lknJ4c0362bq0nms3Z8",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setComments(data);
          setIsError(false);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [asin]);

  return (
    <div className='text-center'>
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
