"use client";

import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function MapPage() {
    return (
        <LazyMap />
    );
  }
