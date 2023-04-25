import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Jumbotron from "../ components/cards/Jumbotron";
import { useParams } from "react-router-dom";
import { Badge } from "antd";
import ProductCard from "../ components/cards/ProductCard";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import {
  FaDollarSign,
  FaProjectDiagram,
  FaRegClock,
  FaCheck,
  FaTimes,
  FaTruckMoving,
  FaWarehouse,
  FaRocket,
} from "react-icons/fa";

export default function ProductView() {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [cart, setCart] = useCart();
  //hooks
  const params = useParams();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/blog/${params.slug}`);
      setProduct(data);
      loadRelated(data._id, data.category._id);
    } catch (err) {
      console.log(err);
    }
  };

  const loadRelated = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(
        `/related-products/${productId}/${categoryId}`
      );
      setRelated(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className="card mb-3">
            <Badge.Ribbon text={`${product?.collect} collect`} color="pink">
              <Badge.Ribbon
                text={`${product?.like} likes`}
                placement="start"
                color="green"
              >
                <img
                  className="card-img-top"
                  src={`${process.env.REACT_APP_API}/blog/photo/${product._id}`}
                  alt={product.name}
                  style={{ height: "500px", width: "100%", objectFit: "cover" }}
                />
              </Badge.Ribbon>
            </Badge.Ribbon>

            <div className="card-body">
              <h1 className="fw-bold">{product?.name}</h1>

              <p className="card-text lead">{product?.description}</p>
            </div>

            <div className="d-flex justify-content-between lead p-5 bg-light">
              <div>
                <p className="fw-bold">
                  <FaDollarSign />
                  Price:{" "}
                  {product?.price?.toLocaleString("SD", {
                    style: "currency",
                    currency: "SGD",
                  })}
                </p>
                <p>
                  <FaProjectDiagram />
                  Category: {product?.category?.name}
                </p>
                <p>
                  <FaRegClock />
                  Added: {moment(product?.createdAt).fromNow()}
                </p>
              </div>
            </div>

            <button
              className="btn btn-outline-primary col card-button"
              style={{ borderBottomRightRadius: "5px" }}
              onClick={() => {
                setCart([...cart, product]);
                toast.success("Added to collections.");
              }}
            >
              Add to Collection
            </button>
          </div>
        </div>
        <div className="col-md-3">
          <h2>Related Blogs</h2>
          <hr />
          {related?.length < 1 && <p>Nothing Found</p>}
          {related.map((p) => (
            <ProductCard p={p} key={p._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
