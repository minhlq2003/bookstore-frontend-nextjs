import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <div>
      <h2>{t("Footer")}</h2>
    </div>
  );
};

export default Footer;
