import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const handleStatus = (status) => {
  switch (status) {
    case "AVAILABLE":
      return <span className="text-green-500 mb-2">{status}</span>;
    case "MAINTENANCE":
      return <span className="text-red-500 mb-2">{status}</span>;
    case "LOANED":
      return <span className="text-yellow-500 mb-2">{status}</span>;
    case "RESERVED":
      return <span className="text-blue-500 mb-2">{status}</span>;
  }
};

const BookDetailPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/catalog/books/${id}`).then((response) => {
      setBook(response.data.body);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="pl-2">Loading...</div>
      ) : (
        <>
          <div className="pl-2">
            <h1 className="text-4xl mb-2">Title: {book.title}</h1>
            <div className="flex mb-2">
              <p className="mr-2">
                <span className="font-semibold">Author: </span>
                <Link to={`/catalog/authors/${book.authorId}`}>
                  <span className="text-blue-700 underline hover:text-blue-500">{`${book.authorLastName}, ${book.authorFirstName}`}</span>
                </Link>
              </p>
            </div>
            <div className="flex mb-2">
              <p className="mr-2 max-w-5xl">
                <span className="font-semibold">Summary:</span> {book.summary}
              </p>
            </div>
            <div className="flex mb-2">
              <p className="mr-2">
                <span className="font-semibold">ISBN:</span> {book.isbn}
              </p>
            </div>
            <div className="flex mb-2">
              <p className=" mr-2">
                <span className="font-semibold">Genre:</span> {book.genreName}
              </p>
            </div>
            <h4 className="ml-5 mt-4 pb-3 text-xl border-b">Copies</h4>
            {book.bookInstances.length ? (
              <>
                {book.bookInstances.map((bookinstance) => {
                  return (
                    <div key={bookinstance.id}>
                      <div className="ml-5 mt-4">
                        <p>{handleStatus(bookinstance.status)}</p>
                        <span className="font-semibold">Imprint: </span>
                        {bookinstance.imprint}
                      </div>
                      {bookinstance.dueback && (
                        <div className="ml-5">
                          <span className="font-semibold">Due Back: </span>
                          {bookinstance.dueback}
                        </div>
                      )}
                      <div className="ml-5 pb-2 border-b">
                        <span className="font-semibold">Id: </span>
                        {bookinstance.id}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="text-red-500 font-semibold">
                No copies of this book found in this library.
              </div>
            )}
          </div>
        </>
      )}
      <button
        onClick={() => navigate(`/catalog/books/${id}/update`)}
        className="ml-5 mt-4 bg-blue-500 transition-colors hover:bg-blue-600 text-white py-2 px-4 rounded max-w-max"
      >
        Update Book
      </button>
    </div>
  );
};

export default BookDetailPage;
