import { Link } from "react-router-dom";
function Logo({full}: {full?: boolean}) {
    return (
      <li className={`dark:text-gray-bold flex items-center h-full justify-center ${full ? "text-2xl" : "text-4xl lg:text-2xl"} lg:px-2 min-w-[50px]`}>
        <Link to={"/"}>
          <span className={`${full ? "inline-block" : "hidden lg:inline-block"}`}>S</span>
          <span className="text-blue-light relative after:w-2 after:h-2 after:top-0 lg:after:-top-1 after:right-0 after:absolute after:rounded-full after:bg-blue-light before:w-4 before:h-4 border-b-4 before:absolute rounded-full">
            O
          </span>
          <span className={`${full ? "inline-block" : "hidden lg:inline-block"}`}>lve4X</span>
        </Link>
      </li>
    );
  }

  export default Logo;