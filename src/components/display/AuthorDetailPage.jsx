import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const AuthorDetailPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState([]);
  const [isShowingDelete, setIsShowingDelete] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  async function deleteAuthor() {
    await axios
      .delete(`http://localhost:8080/catalog/authors/${id}/delete`)
      .then((response) => {
        navigate(`/catalog/authors`);
      })
      .catch((error) => {
        toast.error("To delete author, first delete it's books");
        console.error(error.response.data);
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/catalog/authors/${id}`)
      .then((response) => {
        setAuthor(response.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="pl-2">Loading...</div>
      ) : (
        <>
          <div className="pl-2">
            <h1 className="text-4xl mb-2">
              {author.lastName}, {author.firstName}
            </h1>
            <p>
              {`Birth: ${author.birthDate}`}
              {author.deathDate ? ` Death: ${author.deathDate}` : ""}
            </p>
            <h4 className="ml-5 mt-4 pb-3 text-2xl border-b">Books</h4>
            {author.books.length ? (
              <>
                {author.books.map((book) => {
                  return (
                    <div key={book.id} className="ml-5">
                      <p className="pt-5">
                        <Link
                          to={`/catalog/books/${book.id}`}
                          className="font-semibold text-xl text-blue-500"
                        >
                          {book.title}
                        </Link>
                      </p>
                      <p className="text-lg max-w-5xl">{book.summary}</p>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="text-red-500 font-semibold ml-5 mt-2">
                This author has no books in this library.
              </div>
            )}
            <div className="ml-5 mt-4 h-px bg-slate-200" />
            {!isShowingDelete ? (
              <button
                onClick={() => setIsShowingDelete(true)}
                className="ml-5 mt-4 bg-blue-500 transition-colors hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Delete author
              </button>
            ) : (
              <div>
                <button
                  onClick={() => setIsShowingDelete(false)}
                  className="ml-5 mt-4 bg-none transition-colors hover:text-blue-800 hover:bg-blue-50 text-blue-600 py-2 px-4 rounded border border-blue-600"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteAuthor}
                  className="ml-5 mt-4 bg-blue-500 transition-colors hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Confirm delete
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default AuthorDetailPage;
