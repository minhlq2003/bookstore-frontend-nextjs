import localFont from "next/font/local"

export const MerriweatherFont = localFont({
  src: [
    {
      path: "../../public/fonts/Merriweather-Thin.ttf",
      weight: "100",
      style: "light",
    },
    {
      path: "../../public/fonts/Merriweather-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Merriweather-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Merriweather-Medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../../public/fonts/Merriweather-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../public/fonts/Merriweather-Black.ttf",
      weight: "900",
      style: "black",
    },
    {
      path: "../../public/fonts/Merriweather-Italic.ttf",
      weight: "400",
      style: "italic",
    }
  ],
  display: 'swap',
})
