import Navbar from "../components/primarys/Navbar";

function OnlyNavbar({children}: {children: JSX.Element}) {
    return <>
    <div className="h-14 fixed left-0 right-0 top-0 z-50">
        <Navbar />
    </div>
    <div className="mt-14  mx-auto bg-gray-light dark:bg-dark-light">{children}</div>
    </>
}

export default OnlyNavbar;