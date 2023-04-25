import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../ components/cards/Jumbotron";
import UserMenu from "../../ components/navs/UserMenu";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import citiesData from "../../countries.json";

const { Option } = Select;

export default function UserProduct() {
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

  //hook
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("content", content);
      productData.append("category", category);
      productData.append("country", country);
      productData.append("city", city);
      productData.append("price", price);
      productData.append("user", auth.user._id);
      console.log(auth.user._id);

      const { data } = await axios.post("/blog", productData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" is created`);
        navigate("/dashboard/user/blogs");
      }
    } catch (err) {
      console.log(err);
      toast.error("Blog create failed. Try again.");
    }
  };

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="User Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Create Blogs</div>

            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="blog photo"
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

            {/* <input
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
            /> */}
            <Select
                bordered={false}
                size="large"
                className="form-select mb-3"
                placeholder="Select country"
                onChange={(value) => setCountry(value)}
              >
                {Object.keys(citiesData).map((country) => (
                  <Option key={country} value={country}>
                    {country}
                  </Option>
                ))}
            </Select>

            <Select
                bordered={false}
                size="large"
                className="form-select mb-3"
                placeholder="Select city"
                onChange={(value) => setCity(value)}
                disabled={!country}
              >
                {country &&
                  citiesData[country].map((city) => (
                    <Option key={city} value={city}>
                      {city}
                    </Option>
                  ))}
            </Select>


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



            <button onClick={handleSubmit} className="btn btn-primary mb-5">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
