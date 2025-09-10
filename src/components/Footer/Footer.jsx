import amazonLogo from "../../assets/images/amazon-pay.png";
import americanLogo from "../../assets/images/American-Express-Color.png";
import mastercardLogo from "../../assets/images/mastercard.webp";
import paypalLogo from "../../assets/images/paypal.png";
import appstoreLogo from "../../assets/images/get-apple-store.png";
import playstoreLogo from "../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 py-8">
        <div className="container space-y-4">
          <div className="hfotter">
            <h2 className="text-xl font-semibold text-slate-800">
              Get The App
            </h2>
            <p className="text-slate-400 ">
              We Will Send You A link,Open It On Your Phone To Get The App
            </p>
          </div>
          <div className="felx justify-center">
            <input
              className="formControl grow "
              type="email"
              placeholder="EmailAdress"
            />
            <button className="btn uppercase bg-primary-800 hover:bg-primary-950 text-white font-semibold text-sm">
              Share App Link
            </button>
          </div>
          <div className="flex justify-between items-center py-4 border-y-2 border-slate-300 border-opacity-5">
            <div className="paymentPartner flex gap-3 items-center">
              <h3>Payment Partner</h3>
              <img className="w-24" src={amazonLogo} alt="amazon-pay.png" />
              <img
                className="w-24"
                src={americanLogo}
                alt="American-Express-Color.png"
              />
              <img
                className="w-20"
                src={mastercardLogo}
                alt="mastercard.webp"
              />
              <img className="w-24" src={paypalLogo} alt="paypal.png" />
            </div>
            <div className="download flex flex-wrap gap-3 items-center">
              <h3>Get Delevires With Fresh Cart</h3>
              <img
                className="w-[110px]"
                src={playstoreLogo}
                alt="get-apple-store.png"
              />
              <img
                className="w-24"
                src={appstoreLogo}
                alt="get-google-play.png"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
