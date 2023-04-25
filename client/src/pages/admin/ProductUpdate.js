import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../ components/cards/Jumbotron";
import AdminMenu from "../../ components/navs/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

export default function AdminProductUpdate() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  // hook
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    loadProduct();
  }, []);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/blog/${params.slug}`);
      setName(data.name);
      setContent(data.content);
      setPrice(data.price);
      setCategory(data.category._id);
      setCountry(data.country);
      setCity(data.city);
      setId(data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      photo && productData.append("photo", photo);
      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("content", content);
      productData.append("category", category);
      productData.append("country", country);
      productData.append("city", city);
      productData.append("price", price);
      productData.append("user", auth.user._id);

      const { data } = await axios.put(`/blog/${id}`, productData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" is updated`);
        navigate("/dashboard/admin/blogs");
      }
    } catch (err) {
      console.log(err);
      toast.error("Blog updated failed. Try again.");
    }
  };

  const handleDelete = async (req, res) => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this blog?"
      );
      if (!answer) return;
      const { data } = await axios.delete(`/blog/${id}`);
      toast.success(`"${data.name}" is deleted`);
      navigate("/dashboard/admin/blogs");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
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
            <div className="p-3 mt-2 mb-2 h4 bg-light">Update Blog</div>

            {photo ? (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product photo"
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            ) : (
              <div className="text-center">
                <img
                  src={`${
                    process.env.REACT_APP_API
                  }/blog/photo/${id}?${new Date().getTime()}`}
                  alt="product photo"
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            )}

            <div className="pt-2">
              <label className="btn btn-outline-secondary col-12 mb-3">
                {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <input
              type="text"
              className="form-control mb-3 p-2"
              placeholder="Write a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              type="text"
              className="form-control mb-3 p-2"
              placeholder="Write a content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <input
              type="text"
              className="form-control mb-3 p-2"
              placeholder="Write a country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            <input
              type="text"
              className="form-control mb-3 p-2"
              placeholder="Write a city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              type="number"
              className="form-control mb-3 p-2"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Select
              // showSearch
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose category"
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <div className="d-flex justify-content-between">
              <button onClick={handleSubmit} className="btn btn-primary mb-5">
                Update
              </button>
              <button onClick={handleDelete} className="btn btn-danger mb-5">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
