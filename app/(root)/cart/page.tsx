import { BookDetails } from "@/constant/types";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

const page = () => {
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
    {
      id: 5,
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
      id: 6,
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
  return (
    <div className="max-w-[1200px] mx-auto h-screen py-10 md:py-20 lg:py-24 bg-white">
      <h1 className=" text-center text-base md:text-xl lg:text-3xl py-3 text-darkblue font-bold uppercase">
        Cart
      </h1>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
        <div className="border rounded-lg p-4 shadow-md w-full bg-white max-h-[300px] lg:max-h-[550px] overflow-y-auto">
          <div className="flex items-center justify-between border-b pb-2 font-semibold text-xs lg:text-base">
            <div className="flex items-center gap-2">
              <input type="radio" name="select-all" />
              <span>All</span>
            </div>
            <span>Title</span>
            <span>Quantity</span>
            <span>Total</span>
            <span>{""}</span>
          </div>
          {books.map((item: BookDetails) => (
            <div key={item.id} className="flex flex-col gap-2">
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4 text-xs lg:text-base">
                  <input type="radio" />
                  <Image
                    src={item.imageUrl}
                    alt="Book"
                    width={100}
                    height={100}
                    className="w-12 h-16 object-cover"
                  />
                  <div className="w-[40px] lg:w-[140px]">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-customblue">${item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-1 md:px-2 md:py-1 border rounded">−</button>
                  <span>1</span>
                  <button className="px-1 md:px-2 md:py-1 border rounded">+</button>
                </div>

                <p className="text-blue-600">${item.price}</p>
                <FontAwesomeIcon icon={faRemove} className="size-5" />
                
              </div>
              <hr className="my-3 border border-black w-full" />
            </div>
          ))}
        </div>
        <div className="py-3 mt-10 md:mt-0 md:mx-3 md:mr-3 px-5 text-black rounded md:w-[40%] bg-white border shadow-md">
          <div className="mt-3 flex flex-col gap-1">
            <div className="flex justify-between text-xs lg:text-base">
              <span>Subtotal:</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-xs lg:text-base">
              <span>Transfer Fee:</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg lg:text-xl my-2">
              <span>Total:</span>
              <span className="text-darkblue">$0.00</span>
            </div>
          </div>
          <button className="bg-blue text-white w-full h-7 md:h-9 lg:h-12 rounded-lg">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
