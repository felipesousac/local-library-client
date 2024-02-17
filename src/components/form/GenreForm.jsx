import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const GenreForm = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const createGenre = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post("http://localhost:8080/catalog/genres", { name }, headers)
      .then((response) => {
        navigate(`/catalog/genres/${response.data.id}`);
      })
      .catch((error) => {
        navigate(`/catalog/genres/${error.response.data.genreId}`);
      });
  };

  // LOGIC TO REMOVE ITEM FROM LIST - USEFULL
  /*const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };*/

  return (
    <>
      <div className="pl-2">
        <h1 className="text-4xl mb-4">Create Genre</h1>
        <form
          className="flex flex-col gap-3 max-w-52"
          onSubmit={handleSubmit(createGenre)}
        >
          <input
            className="border-2 border-gray-400 rounded p-2 focus:border-2 focus:border-blue-600 focus:outline-none "
            type="text"
            value={name}
            placeholder="Enter genre name"
            {...register("name", {
              onChange: (e) => {
                setName(e.target.value);
              },
              pattern: {
                value: /^([^0-9]*)$/,
                message: "Name must be only letters",
              },
              required: { value: true, message: "Name is required" },
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
              maxLength: {
                value: 250,
                message: "Name must be less than 250 characters",
              },
            })}
          />
          <button
            type="submit"
            className="bg-blue-500 transition-colors hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Create
          </button>
          {errors.name && (
            <p className="text-red-500">* {errors.name.message}</p>
          )}
        </form>
      </div>
    </>
  );
};

export default GenreForm;
