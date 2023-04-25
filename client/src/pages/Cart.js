import { useCart } from "../context/cart";
import Jumbotron from "../ components/cards/Jumbotron";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/auth";
import moment from "moment";
import UserCartSidebar from "../ components/cards/UserCartSidebar";
import ProductCardHorizontal from "../ components/cards/ProductCardHorizontal";

export default function Cart() {
  //context
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  
  
  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.token && auth?.user?.name}`}
        subTitle={
          cart?.length
            ? `You have ${cart?.length} items in the cart. ${
                auth?.token ? "" : "Please login to check"
              }`
            : "Your cart is empty"
        }
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {cart?.length ? (
                "My cart"
              ) : (
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/shop")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {cart?.length && (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {cart?.map((p, index) => (
                  <ProductCardHorizontal key={index} p={p}/>
                ))}
              </div>
            </div>
            <UserCartSidebar />
          </div>
        </div>
      )}
    </>
  );
}
