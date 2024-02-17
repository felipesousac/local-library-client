import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBookForm = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [isbn, setIsbn] = useState("");
  const [authorid, setAuthorid] = useState("");
  const [genreid, setGenreid] = useState("");

  // Select input states
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  useEffect(() => {
    axios.get("http://localhost:8080/catalog/genres").then((response) => {
      setGenres(response.data.content);
    });
    axios.get("http://localhost:8080/catalog/authors").then((response) => {
      setAuthors(response.data.content);
    });
    axios
      .get(`http://localhost:8080/catalog/books/detail/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setSummary(response.data.summary);
        setIsbn(response.data.isbn);
        setGenreid(response.data.genreid);
        setAuthorid(response.data.authorid);
      });
  }, []);

  async function createBook() {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .put(
        `http://localhost:8080/catalog/books/${id}/update`,
        {
          title,
          summary,
          isbn,
          authorid,
          genreid,
        },
        headers
      )
      .then((response) => {
        navigate(`/catalog/books/${response.data.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="pl-2">
        <h1 className="text-4xl mb-4">Update Book</h1>
        <form
          onSubmit={handleSubmit(createBook)}
          className="flex flex-col gap-3 max-w-52"
        >
          <input
            className="border-2 border-gray-400 rounded p-2 focus:border-2 focus:border-blue-600 focus:outline-none "
            type="text"
            value={title}
            placeholder="Title"
            {...register("title", {
              onChange: (e) => {
                setTitle(e.target.value);
              },
              required: { value: true, message: "Title is required" },
              maxLength: {
                value: 100,
                message: "Title must be less than 100 characters",
              },
            })}
          />

          <select
            name="authorid"
            className="border-2 border-gray-400 rounded p-2 focus:border-2 focus:border-blue-600 focus:outline-none"
            required
            onChange={(e) => setAuthorid(e.target.value)}
          >
            <option disabled selected>
              --Choose an author--
            </option>
            {authors.map((author) => {
              return (
                <option key={author.id} value={author.id}>
                  {author.lastname}, {author.firstname}
                </option>
              );
            })}
          </select>

          <input
            className="border-2 border-gray-400 rounded p-2 focus:border-2 focus:border-blue-600 focus:outline-none "
            type="text"
            value={summary}
            placeholder="Summary"
            {...register("summary", {
              onChange: (e) => {
                setSummary(e.target.value);
              },
              maxLength: {
                value: 500,
                message: "Summary must be less than 500 characters",
              },
            })}
          />

          <input
            className="border-2 border-gray-400 rounded p-2 focus:border-2 focus:border-blue-600 focus:outline-none"
            type="text"
            value={isbn}
            placeholder="ISBN"
            {...register("isbn", {
              onChange: (e) => {
                setIsbn(e.target.value);
              },
              maxLength: {
                value: 150,
                message: "Isbn must be less than 150 characters",
              },
            })}
          />
          <select
            name="genreid"
            className="border-2 border-gray-400 rounded p-2 focus:border-2 focus:border-blue-600 focus:outline-none"
            required
            onChange={(e) => setGenreid(e.target.value)}
          >
            <option disabled selected>
              --Choose a genre--
            </option>
            {genres.map((genre) => {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              );
            })}
          </select>
          <button
            type="submit"
            className="bg-blue-500 transition-colors hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Create
          </button>
          {errors.title && (
            <p className="text-red-500">* {errors.title.message}</p>
          )}
          {errors.summary && (
            <p className="text-red-500">* {errors.summary.message}</p>
          )}
          {errors.isbn && (
            <p className="text-red-500">* {errors.isbn.message}</p>
          )}
        </form>
      </div>
    </>
  );
};

export default UpdateBookForm;
