// app/page.tsx
"use client";

import { useTranslation } from "next-i18next";
import { Suspense } from "react";

function Home() {
  const { t } = useTranslation("common");

  return (
    <Suspense>
      <div>
        <h1>{t("welcome")}</h1>
        <p>{t("language")}</p>
      </div>
    </Suspense>
  );
}

export default Home;
