import { Link, Outlet } from "react-router-dom";
import "./styles/App.css";
import "./styles/main.css";

function App() {
  return (
    <div className="container flex">
      <div className="flex flex-row text-[#ffffffde]">
        <div className="border-r min-h-screen min-w-64 bg-[#242424]">
          <ul className="mt-2 pb-2 px-2">
            <li className="hover:text-neutral-600">
              <Link to="/catalog">Home</Link>
            </li>
            <li className="hover:text-neutral-600">
              <Link to="/catalog/books">All books</Link>
            </li>
            <li className="hover:text-neutral-600">
              <Link to="/catalog/authors">All authors</Link>
            </li>
            <li className="hover:text-neutral-600">
              <Link to="/catalog/genres">All genres</Link>
            </li>
            <li className="mb-4 hover:text-neutral-600">
              <Link to="/catalog/bookinstances">All book-instances</Link>
            </li>
            <li>
              <hr />
            </li>
            <li className="mt-4 hover:text-neutral-600">
              <Link to="/catalog/authors/create">Create new author</Link>
            </li>
            <li className="hover:text-neutral-600">
              <Link to="/catalog/genres/create">Create new genre</Link>
            </li>
            <li className="hover:text-neutral-600">
              <Link to="/catalog/books/create">Create new book</Link>
            </li>
            <li className="hover:text-neutral-600">
              <Link to="/catalog/bookinstances/create">
                Create new book instance (copy)
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-sm-10"></div>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
