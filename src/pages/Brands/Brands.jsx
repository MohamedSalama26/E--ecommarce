import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../../components/Loading/Loading";

export default function Brands() {
  const modalRef = useRef();
  const [oneBrandData, setOneBrandData] = useState(null);
  const [brandsData, setBrandsData] = useState(null);
  const [modal, setModal] = useState(false);

  async function getBrands() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setBrandsData(data.data);
  }
  async function getOneBrand(id) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    setOneBrandData(data.data);
  }
  async function openModal(id) {
    if (modal) return;
    if (!modal) {
      await modalRef.current.classList.remove("h-0");
      await modalRef.current.classList.add("brand-modal");
      setModal(true);
      await getOneBrand(id);
    }
  }
  async function closeModal() {
    if (!modal) return;
    if (modal) {
      await modalRef.current.classList.add("h-0");
      await modalRef.current.classList.remove("brand-modal");
      setModal(false);
      setOneBrandData(null);
    }
  }
  const stopChild = (e) => {
    e.stopPropagation();
  };
  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <div className="flex justify-center">
        <h1 className="text-center font-bold pb-2 text-[22px] header-lines mb-10">
          {" "}
          All Brands
        </h1>
      </div>
      <div
        onClick={closeModal}
        ref={modalRef}
        className="h-0 z-50  overflow-hidden fixed inset-0 flex justify-center items-center bg-slate-300 bg-opacity-40"
      >
        <div
          onClick={(e) => stopChild(e)}
          className="modal-body md:w-[50%] w-[80%] xl:w-[35%] bg-white border-2 shadow-2xl shadow-400 border-400 overflow-hidden rounded-lg"
        >
          <div className="  py-6 px-4">
            <i
              onClick={closeModal}
              className="fa-solid fa-x text-[20px] text-400 hover:text-600 duration-300 transition-colors ms-[95%] cursor-pointer "
            ></i>
          </div>
          <div className="flex gap-2 border-y-2 border-400">
            {oneBrandData ? (
              <>
                <div className="w-[50%] flex flex-col gap-3 justify-center items-center">
                  <h1 className=" text-[20px] font-bold">
                    {oneBrandData.name}
                  </h1>
                </div>
                <div className="w-[50%]">
                  <img className="w-[100%]" src={oneBrandData.image} alt="" />
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center w-full py-20">
                  <i className="fa-solid fa-spinner fa-spin text-[50px] text-center"></i>
                </div>
              </>
            )}
          </div>
          <div className="w-full  py-6 flex justify-center ">
            <button onClick={closeModal} className="btn border-400  mt-4 px-5">
              Close
            </button>
          </div>
        </div>
      </div>
      {brandsData ? (
        <>
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
            {brandsData.map((e) => (
              <div
                key={e._id}
                onClick={(id) => openModal(e._id)}
                className="brand-card cursor-pointer overflow-hidden rounded-md shadow-lg px-2 py-4 shadow-200 hover:shadowgh-700 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="card-head">
                  <img className="w-[100%]" src={e.image} alt="" />
                </div>
                <div className="card-body text-center">{e.name}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
