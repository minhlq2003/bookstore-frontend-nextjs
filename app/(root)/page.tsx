"use client";

import { useTranslation } from "react-i18next";
import { Suspense, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Images } from "@/constant/images";
import { Book, ApiBook } from "@/constant/types";
import BookItem from "@/components/book-item";
import { getBooks } from "@/modules/services/bookService";
import { message, Spin, Button as AntButton } from "antd";

interface HeroBookDisplay {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  imageUrl: string;
}

const mapApiBookToDisplayBook = (apiBook: any): HeroBookDisplay => {
  return {
    id: apiBook.id,
    title: apiBook.title || "Không có tiêu đề",
    author: apiBook.author || "Không rõ tác giả",
    description: apiBook.description || "Không có mô tả.",
    price: parseFloat(apiBook.price) || 0.0,
    imageUrl: apiBook.book_images?.[ 0 ]?.url || Images.bookImg?.src || "/default-book-cover.jpg",
  };
};

const mapApiBookToBookItemType = (apiBook: any): Book => {
  return {
    id: apiBook.id,
    title: apiBook.title,
    author: apiBook.author,
    price: parseFloat(apiBook.price),
    import_price: apiBook.import_price ? String(apiBook.import_price) : "0",
    book_images: apiBook.book_images?.map((img: { url: string }) => ({ url: img.url })) || [],
    imageUrl: apiBook.book_images?.[ 0 ]?.url || Images.bookImg?.src || "/default-book-cover.jpg",
    description: apiBook.description,
    sold: apiBook.sold,
    publish_year: apiBook.publish_year,
    is_featured: apiBook.is_featured,
  };
};


