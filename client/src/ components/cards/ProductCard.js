import { useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { useCart } from "../../context/cart";
import { toast } from "react-hot-toast";

export default function ProductCard({ p }) {
  //context
  const [cart, setCart] = useCart();
  //hooks
  const navigate = useNavigate();
  return (
    <div className="card mb-3 hoverable">
      <Badge.Ribbon text={`${p?.collect} collect`} color="pink">
        <Badge.Ribbon
          text={`${p?.like} likes`}
          placement="start"
          color="green"
        >
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API}/blog/photo/${p._id}`}
            alt={p.name}
            style={{ height: "400px", objectFit: "cover" }}
          />
        </Badge.Ribbon>
      </Badge.Ribbon>

      <div className="card-body">
        <h5>{p?.name}</h5>

        <h4 className="fw-bold">
          {p?.price?.toLocaleString("SFD", {
            style: "currency",
            currency: "SGD",
          })}
        </h4>

        <p className="card-text">{p?.content?.substring(0, 60)}...</p>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary col card-button"
          style={{ borderBottomLeftRadius: "5px" }}
          onClick={() => navigate(`/blog/${p.slug}`)}
        >
          View Blog
        </button>

        <button
          className="btn btn-outline-primary col card-button"
          style={{ borderBottomRightRadius: "5px" }}
          onClick={() => {
            setCart([...cart, p]);
            localStorage.setItem('cart', JSON.stringify([...cart, p]))
            toast.success('Added to Collection')
          }}
        >
          Collect
        </button>
      </div>
    </div>
  );
}
