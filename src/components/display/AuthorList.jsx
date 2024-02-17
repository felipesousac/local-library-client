import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);

  const handleBirth = (birth) => {
    return birth ? ` - Birth: ${birth}` : "";
  };

  const handleDeath = (death) => {
    return death ? ` - Death: ${death}` : "";
  };

  useEffect(() => {
    axios.get("http://localhost:8080/catalog/authors").then((response) => {
      setAuthors(response.data.content);
    });
  }, []);

  return (
    <div className="pl-2">
      <h1 className="text-4xl mb-2">Author List</h1>
      {authors.length ? (
        <ul className="list-disc ml-8">
          {authors.map((author) => {
            return (
              <li key={author.id} className="hover:text-neutral-600">
                <Link to={`/catalog/authors/${author.id}`}>
                  <span className="font-semibold">
                    {author.lastname}, {author.firstname}
                  </span>
                  {handleBirth(author.birthdate)}
                  {handleDeath(author.deathdate)}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-red-500 font-semibold">
          No authors found in this library
        </div>
      )}
    </div>
  );
};

export default AuthorList;
