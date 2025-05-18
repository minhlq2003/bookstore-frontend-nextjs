"use client";
import { faComment, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";

const PopupContact = () => {
  return (
    <div className="relative">
      <Button
        className={`fixed bottom-[150px] w-12 h-12 right-2 md:right-5 rounded-full shadow-2xl flex items-center justify-center
  transition-all duration-300 ease-in-out z-50 hover:scale-110 hover:shadow-none  opacity-100 pointer-events-auto
  `}
      >
        <FontAwesomeIcon
          icon={faComment}
          className="w-10 h-10 text-[#0b3d9180]"
        />
      </Button>
    </div>
  );
};

export default PopupContact;
