import Link from "next/link";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation("common");
  return (
    <div>
      <h2>{t("Side bar")}</h2>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
