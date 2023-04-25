import { useAuth } from "../../context/auth";
import Jumbotron from "../../ components/cards/Jumbotron";
import { useState, useEffect } from "react";
import AdminMenu from "../../ components/navs/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

export default function AdminProducts() {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      loadProducts();
    }, []);
  
    const loadProducts = async () => {
      try {
        const { data } = await axios.get("/blogs");
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <>
        <Jumbotron
          title={`Hello ${auth?.user?.name}`}
          subTitle="Admin Dashboard"
        />
  
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="p-3 mt-2 mb-2 h4 bg-light">Blogs</div>
  
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/blog/update/${p.slug}`}
                >
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_API}/blog/photo/${p._id}`}
                          alt={p.name}
                          className="img img-fluid rounded-start"
                          style={{height:'300px', width:'300px',objectFit: "cover"}}
                        />
                      </div>
  
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">{p?.content?.substring(0,160)}...</p>
                          <p className="card-text">
                            <small className="text-muted">
                              {moment(p.createdAt).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
  
