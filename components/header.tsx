import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation("common");
  return (
    <div>
      <h2>{t("Header")}</h2>
    </div>
  );
};

export default Header;
