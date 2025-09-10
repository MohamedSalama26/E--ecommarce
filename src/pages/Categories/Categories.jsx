import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import Loading from "../../components/Loading/Loading";

export default function Categories() {
  let [categories, setCategories] = useState(null);
  let [subCategories, setSubCategories] = useState(null);
  let [subCatName, setSubCatName] = useState(null);
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setCategories(data.data);
  }
  async function getSubCategories(id, name) {
    const toastId = (toast.loading = "Plese Wait");
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    setCategories(data.data);
    setSubCatName(name);
    toast.dismiss(toastId);
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title> Category</title>
      </Helmet>
      <div className="flex justify-center">
        <h1 className="text-center font-bold pb-2 text-white-600 text-[22px] header-lines mb-10">
          {" "}
          All categories
        </h1>
      </div>
      {categories ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((e) => (
            <div
              onClick={() => {
                getSubCategories(e._id, e.name);
              }}
              key={e._id}
              className="cat-card cursor-pointer overflow-hidden rounded-md shadow-lg hover:shadow-primary-400 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="card-head h-[500px] md:h-[300px] object-cover  overflow-hidden">
                <div className="">
                  <img
                    className="w-full h-[500px] md:h-[300px] object-cover"
                    src={e.image}
                    alt=""
                  />
                </div>
              </div>

              <div className="card-body py-4 text-center font-semibold text-white-600 text-[20px]">
                <h1>{e.name}</h1>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
      {subCategories ? (
        <>
          <div className="flex justify-center items-center">
            {" "}
            <h1 className="text-center font-bold pb-2 text-blue-600 text-[22px] header-lines my-10">
              {subCatName} Sub categorie
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 xl:grid-cols-5 cursor-default">
            {subCategories.map((e) => (
              <div
                key={e._id}
                className="flex justify-center items-center text-center font-semibold btn border border-teal-400 h-[50px]"
              >
                {e.name}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
