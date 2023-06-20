import { useEffect } from "react";
import { Link } from "react-router-dom";
function NotFound() {
    useEffect(() => {
        document.title = "Solve4X | Not Found"
      }, [])
    return <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex-col flex justify-center items-center">
        <img src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg"  className="object-cover h-96" alt="not-found" />
        <h1 className="text-2xl font-bold">We couldn't find that page</h1>
        <Link to={'/'} className="px-3 py-2 bg-blue-light mt-3 rounded-md text-white hover:brightness-110 transition">Back to home</Link>
      </div>
    </div>
}

export default NotFound;