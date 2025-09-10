import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Products() {
  const [Product, setProducts] = useState(null);
  async function getProducts() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    setProducts(data.data);
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="flex justify-center">
        <h1 className="text-center font-bold pb-2 text-[22px] header-lines mb-10">
          {" "}
          Products
        </h1>
      </div>

      {Product ? (
        <div className="grid mt-10 xl:grid-cols-6 md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-5">
          {Product.map((e) => (
            <Card key={e.id} productInfo={e} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
