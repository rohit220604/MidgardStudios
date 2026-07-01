import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Gallery",
};

export default function MyGalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
