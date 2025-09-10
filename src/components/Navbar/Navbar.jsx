import React, { useContext, useEffect } from "react";
import FreshCart from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/Userr.contex";
import { CartContext } from "../../context/Cart.context";
export default function Navbar() {
  const { token, logOut } = useContext(UserContext);
  const { cartInfo, getCartProducts } = useContext(CartContext);
  useEffect(() => {
    getCartProducts();
  }, []);
  return (
    <>
      <nav className="py-4 bg-slate-100 shadow-md fixed top-0 left-0 right-0 z-10 ">
        <div className="container flex items-center gap-12">
          <NavLink to="">
            <img src={FreshCart} alt="FreshCartLogo" />
          </NavLink>
          {token && (
            <ul className="flex gap-5 items-center">
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300  before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""
                      } `;
                  }}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300  before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""
                      } `;
                  }}
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300  before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""
                      } `;
                  }}
                  to="/categories"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300  before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""
                      } `;
                  }}
                  to="/brands"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300  before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""
                      } `;
                  }}
                  to="/allorders"
                >
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300  before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""
                      }`;
                  }}
                  to={"/cart"}
                >
                  {" "}
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300  before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""
                      }`;
                  }}
                  to={"/wishlist"}
                >
                  {" "}
                  Wishlist
                </NavLink>
              </li>
            </ul>
          )}
          {token && (
            <Link to={"/cart"} className="cart ml-auto relative ">
              <i className="fa-solid fa-cart-shopping cursor-pointer text-lg"></i>
              <div className="cartCount flex justify-center items-center h-5 w-5 rounded-full bg-primary-800 text-white absolute right-0 top-0 translate-x-1/2 -translate-y-1/2">
                {cartInfo == null ? (
                  <span>0</span>
                ) : (
                  <span>{cartInfo.numOfCartItems}</span>
                )}
              </div>
            </Link>
          )}
          <ul className={`flex gap-8 items-center ${!token && "ms-auto"} `}>
            <li>
              <NavLink to="https://instagram.com" target="_blank">
                <i className="fa-brands fa-instagram"></i>
              </NavLink>
            </li>
            <li>
              <NavLink to="https://facebook.com" target="_blank">
                <i className="fa-brands fa-facebook"></i>
              </NavLink>
            </li>{" "}
            <li>
              <NavLink to="https://tiktok.com" target="_blank">
                <i className="fa-brands fa-tiktok"></i>
              </NavLink>
            </li>{" "}
            <li>
              <NavLink to="https://twitter.com" target="_blank">
                <i className="fa-brands fa-twitter"></i>
              </NavLink>
            </li>{" "}
            <li>
              <NavLink to="https://linkedin.com" target="_blank">
                <i className="fa-brands fa-linkedin"></i>
              </NavLink>
            </li>{" "}
            <li>
              <NavLink to="https://youtube.com" target="_blank">
                <i className="fa-brands fa-youtube"></i>
              </NavLink>
            </li>
          </ul>
          {!token && (
            <ul>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300  before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""
                      } `;
                  }}
                  to="/signup"
                >
                  Sign Up
                </NavLink>
              </li>
            </ul>
          )}
          {!token && (
            <ul>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300  before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""
                      } `;
                  }}
                  to="/login"
                >
                  Log In
                </NavLink>
              </li>
            </ul>
          )}
          {token && (
            <ul className="flex gap-5 items-center">
              <li onClick={logOut}>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300  before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""
                      } `;
                  }}
                  to="/logout"
                >
                  <i className="fa-solid fa-right-from-bracket text-lg"></i>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}
