import img1 from "../../assets/images/slide1.jpeg";
import img2 from "../../assets/images/slide2.jpeg";
import img3 from "../../assets/images/slide3.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
export default function Slider() {
  return (
    <>
      <section className="grid grid-cols-12 mb-8">
        <div className="col-span-8 h-full w-full p-2">
          <Swiper>
            <SwiperSlide>
              <img className="h-full w-full" src={img1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="h-full w-full" src={img2} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="h-full w-full" src={img3} alt="" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="col-span-4">
          {" "}
          <img className="w-full" src={img2} alt="" />
          <img className="w-full" src={img3} alt="" />
        </div>
      </section>
    </>
  );
}
