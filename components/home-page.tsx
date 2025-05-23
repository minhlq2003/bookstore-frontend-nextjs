"use client";

import { useTranslation } from "next-i18next";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Images } from "@/constant/images";
import { ApiBook, Book } from "@/constant/types";
import BookItem from "@/components/book-item";
import { getBooks } from "@/modules/services/bookService";
import { useRouter } from "next/navigation";
import ModalEntrance from "./modal-entrance";
import { BookImg } from "@/constant/images";
function Home() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [bestSellingBooks, setBestSellingBooks] = useState<Book[]>([]);
  const [featuredBook, setFeaturedBook] = useState<Book | null>(null);
  const [newArrivals, setNewArrivals] = useState<Book[]>([]);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingHero, setLoadingHero] = useState(true);
  const [errorHero, setErrorHero] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroBooks = async () => {
      setLoadingHero(true);
      setErrorHero(null);
      try {
        const response = await getBooks({ limit: 5 });
        if (
          response &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          const transformedBooks: Book[] = response.data.map(
            (apiBook: any) => ({
              ...apiBook,
              id: Number(apiBook.id),
              title: String(apiBook.title),
              author: String(apiBook.author || "N/A"),
              description: String(
                apiBook.description || "No description available."
              ),
              price: parseFloat(apiBook.price) || 0,
              book_images:
                Array.isArray(apiBook.book_images) &&
                apiBook.book_images.length > 0
                  ? apiBook.book_images.map((img: any) => ({
                      id: img.id,
                      url: String(img.url),
                    }))
                  : [
                      {
                        id: 0,
                        url: Images.bookImg.src || "/default-image.jpg",
                      },
                    ],
              sold: Number(apiBook.sold || 0),
            })
          );
          setBestSellingBooks(transformedBooks);
          setFeaturedBook(transformedBooks[0]);
        } else {
          setErrorHero(
            "No best selling books found or data is not in the correct format."
          );
          setBestSellingBooks([]);
          setFeaturedBook(null);
        }
      } catch (err) {
        console.error("Error while fetching best selling books: ", err);
        setErrorHero(
          "Unable to load best selling books. Please try again later!"
        );
        setBestSellingBooks([]);
        setFeaturedBook(null);
      } finally {
        setLoadingHero(false);
      }
    };

    fetchHeroBooks();
  }, []);

  const handleHeroBookClick = (book: Book) => {
    setFeaturedBook(book);
  };

  const handleViewDetailsClick = (bookId: number | undefined) => {
    if (bookId) {
      router.push(`/book/${bookId}`);
    }
  };

  useEffect(() => {
    const fetchNewArrivals = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${apiBaseUrl}/book/new-arrivals/fiction`);

        if (!response.ok) {
          throw new Error(`Failed to fetch new arrivals: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          const transformedBooks = data.data.map((book: ApiBook) => ({
            id: book.id,
            title: book.title,
            subTitle: book.description || "",
            price: book.price,
            author: book.author,
            rating: book.rating || 4.0,
            book_images: [
              {
                url: book.book_images?.[0]?.url || "/default-image.jpg",
              },
            ],
          }));

          setNewArrivals(transformedBooks);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err) {
        console.error("Error fetching new arrivals:", err);
        setError("Failed to load new arrivals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(
          `${apiBaseUrl}/book/recommendations/fiction`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch recommendations: ${response.status}`
          );
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          const transformedBooks = data.data.map((book: ApiBook) => ({
            id: book.id,
            title: book.title,
            subTitle: book.description || "",
            price: Number(book.price),
            author: book.author,
            rating: book.rating || 4.0,
            import_price: Number(book.import_price) || 0,
            book_images: book.book_images?.length
              ? book.book_images.map((img: { url: string }) => ({
                  url: img.url,
                }))
              : [{ url: "/default-image.jpg" }],
          }));

          setRecommendedBooks(transformedBooks);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      }
    };

    fetchRecommendedBooks();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ModalEntrance />
      <div className="w-full bg-[#ececec] sm:pt-5 pt-0 pb-20">
        {/* Hero Section */}
        <div className="max-w-[1440px] mx-auto bg-gray-200 rounded-xl overflow-hidden">
          <div className="bg-[#0B3D9180] text-white py-20 sm:py-32 px-7">
            <div className="max-w-[1440px] mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Unlock a World of{" "}
                <span className="text-[#0B3D91] px-2">Creativity</span>
              </h1>
              <p className="text-lg sm:text-xl mb-8">
                Discover a creative world through books! We offer a vast
                collection to suit every taste, along with special offers just
                for you.
              </p>
            </div>
          </div>

          <div className="mx-auto sm:p-6 p-3 bg-[#0B3D91] text-white">
            {loadingHero && (
              <div className="text-center py-10">
                Loading best selling books...
              </div>
            )}
            {errorHero && (
              <div className="text-center py-10 text-red-300">{errorHero}</div>
            )}
            {!loadingHero && !errorHero && (
              <div className="flex flex-row items-center justify-between">
                <div className="w-[40%] sm:pl-10 pl-0">
                  {featuredBook ? (
                    <>
                      <h2
                        className="sm:text-2xl text-[16px] font-bold text-left mb-2 truncate"
                        title={featuredBook.title}
                      >
                        {featuredBook.title}
                      </h2>
                      <p className="text-left mb-2 sm:text-[16px] text-[10px]">
                        By {featuredBook.author}
                      </p>
                      <p className="mb-6 sm:block hidden text-justify">
                        {featuredBook.description}
                      </p>
                      <div className="flex sm:space-x-4 space-x-2 items-center">
                        <button
                          onClick={() =>
                            handleViewDetailsClick(featuredBook.id)
                          }
                          className="bg-white text-black sm:px-4 px-2 sm:py-2 py-1 rounded-lg hover:bg-gray-400 shadow-lg text-sm"
                        >
                          {t("See more")}
                        </button>
                        <div className="sm:flex flex-row items-center hidden gap-1">
                          <div className="mr-[-8] pl-3 bg-white text-black rounded-lg shadow-lg text-sm flex items-center justify-center gap-2">
                            ${parseFloat(String(featuredBook.price)).toFixed(2)}
                            <button
                              onClick={() =>
                                handleViewDetailsClick(featuredBook.id)
                              }
                              className="bg-blue-500 text-white sm:px-4 sm:py-2 hover:bg-blue-700 shadow-lg py-2 px-4 rounded-lg text-sm"
                            >
                              {t("Buy now")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>Select a book to view details.</p>
                  )}
                </div>

                <div className="w-full md:w-[60%] my-6 relative flex items-center justify-center md:justify-start h-[200px] md:h-[200px] lg:h-[300px] overflow-hidden">
                  {bestSellingBooks.map((book, index) => (
                    <div
                      key={book.id}
                      className="absolute cursor-pointer transition-transform duration-300 ease-out"
                      style={{
                        width: "100%",
                        maxWidth: "150px",
                        zIndex: bestSellingBooks.length - index,
                        left: `${index * 15 + 5}%`,
                        transform:
                          featuredBook?.id === book.id
                            ? "scale(1.1) translateY(-10px)"
                            : "scale(1)",
                        filter:
                          featuredBook?.id === book.id
                            ? "drop-shadow(0 0 10px rgba(255,255,255,0.7))"
                            : "none",
                      }}
                      onClick={() => handleHeroBookClick(book)}
                      title={book.title}
                    >
                      <Image
                        src={book.book_images[0]?.url || Images.bookImg.src}
                        alt={book.title}
                        width={150}
                        height={200}
                        className="rounded-lg shadow-md object-cover w-[100px] h-[140px] lg:w-[150px] lg:h-[220px] hover:shadow-xl"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Popular Categories Section */}
        <div className="max-w-[1440px] mx-auto px-7 py-10">
          <p className="text-2xl font-bold text-[#0b3d91] mb-5">
            Popular Categories
          </p>

          <div className="flex justify-center items-center gap-10 md:gap-8 lg:gap-12 overflow-x-auto pb-10">
            <CategoryItem iconSrc={Images.fictionIcon} label="Fiction" />
            <CategoryItem iconSrc={Images.astronautIcon} label="Astronaut" />
            <CategoryItem iconSrc={Images.historyIcon} label="History" />
            <CategoryItem iconSrc={Images.mysteryIcon} label="Mystery" />
            <CategoryItem iconSrc={Images.scienceIcon} label="Science" />
            <CategoryItem iconSrc={Images.educationIcon} label="Education" />
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-7 py-10">
          <h2 className="text-2xl font-bold text-[#0b3d91] mb-5">
            {t("New Arrival")}
          </h2>
          {loading ? (
            <div className="text-center py-10">Loading new arrivals...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {newArrivals.map((book) => (
                <BookItem key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>

        {/* Big Spring Sales Section */}
        <div className="max-w-[1440px] h-[300px] lg:min-h-[400px] mx-auto relative overflow-hidden bg-customblue/40 rounded-xl p-2 lg:p-10 mb-10 flex justify-between">
          <div className="flex flex-col items-center justify-center gap-2 lg:gap-5 max-w-[50%]">
            <h1 className="text-xl lg:text-3xl text-customblue font-bold uppercase text-center">
              Big Spring sales
            </h1>
            <p className="text-base lg:text-lg text-white text-center">
              All book get special sales up to 50%
            </p>
            <p className="text-sm lg:text-base text-white text-center">
              Don&apos;t miss out on our biggest sale of the season! Get your
              favorite books at unbeatable prices - up to 50% off. Limited time
              only!
            </p>
            <button onClick={() => {router.push("/category")}} className="bg-customblue text-white px-5 py-2 rounded-full text-sm lg:text-base">Shop now</button>
          </div>
          <div className="absolute -top-10 lg:-top-20 -right-10 lg:right-0 max-w-[50%] flex gap-10 -rotate-[25deg]">
            <div className="flex flex-col gap-10">
              <Image
                src={BookImg}
                alt="Book"
                width={500}
                height={500}
                className="w-[100px] lg:w-[200px] h-[100px] lg:h-[250px]"
              />
              <Image
                src={BookImg}
                alt="Book"
                width={500}
                height={500}
                className="w-[100px] lg:w-[200px] h-[100px] lg:h-[250px]"
              />
              <Image
                src={BookImg}
                alt="Book"
                width={500}
                height={500}
                className="w-[100px] lg:w-[200px] h-[100px] lg:h-[250px]"
              />
            </div>
            <div className="flex flex-col gap-10">
              <Image
                src={BookImg}
                alt="Book"
                width={500}
                height={500}
                className="w-[100px] lg:w-[200px] h-[100px] lg:h-[250px]"
              />
              <Image
                src={BookImg}
                alt="Book"
                width={500}
                height={500}
                className="w-[100px] lg:w-[200px] h-[100px] lg:h-[250px]"
              />
              <Image
                src={BookImg}
                alt="Book"
                width={500}
                height={500}
                className="w-[100px] lg:w-[200px] h-[100px] lg:h-[250px]"
              />
            </div>
          </div>
        </div>

        {/* Popular Collection Section */}
        <div className="max-w-[1440px] mx-auto px-7 py-10">
          <h2 className="text-2xl font-bold text-[#0b3d91] mb-5">
            {t("Popular Collections")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendedBooks.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

const CategoryItem: React.FC<{
  iconSrc: string | StaticImageData;
  label: string;
}> = ({ iconSrc, label }) => {
  return (
    <Link href={`/category/${label.toLowerCase()}`}>
      <div className="flex flex-row items-center justify-center min-w-[150px] max-w-[150px] h-[60px] bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 px-3 gap-2">
        <Image src={iconSrc} alt={`${label} Icon`} width={24} height={24} />
        <p className="text-sm font-normal text-black">{label}</p>
      </div>
    </Link>
  );
};

export default Home;
