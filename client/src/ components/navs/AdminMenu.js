import { NavLink } from "react-router-dom"

export default function AdminMenu(){
    return (
        <>
        <div className="p-3 mt-2 h4 bg-light"> Admin Links</div>
            <ul className="list-group list-unstyled">
              <li>
                <NavLink
                  className="list-group-item" 
                  to="/dashboard/admin/category"
                >
                  Create Blog Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="list-group-item" 
                  to="/dashboard/admin/createblog"
                >
                  Create Blogs
                </NavLink>
                <NavLink
                  className="list-group-item" 
                  to="/dashboard/admin/blogs"
                >
                  Manage Blogs
                </NavLink>
                <NavLink
                  className="list-group-item" 
                  to="/dashboard/admin/orders"
                >
                  Manage Orders
                </NavLink>
              </li>
            </ul>
        </>
    )
}