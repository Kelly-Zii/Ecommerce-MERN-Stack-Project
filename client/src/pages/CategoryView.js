import { useState, useEffect } from "react";
import Jumbotron from "../ components/cards/Jumbotron";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../ components/cards/ProductCard";

export default function CategoryView() {
  //state
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  //hooks
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProductByCategory();
  }, [params?.slug]);

  const loadProductByCategory = async () => {
    try {
      const { data } = await axios.get(`/product-by-category/${params.slug}`);
      setProducts(data.products);
      setCategory(data.category);
      console.log(products);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Jumbotron
        title={category?.name}
        subTitle={`${products?.length} products found in "${category?.name}"`}
      />

      <div className="container-fluid">
        <div className="row mt-3">
          {products.map((p) => (
            <div key={p._id} className="col-md-4">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
