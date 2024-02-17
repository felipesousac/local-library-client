import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function BookInstanceForm() {
  const [bookid, setBookid] = useState("");
  const [books, setBooks] = useState([]);
  const [imprint, setImprint] = useState("");
  const [dueback, setDueback] = useState("");
  const [status, setStatus] = useState("");

  const statusArr = ["Available", "Maintenance", "Loaned", "Reserved"];

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  async function createBookInstance() {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(
        "http://localhost:8080/catalog/bookinstances",
        {
          bookid,
          imprint,
          status,
          dueback,
        },
        headers
      )
      .then((response) => {
        navigate(`/catalog/bookinstances/${response.data.id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/catalog/books/list")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="pl-2">
        <h1 className="text-4xl mb-4">Create BookInstance</h1>
        <form
          onSubmit={handleSubmit(createBookInstance)}
          className="flex flex-col gap-3 max-w-52"
        >
          <select
            name="bookid"
            className="border-2 border-gray-400 rounded p-2 focus:border-2 focus:border-blue-600 focus:outline-none"
            required
            onChange={(e) => setBookid(e.target.value)}
          >
            <option disabled selected>
              --Choose a book--
            </option>
            {books.map((book) => {
              return (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              );
            })}
          </select>

          <input
            className="border-2 border-gray-400 rounded p-2 focus:border-2 focus:border-blue-600 focus:outline-none "
            type="text"
            value={imprint}
            placeholder="Imprint"
            {...register("imprint", {
              onChange: (e) => {
                setImprint(e.target.value);
              },
              required: { value: true, message: "Imprint is required" },
              maxLength: {
                value: 100,
                message: "Imprint must be less than 100 characters",
              },
            })}
          />

          <input
            className="border-2 border-gray-400 rounded p-2 focus:border-2 focus:border-blue-600 focus:outline-none "
            type="text"
            value={dueback}
            placeholder="Date when book available"
            {...register("dueback", {
              onChange: (e) => {
                setDueback(e.target.value);
              },
              maxLength: {
                value: 8,
                message: "Dueback must be less than 8 characters",
              },
            })}
          />

          <select
            name="status"
            className="border-2 border-gray-400 rounded p-2 focus:border-2 focus:border-blue-600 focus:outline-none"
            required
            onChange={(e) => setStatus(e.target.value)}
          >
            <option disabled selected>
              --Choose a status--
            </option>
            {statusArr.map((status) => {
              return (
                <option key={status} value={status.toUpperCase()}>
                  {status}
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
          {errors.imprint && (
            <p className="text-red-500">* {errors.imprint.message}</p>
          )}
          {errors.dueback && (
            <p className="text-red-500">* {errors.dueback.message}</p>
          )}
        </form>
      </div>
    </>
  );
}
