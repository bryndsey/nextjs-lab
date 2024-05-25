import Link from "next/link";

export default function ExperiementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Link href="/">Home</Link>
      {children}
    </>
  );
}
