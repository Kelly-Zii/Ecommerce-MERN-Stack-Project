import { NavLink } from "react-router-dom"

export default function UserMenu(){
    return (
        <>
        <div className="p-3 mt-2 h4 bg-light"> User Links</div>
            <ul className="list-group list-unstyled">
              <li>
                <NavLink
                  className="list-group-item" 
                  to="/dashboard/user/profile"
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="list-group-item" 
                  to="/dashboard/user/blogs"
                >
                  Blogs
                </NavLink>
              </li>
              <li>
              <NavLink
                  className="list-group-item" 
                  to="/dashboard/user/createblog"
                >
                  Create Blogs
                </NavLink>
              </li>
            </ul>
        </>
    )
}