function Home() {
  const { t } = useTranslation("common");

  const [ featuredBooksList, setFeaturedBooksList ] = useState<HeroBookDisplay[]>([]);
  const [ activeFeaturedBook, setActiveFeaturedBook ] = useState<HeroBookDisplay | null>(null);

  const [ newArrivals, setNewArrivals ] = useState<Book[]>([]);
  const [ recommendedBooks, setRecommendedBooks ] = useState<Book[]>([]);

  const [ loadingHero, setLoadingHero ] = useState(true);
  const [ loadingNewArrivals, setLoadingNewArrivals ] = useState(true);
  const [ loadingPopular, setLoadingPopular ] = useState(true);

  const fallbackHeroBook: HeroBookDisplay = {
    id: 0,
    title: "CHASING NEW HORIZONS",
    author: "Alan Stern & David Grinspoon",
    description: "The book tells a story of a space probe to Pluto, that was proposed by the author, Alan Stern, in the early 1990s. This epic mission has revealed a new world of geological and atmospheric complexity.",
    price: 19.00,
    imageUrl: Images.bookImg?.src || "/default-book-cover.jpg",
  };

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      setLoadingHero(true);
      let fetchedHeroBooks: HeroBookDisplay[] = [];
      try {
        let response = await getBooks({ is_featured: true, limit: 5, sortBy: 'sold', sortOrder: 'desc' });
        if (response && response.data) {
          fetchedHeroBooks = response.data.map(mapApiBookToDisplayBook);
        }

        if (fetchedHeroBooks.length < 5) {
          const needed = 5 - fetchedHeroBooks.length;
          response = await getBooks({ limit: needed, sortBy: 'sold', sortOrder: 'desc' });
          if (response && response.data) {
            response.data.forEach(book => {
              if (fetchedHeroBooks.length < 5 && !fetchedHeroBooks.find(fb => fb.id === book.id)) {
                fetchedHeroBooks.push(mapApiBookToDisplayBook(book));
              }
            });
          }
        }

        if (fetchedHeroBooks.length < 5) {
          const needed = 5 - fetchedHeroBooks.length;
          const recentResponse = await getBooks({ limit: needed, sortBy: 'id', sortOrder: 'desc' });
          if (recentResponse && recentResponse.data) {
            recentResponse.data.forEach(book => {
              if (fetchedHeroBooks.length < 5 && !fetchedHeroBooks.find(fb => fb.id === book.id)) {
                fetchedHeroBooks.push(mapApiBookToDisplayBook(book));
              }
            });
          }
        }

        setFeaturedBooksList(fetchedHeroBooks.slice(0, 5));
        if (fetchedHeroBooks.length > 0) {
          setActiveFeaturedBook(fetchedHeroBooks[ 0 ]);
        } else {
          setActiveFeaturedBook(fallbackHeroBook);
        }
      } catch (error) {
        console.error("Error fetching featured books:", error);
        message.error("Lỗi khi tải sách nổi bật. Hiển thị dữ liệu mẫu.");
        setActiveFeaturedBook(fallbackHeroBook);
        setFeaturedBooksList([]);
      } finally {
        setLoadingHero(false);
      }
    };
    fetchFeaturedBooks();
  }, []);

  useEffect(() => {
    const fetchOtherSections = async () => {
      setLoadingNewArrivals(true);
      setLoadingPopular(true);
      try {
        const arrivalsResponse = await getBooks({ limit: 4, sortBy: 'publish_year', sortOrder: 'desc' });
        if (arrivalsResponse && arrivalsResponse.data) {
          setNewArrivals(arrivalsResponse.data.map(mapApiBookToBookItemType));
        }

        const popularResponse = await getBooks({ limit: 4, sortBy: 'sold', sortOrder: 'desc' });
        if (popularResponse && popularResponse.data) {
          setRecommendedBooks(popularResponse.data.map(mapApiBookToBookItemType));
        }
      } catch (error) {
        console.error("Error fetching new arrivals or popular collections:", error);
        message.error("Lỗi khi tải sách cho các mục khác.");
      } finally {
        setLoadingNewArrivals(false);
        setLoadingPopular(false);
      }
    };
    fetchOtherSections();
  }, []);


  const handleFeaturedBookClick = (book: HeroBookDisplay) => {
    setActiveFeaturedBook(book);
  };

  return (
    <Suspense fallback={
      <div className="h-screen w-screen flex justify-center items-center">
        <Spin size="large" tip="Đang tải trang..." />
      </div>
    }>
      <div className="w-full bg-[#ececec] sm:pt-5 pt-0 pb-20">
        {/* Hero Section */ }
        <div className="max-w-[1440px] mx-auto bg-gray-200 rounded-xl overflow-hidden">
          <div className="bg-[#0B3D9180] text-white py-20 sm:py-32 px-7">
            <div className="max-w-[1440px] mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Unlock a World of <span className="text-[#0B3D91] px-2">Creativity</span>
              </h1>
              <p className="text-lg sm:text-xl mb-8">
                Discover a creative world through books! We offer a vast collection to suit every taste,
                along with special offers just for you.
              </p>
            </div>
          </div>

          <div className="mx-auto sm:p-6 p-3 bg-[#0B3D91] text-white">
            { loadingHero ? (
              <div className="h-[300px] flex justify-center items-center">
                <Spin size="large" tip={ t("Đang tải sách nổi bật...") as string } />
              </div>
            ) : (
              activeFeaturedBook && (
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between min-h-[300px]">
                  <div className="w-full md:w-[40%] sm:pl-4 md:pl-10 pl-0 mb-6 md:mb-0 order-2 md:order-1">
                    <h2 className="sm:text-3xl text-xl font-bold text-left mb-1">
                      { activeFeaturedBook.title }
                    </h2>
                    <p className="text-left mb-3 sm:text-md text-sm opacity-80">
                      { t("By") } { activeFeaturedBook.author }
                    </p>
                    <p className="mb-5 sm:text-base text-sm text-justify h-28 md:h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent pr-2">
                      { activeFeaturedBook.description }
                    </p>
                    <div className="flex sm:space-x-4 space-x-2 items-center">
                      <Link href={ `/book/${activeFeaturedBook.id}` } passHref>
                        <AntButton type="default" ghost size="large">
                          { t("See more") }
                        </AntButton>
                      </Link>
                      <div className="flex flex-row items-center">
                        <span className="bg-white py-2 px-4 text-black rounded-l-lg shadow-lg text-md font-semibold">
                          ${ activeFeaturedBook.price.toFixed(2) }
                        </span>
                        <Link href={ `/book/${activeFeaturedBook.id}?action=buy` } passHref>
                          <AntButton type="primary" size="large" className="rounded-l-none">
                            { t("Buy now") }
                          </AntButton>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-[55%] relative flex justify-center items-start flex-nowrap space-x-[-30px] md:space-x-[-50px] order-1 md:order-2 mb-8 md:mb-0 py-4">
                    { featuredBooksList.map((book, index) => {
                      const isActive = activeFeaturedBook?.id === book.id;

                      let bookItemClasses = `
                        relative
                        cursor-pointer transition-all duration-300 ease-out transform-gpu
                        w-[100px] h-[150px] sm:w-[120px] sm:h-[180px] md:w-[140px] md:h-[210px] lg:w-[150px] lg:h-[225px]
                        rounded-md
                      `;

                      if (isActive) {
                        bookItemClasses += ' scale-110 shadow-2xl ring-4 ring-white ring-offset-2 ring-offset-[#0B3D91] z-50';
                      } else {
                        bookItemClasses += ' scale-90 hover:scale-100 opacity-70 hover:opacity-100 shadow-lg hover:z-40';
                      }

                      return (
                        <div
                          key={ book.id || index }
                          title={ book.title }
                          className={ bookItemClasses }
                          style={ {
                            zIndex: index + 10,
                          } }
                          onClick={ () => handleFeaturedBookClick(book) }
                        >
                          <Image
                            src={ book.imageUrl }
                            alt={ book.title }
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                            priority={ index < 3 }
                          />
                        </div>
                      );
                    }) }
                    { featuredBooksList.length === 0 && !loadingHero && (
                      <p className="text-center w-full text-gray-400">Không tìm thấy sách nổi bật.</p>
                    ) }
                  </div>
                </div>
              )
            ) }
          </div>
        </div>

        {/* Popular Categories Section */ }
        <div className="max-w-[1440px] mx-auto px-7 py-10">
          <p className="text-2xl font-bold text-[#0b3d91] mb-6">
            { t("Popular Categories") }
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            <CategoryItem iconSrc={ Images.fictionIcon } label="Fiction" />
            <CategoryItem iconSrc={ Images.astronautIcon } label="Astronaut" />
            <CategoryItem iconSrc={ Images.historyIcon } label="History" />
            <CategoryItem iconSrc={ Images.mysteryIcon } label="Mystery" />
            <CategoryItem iconSrc={ Images.scienceIcon } label="Science" />
            <CategoryItem iconSrc={ Images.educationIcon } label="Education" />
          </div>
        </div>

        {/* New Arrival Section */ }
        <div className="max-w-[1440px] mx-auto px-7 py-10">
          <h2 className="text-2xl font-bold text-[#0b3d91] mb-6">
            { t("New Arrival") }
          </h2>
          { loadingNewArrivals ? (
            <div className="text-center py-10"><Spin tip={ t("Đang tải sách mới...") as string } /></div>
          ) : newArrivals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              { newArrivals.map((book) => (
                <BookItem key={ book.id } book={ book } />
              )) }
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">{ t("Chưa có sách mới.") }</div>
          ) }
        </div>

        {/* Big Spring Sales Section */ }
        <div className="relative bg-white p-6 sm:p-10 mb-10 max-w-[1440px] mx-auto rounded-xl shadow-xl overflow-hidden">
          <Image
            src={ Images.banner }
            alt="big-spring-sales"
            layout="responsive"
            width={ 1440 }
            height={ 450 }
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Popular Collection Section */ }
        <div className="max-w-[1440px] mx-auto px-7 py-10">
          <h2 className="text-2xl font-bold text-[#0b3d91] mb-6">
            { t("Popular Collections") }
          </h2>
          { loadingPopular ? (
            <div className="text-center py-10"><Spin tip={ t("Đang tải bộ sưu tập...") as string } /></div>
          ) : recommendedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              { recommendedBooks.map((book) => (
                <BookItem key={ book.id } book={ book } />
              )) }
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">{ t("Chưa có bộ sưu tập nổi bật.") }</div>
          ) }
        </div>
      </div>
    </Suspense>
  );
}

// CategoryItem Component
const CategoryItem: React.FC<{ iconSrc: string | StaticImageData; label: string }> = ({ iconSrc, label }) => {
  const { t } = useTranslation("common");
  return (
    <Link href={ `/category/${label.toLowerCase()}` } passHref>
      <div className="flex flex-col items-center justify-center p-4 h-36 bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center group">
        <Image src={ iconSrc } alt={ `${label} Icon` } width={ 48 } height={ 48 } className="mb-3 group-hover:scale-110 transition-transform duration-300" />
        <p className="text-sm font-semibold text-gray-700 group-hover:text-[#0b3d91] transition-colors duration-300">{ t(label) }</p>
      </div>
    </Link>
  );
};

export default Home;
