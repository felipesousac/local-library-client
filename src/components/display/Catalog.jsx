import { useEffect, useState } from "react";
import axios from "axios";

const Catalog = () => {
  const [counts, setCounts] = useState({
    author: "",
    book: "",
    bookInstance: "",
    bookInstanceAvailable: "",
    genre: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8080/catalog").then((response) => {
      setCounts({ ...response.data });
    });
  }, []);

  return (
    <div className="pl-2">
      <h1 className="text-4xl mb-2">Local Library Home</h1>
      <p className="mb-4">
        Welcome to <em>LocalLibrary</em>, a very basic Express website developed
        as a tutorial example on the Mozilla Developer Network.
      </p>
      <h1 className="text-4xl mb-2">Dynamic content</h1>
      <p>The library has the following record counts:</p>
      <ul className="list-disc ml-8">
        <li>
          <strong>Books: {counts.book}</strong>
        </li>
        <li>
          <strong>Copies: {counts.bookInstance}</strong>
        </li>
        <li>
          <strong>Copies available: {counts.bookInstanceAvailable}</strong>
        </li>
        <li>
          <strong>Authors: {counts.author}</strong>
        </li>
        <li>
          <strong>Genres: {counts.genre}</strong>
        </li>
      </ul>
    </div>
  );
};

export default Catalog;
