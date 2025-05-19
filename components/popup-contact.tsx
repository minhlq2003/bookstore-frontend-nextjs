"use client";

import { MessageCircle } from "lucide-react";
import React, { useState } from "react";
import ChatbotWidget from "@/components/chatbot-widget";

const PopupContact = () => {
  return (
    <div className="relative">
      <button
        className={ `fixed bottom-[75px] md:bottom-[85px] w-14 h-14 right-3 md:right-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center
                    transition-all duration-300 ease-in-out z-[999] hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 group
                  `}
        aria-label="Mở chatbot tư vấn sách"
        title="Chat với trợ lý ảo GreatBook"
      >
        <MessageCircle size={ 28 } className="group-hover:animate-wiggle" />
      </button>

      <ChatbotWidget />
    </div>
  );
};

export default PopupContact;
