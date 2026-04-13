import { Outlet } from "react-router-dom";

export default function AdminLayout(){
    return(
        <div className="admin_wrapper main-content">
            <Outlet/>
        </div>
    )
}