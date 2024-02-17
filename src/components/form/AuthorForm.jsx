import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AuthorForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [deathdate, setDeathdate] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const createAuthor = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(
        "http://localhost:8080/catalog/authors",
        { firstname, lastname, birthdate, deathdate },
        headers
      )
      .then((response) => {
        navigate(`/catalog/authors/${response.data.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="pl-2">
        <h1 className="text-4xl mb-4">Create Author</h1>
        <form
          onSubmit={handleSubmit(createAuthor)}
          className="flex flex-col gap-3 max-w-52"
        >
          <input
            className="border-2 border-gray-400 rounded p-2 focus:border-2 focus:border-blue-600 focus:outline-none "
            type="text"
            value={firstname}
            placeholder="Enter first name"
            {...register("firstname", {
              onChange: (e) => {
                setFirstname(e.target.value);
              },
              pattern: {
                value: /^([^0-9]*)$/,
                message: "Name must be only letters",
              },
              required: { value: true, message: "First name is required" },
              maxLength: {
                value: 100,
                message: "First name must be less than 100 characters",
              },
            })}
          />
          <input
            className="border-2 border-gray-400 rounded p-2 focus:border-2 focus:border-blue-600 focus:outline-none "
            type="text"
            value={lastname}
            placeholder="Enter last name"
            {...register("lastname", {
              onChange: (e) => {
                setLastname(e.target.value);
              },
              pattern: {
                value: /^([^0-9]*)$/,
                message: "Name must be only letters",
              },
              required: { value: true, message: "Last name is required" },
              maxLength: {
                value: 100,
                message: "Last name must be less than 100 characters",
              },
            })}
          />
          <input
            className="border-2 border-gray-400 rounded p-2 focus:border-2 focus:border-blue-600 focus:outline-none "
            type="date"
            value={birthdate}
            placeholder="YYYY-MM-DD"
            {...register("birthdate", {
              onChange: (e) => {
                setBirthdate(e.target.value);
              },
              required: { value: true, message: "Birth date is required" },
            })}
          />
          <input
            className="border-2 border-gray-400 rounded p-2 focus:border-2 focus:border-blue-600 focus:outline-none "
            type="date"
            value={deathdate}
            placeholder="YYYY-MM-DD"
            {...register("deathdate", {
              onChange: (e) => {
                setDeathdate(e.target.value);
              },
            })}
          />
          <button
            type="submit"
            className="bg-blue-500 transition-colors hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Create
          </button>
          {errors.firstname && (
            <p className="text-red-500">* {errors.firstname.message}</p>
          )}
          {errors.lastname && (
            <p className="text-red-500">* {errors.lastname.message}</p>
          )}
          {errors.birthdate && (
            <p className="text-red-500">* {errors.birthdate.message}</p>
          )}
        </form>
      </div>
    </>
  );
};

export default AuthorForm;
