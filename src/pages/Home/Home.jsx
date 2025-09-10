import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import axios from "axios";
import Slider from "../../components/Slider/Slider";
import CSlider from "../../components/Category-Slider/CSlider";
import { Helmet } from "react-helmet";
export default function Home() {
  const [products, setProducts] = useState(null);
  async function getProud() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setProducts(data.data);
  }
  useEffect(() => {
    getProud();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="Descripton" content="FreshCart" />
      </Helmet>
      <Slider />
      <CSlider />
      {!products ? (
        <Loading />
      ) : (
        <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {products.map((product) => (
            <Card productInfo={product} key={product.id} />
          ))}
        </div>
      )}
    </>
  );
}
