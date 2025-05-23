import { faCircleXmark, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ModalEntrance = () => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const close = () => setOpen(false);

  return (
    <div>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center"
          onClick={close}
        />
      )}

      <div
        className={`fixed z-50 inset-x-0 mx-auto top-20 md:top-40 max-w-lg rounded-2xl  shadow-xl transition-opacity",
            ${
              open
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            } `}
      >
        <button
          className="absolute top-3 right-3 text-[2rem] bg-transparent rounded-full leading-none"
          onClick={close}
          aria-label="Đóng"
        >
          <FontAwesomeIcon icon={faXmark} className="" />
        </button>
        <a href="/category/history">
          <img src="https://cnm-chatapp-bucket.s3.ap-southeast-1.amazonaws.com/kmg7-1747987566012-images.gif%20-%20Animated%20GIF%20optimizer%20and%20compressor.gif" />
        </a>
      </div>
    </div>
  );
};

export default ModalEntrance;
