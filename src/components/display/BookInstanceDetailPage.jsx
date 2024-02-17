import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const capitalizeFirstLetter = (string) => {
  const lower = string.toLowerCase();
  return string.charAt(0).toUpperCase() + lower.slice(1);
};

const handleStatus = (status) => {
  switch (status) {
    case "AVAILABLE":
      return (
        <span className="text-green-500">{capitalizeFirstLetter(status)}</span>
      );
    case "MAINTENANCE":
      return (
        <span className="text-red-500">{capitalizeFirstLetter(status)}</span>
      );
    case "LOANED":
      return (
        <span className="text-yellow-500">{capitalizeFirstLetter(status)}</span>
      );
    case "RESERVED":
      return (
        <span className="text-blue-500">{capitalizeFirstLetter(status)}</span>
      );
  }
};

const BookInstanceDetailPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookInstance, setBookInstance] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/catalog/bookinstances/${id}`)
      .then((response) => {
        setBookInstance(response.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="pl-2 flex flex-col gap-3">
            <h1 className="text-4xl">ID: {bookInstance.id}</h1>
            <p>
              <span className="font-semibold">Title: </span>
              <Link
                to={`/catalog/books/${bookInstance.bookId}`}
                className="text-blue-500"
              >
                {bookInstance.bookTitle}
              </Link>
            </p>
            <p>
              <span className="font-semibold">Imprint: </span>
              {bookInstance.imprint}
            </p>
            <p>
              <span className="font-semibold">Status: </span>
              {handleStatus(bookInstance.status)}
            </p>
            {bookInstance.dueBack ? (
              <p>
                <span className="font-semibold">Due back: </span>
                {bookInstance.dueBack}
              </p>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </>
  );
};

export default BookInstanceDetailPage;
