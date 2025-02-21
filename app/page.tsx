"use client";

import dynamic from "next/dynamic";

const ResultsPage = dynamic(() => import("../page"), { ssr: false });

export default function SyntheticV0PageForDeployment() {
  return <ResultsPage />;
}
