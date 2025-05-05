"use client";
import { BookDetails } from "@/constant/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslation } from "next-i18next";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import BookItem from "@/components/book-item";

const Page = () => {
  const { t } = useTranslation("common");
  const [quantity, setQuantity] = useState(1);

  const books: BookDetails[] = [
    {
      id: 1,
      title: "CHASING NEW HORIZONS",
      subTitle: "Inside the Epic First Mission to Pluto",
      price: 25.0,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/655f/c8c0/309c950754d34dae6569f2f7cdd56c8e?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=G2bllpJ2iOZpmP1FPY-wVKixum3gNTJ2DxPb6Y-ODtv2EXnLc-eWxJ2bofLr-mi7KSGC3o-QWcVghIqRCd4i71Nwp6Hp~WBt9ummne0N31TB0lf4nLQlZy3p4maLN3dINZtiDcvtcpckoDzIQwfCIIDOwWbA5cCV25EppdpKZcX~1ZjgTQBweRy87psNsxarFFrUIDbi~7Yi24RJ0VRkyhSZmnj48wD~JOdKItCWERacpW3wqJlpk0BrPMPIio1suC459-ZU~mIN7nt91CGXtGk3YG7FNxiwwpSuWvYtc3vNlLnugYFtsS4c~FE9X5dHcMlUpH7CesPQoGHEI5jSJg__",
      author: "Alan Stern",
      rating: 4.5,
      discount: 20.0,
      genre: "Science, Astronautv",
      publisher: "Picador",
      publishedDate: "May 1, 2018",
      weight: 1.1,
      size: "5.5 x 1 x 8.2 inches",
      pages: 320,
      description:
        "Chasing New Horizons tells the captivating story of NASA's New Horizons mission—the first spacecraft to explore Pluto—and the relentless pursuit of discovery that brought it to life. Authored by Alan Stern, the mission's principal investigator, and David Grinspoon, an award-winning astrobiologist, this book takes readers behind the scenes of one of the most daring and groundbreaking space missions in history." +
        "The narrative unfolds over decades of vision, determination, and ingenuity, as a team of scientists and engineers overcame immense technical, political, and financial hurdles to accomplish what once seemed impossible. From New Horizons' launch in 2006 to its dramatic flyby of Pluto in 2015, the book captures the exhilaration of discovery, the tension of high-stakes science, and the profound impact of viewing a distant world up close for the first time." +
        "Rich with stunning images of Pluto and its moons, 'Chasing New Horizons' is more than just a chronicle of a mission—it’s an inspiring testament to human curiosity and the drive to explore the unknown.",
      sold: 100,
      storage: 50,
    },
    {
      id: 2,
      title: "CHASING NEW HORIZONS",
      subTitle: "Inside the Epic First Mission to Pluto",
      price: 25.0,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/655f/c8c0/309c950754d34dae6569f2f7cdd56c8e?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=G2bllpJ2iOZpmP1FPY-wVKixum3gNTJ2DxPb6Y-ODtv2EXnLc-eWxJ2bofLr-mi7KSGC3o-QWcVghIqRCd4i71Nwp6Hp~WBt9ummne0N31TB0lf4nLQlZy3p4maLN3dINZtiDcvtcpckoDzIQwfCIIDOwWbA5cCV25EppdpKZcX~1ZjgTQBweRy87psNsxarFFrUIDbi~7Yi24RJ0VRkyhSZmnj48wD~JOdKItCWERacpW3wqJlpk0BrPMPIio1suC459-ZU~mIN7nt91CGXtGk3YG7FNxiwwpSuWvYtc3vNlLnugYFtsS4c~FE9X5dHcMlUpH7CesPQoGHEI5jSJg__",
      author: "Alan Stern",
      rating: 4.5,
      discount: 20.0,
      genre: "Science, Astronautv",
      publisher: "Picador",
      publishedDate: "May 1, 2018",
      weight: 1.1,
      size: "5.5 x 1 x 8.2 inches",
      pages: 320,
      description:
        "Chasing New Horizons tells the captivating story of NASA's New Horizons mission—the first spacecraft to explore Pluto—and the relentless pursuit of discovery that brought it to life. Authored by Alan Stern, the mission's principal investigator, and David Grinspoon, an award-winning astrobiologist, this book takes readers behind the scenes of one of the most daring and groundbreaking space missions in history." +
        "The narrative unfolds over decades of vision, determination, and ingenuity, as a team of scientists and engineers overcame immense technical, political, and financial hurdles to accomplish what once seemed impossible. From New Horizons' launch in 2006 to its dramatic flyby of Pluto in 2015, the book captures the exhilaration of discovery, the tension of high-stakes science, and the profound impact of viewing a distant world up close for the first time." +
        "Rich with stunning images of Pluto and its moons, 'Chasing New Horizons' is more than just a chronicle of a mission—it’s an inspiring testament to human curiosity and the drive to explore the unknown.",
      sold: 100,
      storage: 50,
    },
    {
      id: 3,
      title: "CHASING NEW HORIZONS",
      subTitle: "Inside the Epic First Mission to Pluto",
      price: 25.0,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/655f/c8c0/309c950754d34dae6569f2f7cdd56c8e?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=G2bllpJ2iOZpmP1FPY-wVKixum3gNTJ2DxPb6Y-ODtv2EXnLc-eWxJ2bofLr-mi7KSGC3o-QWcVghIqRCd4i71Nwp6Hp~WBt9ummne0N31TB0lf4nLQlZy3p4maLN3dINZtiDcvtcpckoDzIQwfCIIDOwWbA5cCV25EppdpKZcX~1ZjgTQBweRy87psNsxarFFrUIDbi~7Yi24RJ0VRkyhSZmnj48wD~JOdKItCWERacpW3wqJlpk0BrPMPIio1suC459-ZU~mIN7nt91CGXtGk3YG7FNxiwwpSuWvYtc3vNlLnugYFtsS4c~FE9X5dHcMlUpH7CesPQoGHEI5jSJg__",
      author: "Alan Stern",
      rating: 4.5,
      discount: 20.0,
      genre: "Science, Astronautv",
      publisher: "Picador",
      publishedDate: "May 1, 2018",
      weight: 1.1,
      size: "5.5 x 1 x 8.2 inches",
      pages: 320,
      description:
        "Chasing New Horizons tells the captivating story of NASA's New Horizons mission—the first spacecraft to explore Pluto—and the relentless pursuit of discovery that brought it to life. Authored by Alan Stern, the mission's principal investigator, and David Grinspoon, an award-winning astrobiologist, this book takes readers behind the scenes of one of the most daring and groundbreaking space missions in history." +
        "The narrative unfolds over decades of vision, determination, and ingenuity, as a team of scientists and engineers overcame immense technical, political, and financial hurdles to accomplish what once seemed impossible. From New Horizons' launch in 2006 to its dramatic flyby of Pluto in 2015, the book captures the exhilaration of discovery, the tension of high-stakes science, and the profound impact of viewing a distant world up close for the first time." +
        "Rich with stunning images of Pluto and its moons, 'Chasing New Horizons' is more than just a chronicle of a mission—it’s an inspiring testament to human curiosity and the drive to explore the unknown.",
      sold: 100,
      storage: 50,
    },
    {
      id: 4,
      title: "CHASING NEW HORIZONS",
      subTitle: "Inside the Epic First Mission to Pluto",
      price: 25.0,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/655f/c8c0/309c950754d34dae6569f2f7cdd56c8e?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=G2bllpJ2iOZpmP1FPY-wVKixum3gNTJ2DxPb6Y-ODtv2EXnLc-eWxJ2bofLr-mi7KSGC3o-QWcVghIqRCd4i71Nwp6Hp~WBt9ummne0N31TB0lf4nLQlZy3p4maLN3dINZtiDcvtcpckoDzIQwfCIIDOwWbA5cCV25EppdpKZcX~1ZjgTQBweRy87psNsxarFFrUIDbi~7Yi24RJ0VRkyhSZmnj48wD~JOdKItCWERacpW3wqJlpk0BrPMPIio1suC459-ZU~mIN7nt91CGXtGk3YG7FNxiwwpSuWvYtc3vNlLnugYFtsS4c~FE9X5dHcMlUpH7CesPQoGHEI5jSJg__",
      author: "Alan Stern",
      rating: 4.5,
      discount: 20.0,
      genre: "Science, Astronautv",
      publisher: "Picador",
      publishedDate: "May 1, 2018",
      weight: 1.1,
      size: "5.5 x 1 x 8.2 inches",
      pages: 320,
      description:
        "Chasing New Horizons tells the captivating story of NASA's New Horizons mission—the first spacecraft to explore Pluto—and the relentless pursuit of discovery that brought it to life. Authored by Alan Stern, the mission's principal investigator, and David Grinspoon, an award-winning astrobiologist, this book takes readers behind the scenes of one of the most daring and groundbreaking space missions in history." +
        "The narrative unfolds over decades of vision, determination, and ingenuity, as a team of scientists and engineers overcame immense technical, political, and financial hurdles to accomplish what once seemed impossible. From New Horizons' launch in 2006 to its dramatic flyby of Pluto in 2015, the book captures the exhilaration of discovery, the tension of high-stakes science, and the profound impact of viewing a distant world up close for the first time." +
        "Rich with stunning images of Pluto and its moons, 'Chasing New Horizons' is more than just a chronicle of a mission—it’s an inspiring testament to human curiosity and the drive to explore the unknown.",
      sold: 100,
      storage: 50,
    },
  ];

  const { id } = useParams();

  const book = books.find((book) => book.id === Number(id));
  const firstGenre = book?.genre.split(",")[0];

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto bg-[#ECECEC] font-merriweather">
      <div className="hidden md:block text-black px-7 pt-5">
        <Breadcrumbs
          itemClasses={{
            item: "text-black data-[current=true]:text-customblue/60",
          }}
        >
          <BreadcrumbItem>{firstGenre}</BreadcrumbItem>
          <BreadcrumbItem>{book?.title}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start md:gap-10 lg:gap-20 md:px-7 py-5">
        <Image
          src={book?.imageUrl || "/default-image.jpg"}
          alt={book?.title || "Book Image"}
          width={100}
          height={100}
          className="w-[200px] h-[300px] lg:w-[300px] lg:h-[400px]"
        />
        <div className="flex flex-col gap-3 lg:gap-5 text-sm md:text-base lg:text-lg md:w-full text-black lg:px-14">
          <div className="flex flex-col items-center justify-center md:flex-row-reverse md:justify-between gap-2">
            <div className="bg-customblue text-white flex items-center justify-center w-[30%] h-6 rounded-lg mt-3 md:mt-0">
              <p>Best seller</p>
            </div>
            <h1 className="text-2xl md:text-3xl">{book?.title}</h1>
          </div>
          <div className="flex gap-5 md:gap-7 lg:gap-12">
            <p>{book?.author} (Author)</p>
            <p>Publisher: {book?.publisher}</p>
          </div>
          <div className="flex">
            <FontAwesomeIcon icon={faStar} className="text-blue size-5" />
            <p className="text-blue">
              {book?.rating} <span>(100 reivews)</span>
            </p>
          </div>
          <p>Genre: {book?.genre}</p>
          <div className="flex gap-5 md:gap-7 lg:gap-12">
            <p>Sold: {book?.sold}</p>
            <p>Storage: {book?.storage}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <p className="text-blue text-base md:text-lg">
                ${book?.price.toFixed(2)}
              </p>
              <p className="-translate-y-0.5 text-gray-500 line-through">
                ${book?.discount?.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faMinus}
                className="bg-gray-400 size-5 md:size-6 rounded p-1"
                onClick={() => decreaseQuantity()}
              />
              <p className=" text-black text-base w-5 text-center">
                {quantity}
              </p>
              <FontAwesomeIcon
                icon={faPlus}
                className="bg-gray-400 size-5 md:size-6 rounded p-1"
                onClick={() => increaseQuantity()}
              />
            </div>
          </div>
          <button className="bg-blue text-white w-full h-7 md:h-9 lg:h-12 rounded-lg">
            Add To Cart
          </button>
        </div>
      </div>
      <div className="px-7">
        <Table
          className="text-black bg-white rounded-xl"
          isStriped
          classNames={{
            th: "md:text-base",
            td: "md:text-base",
          }}
        >
          <TableHeader>
            <TableColumn>{t("Book Details")}</TableColumn>
            <TableColumn>{t("Info")}</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key={1} className="bg-gray-200 rounded-xl">
              <TableCell className="text-black/60 md:text-base">
                {t("Genre")}
              </TableCell>
              <TableCell>{book?.genre}</TableCell>
            </TableRow>
            <TableRow key={2}>
              <TableCell className="text-black/60 md:text-base">
                {t("Author")}
              </TableCell>
              <TableCell>{book?.author}</TableCell>
            </TableRow>
            <TableRow key={3} className="bg-gray-200 rounded-xl">
              <TableCell className="text-black/60 md:text-base">
                {t("Publisher")}
              </TableCell>
              <TableCell>{book?.publisher}</TableCell>
            </TableRow>
            <TableRow key={4}>
              <TableCell className="text-black/60 md:text-base">
                {t("Year")}
              </TableCell>
              <TableCell>
                {book?.publishedDate
                  ? new Date(book.publishedDate).getFullYear()
                  : "N/A"}
              </TableCell>
            </TableRow>
            <TableRow key={5} className="bg-gray-200 rounded-xl">
              <TableCell className="text-black/60 md:text-base">
                {t("Weight")}(gr)
              </TableCell>
              <TableCell>{book?.weight}</TableCell>
            </TableRow>
            <TableRow key={6}>
              <TableCell className="text-black/60 md:text-base">
                {t("Size")}
              </TableCell>
              <TableCell>{book?.size}</TableCell>
            </TableRow>
            <TableRow key={7} className="bg-gray-200 rounded-full">
              <TableCell className="text-black/60 md:text-base">
                {t("Pages")}
              </TableCell>
              <TableCell>{book?.pages}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className=" text-black bg-white mx-7 mt-7 p-3 md:p-5 rounded-xl">
        <p className="font-medium text-lg md:text-xl lg:text-2xl pb-2">
          {t("Description")}
        </p>
        <p className="text-justify text-sm md:text-base text-black/80">
          {book?.description}
        </p>
      </div>
      <p className="text-lg md:text-xl lg:text-2xl text-blue py-2 md:py-5 px-7 font-bold">
        {t("Relevant Books")}
      </p>
      <div className="flex overflow-x-auto px-7 gap-5 pb-5">
        {books.map((book) => (
          <div key={book.id}>
            <BookItem book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
