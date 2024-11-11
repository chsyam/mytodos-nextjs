import { useEffect, useState } from "react";
import Navbar from "../Navbar";

const Layout = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState({
        isLogin: false,
        userData: null
    })

    useEffect(() => {
        if (Object.keys(children?.props).length !== 0) {
            setIsAuthenticated({
                isLogin: true,
                userData: children?.props["payload"]
            })
        }
    }, [children])

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} />
            <div style={{ paddingTop: '70px' }}>
                {children}
            </div>
        </>
    );
};

export default Layout;