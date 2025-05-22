"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  XIcon,
  Send,
  MessageCircleQuestionIcon,
  BotIcon,
  RotateCcwIcon,
  ChevronDownIcon,
} from "lucide-react";
import { Book } from "@/constant/types";

interface ChatMessage {
  id: string;
  type: "user" | "bot" | "loading" | "error" | "system";
  content: string | React.ReactNode;
}

const ChatbotWidget: React.FC = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (isWidgetOpen) {
      inputRef.current?.focus();
      if (
        messages.length === 0 ||
        (messages.length === 1 &&
          messages[0].type === "system" &&
          !(
            messages[0].content &&
            messages[0].content.toString().includes("Chào bạn")
          ))
      ) {
        setMessages([
          {
            id: `${Date.now()}-system-initial`,
            type: "system",
            content: (
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-1">
                  Hello! I am GreatBook's virtual assistant.
                </p>
                <p>
                  Let me know what kind of books you are looking for (e.g.,
                  Vietnamese history books, romance novels, science books).
                </p>
              </div>
            ),
          },
        ]);
      }
    }
  }, [isWidgetOpen]);

  const handleSendMessage = async (messageContent?: string) => {
    const query = messageContent || input;
    if (query.trim() === "" || isLoading) return;

    const newUserMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      type: "user",
      content: query,
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    if (!messageContent) {
      setInput("");
    }
    setIsLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: `${Date.now()}-loading`,
        type: "loading",
        content: "Searching...",
      },
    ]);

    const chatbotApiUrl =
      process.env.NEXT_PUBLIC_CHATBOT_API_URL || "http://localhost:8000";
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

    try {
      const response = await fetch(`${chatbotApiUrl}/api/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.type !== "loading")
      );
      setIsLoading(false);

      if (!response.ok) {
        let errorDetail = `Lỗi ${response.status}: ${
          response.statusText || "Unable to connect to chatbot server."
        }`;
        try {
          const errorData = await response.json();
          errorDetail =
            errorData.detail || errorData.message || JSON.stringify(errorData);
        } catch (jsonError) {
          try {
            errorDetail = await response.text();
          } catch (textError) {}
        }
        throw new Error(errorDetail);
      }

      const data = await response.json();

      if (data.books && data.books.length > 0) {
        const booksContent = (
          <div className="space-y-2">
            <p className="font-semibold text-xs mb-1">
              Here are some suggestions for you:
            </p>
            <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto chatbot-books-scroll pr-1">
              {data.books.map((book: Book) => (
                <a
                  key={book.id}
                  href={`/book/${book.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 text-left hover:bg-gray-50"
                >
                  <h4 className="font-bold text-blue-800 text-md leading-tight mb-0.5 truncate">
                    {book.title}
                  </h4>
                  {book.author && (
                    <p className="text-2xs text-gray-800 mb-0.5 truncate">
                      Author: {book.author}
                    </p>
                  )}
                  {typeof book.price === "number" && (
                    <p className="text-2xs text-gray-800 font-medium mb-0.5">
                      Price: {book.price.toLocaleString("en-US")} USD
                    </p>
                  )}
                  {book.category && (
                    <p className="text-2xs text-gray-800 mb-0.5 truncate">
                      Category: {book.category}
                    </p>
                  )}
                  {book.description && (
                    <p className="text-2xs text-gray-800 mb-0.5 truncate">
                      Description: {book.description}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        );
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: `${Date.now()}-bot-books`, type: "bot", content: booksContent },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: `${Date.now()}-bot-notfound`,
            type: "bot",
            content:
              "Sorry, I couldn't find any matching books. Please try searching with other keywords.",
          },
        ]);
      }
    } catch (error) {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.type !== "loading")
      );
      setIsLoading(false);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error has occurred. Please try again later.";
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: `${Date.now()}-error`, type: "error", content: errorMessage },
      ]);
    }
  };

  const suggestionPrompts = [
    "I want to buy some Fiction Books",
    "I want to read some History Books",
    "I want to study some Science Books",
  ];

  const toggleWidget = () => {
    setIsWidgetOpen(!isWidgetOpen);
  };

  const handleResetChat = () => {
    setMessages((prevMessages) =>
      prevMessages.filter(
        (msg) => msg.type === "system" && msg.id.endsWith("-system-initial")
      )
    );
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100]">
      {!isWidgetOpen && (
        <button
          onClick={toggleWidget}
          className="fixed bottom-[75px] md:bottom-[150px] w-14 h-14 right-3 md:right-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center
                    transition-all duration-300 ease-in-out z-[999] hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 group"
          aria-label="Open chatbot widget"
          title="Chat with Great Book's virtual assistant"
        >
          <MessageCircleQuestionIcon
            size={30}
            className="group-hover:animate-wiggle"
          />
        </button>
      )}

      <div
        className={`
          bg-white rounded-xl shadow-2xl flex flex-col
          w-[calc(100vw-2rem)] max-w-[370px] sm:max-w-[380px]
          h-[calc(100vh-6rem)] max-h-[550px] sm:max-h-[600px]
          transition-all duration-300 ease-out origin-bottom-right
          ${
            isWidgetOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-95 pointer-events-none"
          }
        `}
      >
        <div
          className="bg-gradient-to-r from-blue-500 to-sky-500 text-white p-3 flex justify-between items-center rounded-t-xl cursor-pointer"
          onClick={!isWidgetOpen ? toggleWidget : undefined}
        >
          <div className="flex items-center space-x-2">
            <BotIcon size={20} className="text-white/90" />
            <h3 className="font-semibold text-base sm:text-md">
              GreatBook Assistant
            </h3>
          </div>
          <button
            onClick={toggleWidget}
            className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-full transition-colors"
          >
            {isWidgetOpen ? (
              <XIcon size={18} />
            ) : (
              <MessageCircleQuestionIcon size={18} />
            )}
          </button>
        </div>

        <div className="flex-1 p-2.5 space-y-2.5 overflow-y-auto chatbot-messages text-xs sm:text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] py-1.5 px-2.5 rounded-lg shadow-sm break-words ${
                  msg.type === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : msg.type === "bot"
                    ? "bg-gray-100 text-gray-800 rounded-bl-none"
                    : msg.type === "loading"
                    ? "bg-gray-100 text-gray-800 rounded-bl-none"
                    : msg.type === "error"
                    ? "bg-blue-100 text-blue-600 rounded-bl-none border border-blue-200 text-xs"
                    : "bg-indigo-50 text-indigo-700 rounded-bl-none text-xs"
                }`}
              >
                {msg.type === "loading" && (
                  <div className="flex items-center space-x-1.5">
                    <BotIcon className="w-4 h-4 animate-pulse text-blue-500" />
                    <span className="text-xs text-gray-600">Searching...</span>
                  </div>
                )}
                {msg.type !== "loading" &&
                  (typeof msg.content === "string" ? (
                    <p>{msg.content}</p>
                  ) : (
                    msg.content
                  ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {!isLoading &&
          messages.filter((m) => m.type !== "system").length < 1 && (
            <div className="px-2.5 pt-1.5 pb-1 border-t border-gray-200">
              <p className="text-2xs text-gray-500 mb-1">Quick question:</p>
              <div className="flex flex-wrap gap-1">
                {suggestionPrompts.slice(0, 3).map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-2xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full transition-colors border border-gray-200"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

        <div className="p-2.5 border-t border-gray-200 bg-gray-50 rounded-b-xl flex items-center space-x-1.5">
          <button
            onClick={handleResetChat}
            className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
            title="Bắt đầu chat mới"
          >
            <RotateCcwIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !isLoading && handleSendMessage()
            }
            placeholder="Enter message..."
            className="flex-1 p-1.5 sm:p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 text-xs sm:text-sm"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSendMessage()}
            className="bg-blue-500 text-white p-1.5 sm:p-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isLoading || input.trim() === ""}
          >
            <Send size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWidget;
