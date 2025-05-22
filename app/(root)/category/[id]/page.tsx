"use client";
import { useTranslation } from "next-i18next";
import Image, { StaticImageData } from "next/image";
import imgBook from "@/public/images/book-img.png";
import BookItem from "@/components/book-item";
import { useParams, useRouter } from "next/navigation";
import { ApiBook, Book } from "@/constant/types";
import { useEffect, useState, useCallback } from "react";
import { getBooksByCategory } from "@/modules/services/bookService";
import { Images } from "@/constant/images";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

function Category() {
  const { t } = useTranslation("common");
  const { id } = useParams();

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  const [newArrivals, setNewArrivals] = useState<Book[]>([]);
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [loadingArrivals, setLoadingArrivals] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [loadingHero, setLoadingHero] = useState(true);
  const [errorHero, setErrorHero] = useState<string | null>(null);
  const [bestSellingBooks, setBestSellingBooks] = useState<Book[]>([]);
  const [featuredBook, setFeaturedBook] = useState<Book | null>(null);
  const router = useRouter();
  // Helper to map API data to Book type
  const mapApiBookToBook = (
    apiBook: ApiBook
  ): {
    id: number;
    title: string;
    subTitle: string;
    price: number;
    imageUrl: string;
    author: string;
    rating: number;
    book_images: { url: string }[];
    stock?: number;
  } => ({
    id: apiBook.id,
    title: apiBook.title,
    subTitle: apiBook.description || "",
    price: Number(apiBook.price),
    imageUrl: apiBook.book_images?.[0]?.url || "",
    author: apiBook.author,
    rating: 0, // API does not provide rating
    book_images: apiBook.book_images || [],
    stock: apiBook.stock,
  });

  const fetchNewArrivals = useCallback(async () => {
    setLoadingArrivals(true);
    try {
      const res = await fetch(`${apiBaseUrl}/book/new-arrivals/${id}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setNewArrivals(json.data.map(mapApiBookToBook));
      } else {
        setNewArrivals([]);
      }
    } catch {
      setNewArrivals([]);
    }
    setLoadingArrivals(false);
  }, [apiBaseUrl, id]);

  const fetchRecommendations = useCallback(async () => {
    setLoadingRecommendations(true);
    try {
      const res = await fetch(`${apiBaseUrl}/book/recommendations/${id}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setRecommendations(json.data.map(mapApiBookToBook));
      } else {
        setRecommendations([]);
      }
    } catch {
      setRecommendations([]);
    }
    setLoadingRecommendations(false);
  }, [apiBaseUrl, id]);

  useEffect(() => {
    if (id) {
      fetchNewArrivals();
      fetchRecommendations();
    }
  }, [id, fetchNewArrivals, fetchRecommendations]);

  useEffect(() => {
    const fetchHeroBooks = async (categorySlug: string) => {
      setLoadingHero(true);
      setErrorHero(null);
      try {
        const response = await getBooksByCategory(categorySlug, { limit: 5 });
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
    if (typeof id === "string") {
      fetchHeroBooks(id);
    } else if (Array.isArray(id) && id.length > 0) {
      fetchHeroBooks(id[0]);
    }
  }, []);
  const handleHeroBookClick = (book: Book) => {
    setFeaturedBook(book);
  };
  const handleViewDetailsClick = (bookId: number | undefined) => {
    if (bookId) {
      router.push(`/book/${bookId}`);
    }
  };
  const CategoryItem: React.FC<{
    iconSrc: string | StaticImageData | StaticImport;
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
  return (
    <div className="w-full bg-[#ececec] sm:pt-5 pt-0 pb-20">
      <div className="bg-gray-200 max-w-[1440px] mx-auto">
        <div className="sm:rounded-xl rounded-none overflow-hidden">
          <div className="bg-[#0B3D91] text-white py-4 text-left sm:text-3xl text-xl font-bold sm:pl-10 pl-3">
            {t(
              `${
                typeof id === "string"
                  ? id.toUpperCase()
                  : Array.isArray(id) && id.length > 0
                  ? id[0].toUpperCase()
                  : ""
              } BOOKS`
            )}
          </div>

          <div className="mx-auto sm:p-6 p-3 bg-[#0B3D9180] text-white">
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
                        className="w-[100px] h-[140px] lg:w-[150px] lg:h-[200px] rounded-lg shadow-md object-cover hover:shadow-xl"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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
      <div className="max-w-[1440px] mx-auto bg-[#êccec]">
        <div className="sm:px-10 px-3">
          <p className="text-[#0b3d91] font-bold text-[24px] py-5">
            New Arrival
          </p>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loadingArrivals ? (
                <span>Loading...</span>
              ) : newArrivals.length === 0 ? (
                <span>No books found.</span>
              ) : (
                newArrivals.map((book) => (
                  <BookItem key={book.id} book={book} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto bg-[#êccec] mt-5">
        <div className="sm:px-10 px-3">
          <p className="text-[#0b3d91] font-bold text-[24px] py-5">
            Your Choice
          </p>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loadingRecommendations ? (
                <span>Loading...</span>
              ) : recommendations.length === 0 ? (
                <span>No books found.</span>
              ) : (
                recommendations.map((book) => (
                  <BookItem key={book.id} book={book} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
