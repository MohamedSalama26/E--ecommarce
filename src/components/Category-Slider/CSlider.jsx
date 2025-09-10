import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function CSlider() {
  const [Categories, setCategories] = useState(null);
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "Get",
    };
    let { data } = await axios.request(options);
    setCategories(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <section className="my-8">
        <h3 className="mb-5 text-lg text-gray-600 font-semibold">
          Shop Popular Categories :
        </h3>
        {!Categories ? (
          <Loading />
        ) : (
          <Swiper slidesPerView={6} loop={true}>
            {Categories.map((category) => (
              <SwiperSlide key={category._id}>
                <div className="h-64">
                  <img
                    className="w-full h-full object-cover p-3"
                    src={category.image}
                    alt=""
                  />
                </div>
                <h3>{category.name}</h3>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    </>
  );
}
