import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";
import ReactImageGallery from "react-image-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../../components/Card/Card";
import useOnline from "../../hooks/useOnline";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const { addProducttoCart } = useContext(CartContext);
  const [ProductDetails, setProductDetails] = useState(null);
  const [relatedProducts, setrelatedProducts] = useState(null);
  let { id } = useParams();
  async function getProductDetalis() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      setProductDetails(data.data);
    } catch (error) {}
  }
  async function getRelatedProduct() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${ProductDetails.category._id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      setrelatedProducts(data.data);
    } catch (error) {}
  }
  useEffect(() => {
    getProductDetalis();
  }, [id]);
  useEffect(() => {
    if (ProductDetails == null) {
      return;
    }
    getRelatedProduct();
  }, [ProductDetails]);
  let isOnline = useOnline();
  return (
    <>
      <Helmet>
        <title>Producat Details</title>
      </Helmet>
      {ProductDetails ? (
        <>
          <Helmet>
            <title>{ProductDetails.title}</title>
          </Helmet>
          <section className="grid gap-12 grid-cols-12 ">
            <div className="col-span-3">
              <ReactImageGallery
                showNav={false}
                showPlayButton={false}
                showFullscreenButton={false}
                items={ProductDetails.images.map((image) => {
                  return {
                    original: image,
                    thumbnail: image,
                  };
                })}
              />
            </div>
            <div className="col-span-9 space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-600">
                  {ProductDetails.title}
                </h2>
                <h3 className="text-primary-600 font-semibold">
                  {" "}
                  {ProductDetails.category.name}
                </h3>
              </div>
              <p className="text-gray-400"> {ProductDetails.description}</p>
              <div className="flex justify-between items-center">
                <span> {ProductDetails.price}L.E</span>
                <div>
                  <i className="fa-solid fa-star mr-2 text-yellow-500"></i>
                  <span> {ProductDetails.ratignsAverge}</span>
                </div>
              </div>
              {isOnline && (
                <button
                  onClick={() => {
                    addProducttoCart({ productId: id });
                  }}
                  className="bg-primary-700 hover:bg-primary-800 w-full transition-colors duration-300 p-1 rounded-md text-white font-semibold"
                >
                  Add To Cart
                </button>
              )}
            </div>
          </section>
          <section>
            <h2 className="text-2xl text-gray-600 my-8">Realted Product:</h2>
            {relatedProducts ? (
              <Swiper slidesPerView={6} spaceBetween={15}>
                {relatedProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <Card productInfo={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Loading />
            )}
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
