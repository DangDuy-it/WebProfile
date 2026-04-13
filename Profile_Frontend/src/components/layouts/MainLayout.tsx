import { Outlet } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

export default function MainLayout(){
    return(
        <div className="main_layout_wrapper ">
            <Navbar/>
            <div className="main_layout_contents main-content">
                <Outlet/>
            </div>
        </div>
    )
}   
    