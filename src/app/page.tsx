import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold text-center">Welcome to the Lab</h1>
      <ul className="flex flex-wrap justify-center gap-4">
        <Link href="/hamburgermenu">Hamburger Menu</Link>
      </ul>
    </main>
  );
}
