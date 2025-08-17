import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// Fetch specific logo by title
async function getLogo() {
  const query = `*[_type == "logo" && title == "nina-musholt-white_Back_Logo"][0]{
    title,
    image
  }`;
  return client.fetch(query);
}

export default async function Header() {
  const logo = await getLogo();

  return (
    <header className="flex flex-col items-center p-0    shadow bg-white sticky top-0 z-50">
      {/* Logo */}
      {logo?.image && (
        <Link href="/">
          <img
            src={urlFor(logo.image).width(1200).url()}
            alt={logo.title || "Logo"}
            width={1000}
            height={500}
          />
        </Link>
      )}
      {/* Navigation */}
    <nav className="flex flex-col sm:flex-row items-center p-4 gap-4 sm:gap-10 text-base sm:text-lg font-medium">
      {/*<Link href="/" className="hover:text-blue-600">Home</Link> */}
      {/*<Link href="/gallery" className="hover:text-blue-600">Gallery</Link> */}{/* NEW */}
      <Link href="/about" className="hover:text-blue-600">About Me</Link>
      <Link href="/contact" className="hover:text-blue-600">Contact Me</Link>
    </nav>
    </header>
  );
}