import Head from "./Head";
import NavBar from "./NavBar";

export default function Layout({children}) {
    return (
        <>
            <NavBar />
            <div>{children}</div>
        </>
    )
}