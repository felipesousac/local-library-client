import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

const BookInstanceList = () => {
  const [bookInstances, setBookInstances] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/catalog/bookinstances")
      .then((response) => {
        setBookInstances(response.data);
      });
  }, []);

  return (
    <div className="pl-2">
      <h1 className="text-4xl mb-2">Book Instance List</h1>
      {bookInstances.length ? (
        <ul className="list-disc ml-8">
          {bookInstances.map((bookinstance) => {
            return (
              <li key={bookinstance[0].id} className="hover:text-neutral-600">
                <Link to={`/catalog/bookinstances/${bookinstance[0].id}`}>
                  <span className="font-semibold">{bookinstance[1].title}</span>{" "}
                  : {bookinstance[0].imprint} -{" "}
                  {handleStatus(bookinstance[0].status)}
                  {bookinstance[0].dueback
                    ? ` (Due: ${bookinstance[0].dueback})`
                    : ""}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-red-500 font-semibold">
          No bookinstance copies found in this library
        </div>
      )}
    </div>
  );
};

export default BookInstanceList;
