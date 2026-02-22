"use client";

import { getPreview } from "@/blog_components/config/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// ─── Sample / default props ───────────────────────────────────────────────────
const DEFAULT_BLOG = {
  heading:
    "The Impact of Technology on the Workplace: How Technology is Changing",
  subHeading:
    "Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime.",
  coverImage: "/images/cover.jpg", // replace with your image path / URL
  mainImage: "/images/main.jpg", // replace with your image path / URL
  content: `<p>Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. However, traveling can also be stressful and overwhelming, especially if you don't plan and prepare adequately. In this blog article, we'll explore tips and tricks for a memorable journey and how to make the most of your travels.</p>
<p>One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.</p>
<h2>Research Your Destination</h2>
<p>Before embarking on your journey, take the time to research your destination. This includes understanding the local culture, customs, and laws, as well as identifying top attractions, restaurants, and accommodations. Doing so will help you navigate your destination with confidence and avoid any cultural faux pas.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hendrerit gravida rutrum quisque non tellus orci ac auctor.</p>
<h2>Conclusion:</h2>
<p>Traveling is an art form that requires a blend of planning, preparation, and spontaneity. By following these tips and tricks, you can make the most of your journey and create memories that last a lifetime. So pack your bags, embrace the adventure, and enjoy the ride.</p>`,
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="relative flex items-center justify-center w-8 h-8">
            <span className="absolute w-5 h-5 rounded-full bg-pink-500 opacity-80 -translate-x-1 -translate-y-1" />
            <span className="absolute w-5 h-5 rounded-full bg-purple-500 opacity-70 translate-x-1 -translate-y-1" />
            <span className="absolute w-5 h-5 rounded-full bg-orange-400 opacity-60 translate-y-1" />
          </span>
          <span className="font-black text-lg tracking-widest text-gray-900">
            SHAI
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {["Home", "Our Services", "Blogs", "About Us"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="#"
          className="hidden md:flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
        >
          CONTACT US
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7h10M8 3l4 4-4 4"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="relative flex items-center justify-center w-8 h-8">
              <span className="absolute w-5 h-5 rounded-full bg-pink-500 opacity-80 -translate-x-1 -translate-y-1" />
              <span className="absolute w-5 h-5 rounded-full bg-purple-500 opacity-70 translate-x-1 -translate-y-1" />
              <span className="absolute w-5 h-5 rounded-full bg-orange-400 opacity-60 translate-y-1" />
            </span>
            <span className="font-black text-lg tracking-widest text-gray-900">
              SHAI
            </span>
          </Link>
          <div className="flex gap-3">
            {/* Instagram */}
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-pink-500 hover:text-pink-500 text-gray-500 transition-colors"
            >
              <svg
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10A5 5 0 0112 7zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-.88a.88.88 0 110 1.76.88.88 0 010-1.76z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-blue-600 hover:text-blue-600 text-gray-500 transition-colors"
            >
              <svg
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.02 8.5H5V24H.02V8.5zm7.98 0h4.77v2.13h.07c.66-1.26 2.28-2.58 4.7-2.58C22.45 8.05 24 11.2 24 16.13V24h-4.98v-7.05c0-1.68-.03-3.84-2.34-3.84-2.34 0-2.7 1.83-2.7 3.72V24H8V8.5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-gray-900">Company</h4>
          {["About Us", "Blogs"].map((l) => (
            <Link
              key={l}
              href="#"
              className="text-sm text-pink-500 hover:text-pink-700 transition-colors"
            >
              {l}
            </Link>
          ))}
        </div>

        {/* Our Services */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-gray-900">Our Services</h4>
          {[
            "Physician Services",
            "Hospital Services",
            "Value-Based Care Services",
            "Payer Services",
            "Clinical Services",
          ].map((l) => (
            <Link
              key={l}
              href="#"
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              {l}
            </Link>
          ))}
        </div>

        {/* Careers / Business */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-gray-900">Careers</h4>
            <a href="mailto:hr@shai.health" className="text-sm text-gray-500">
              hr@shai.health
            </a>
            <span className="text-sm text-gray-500 flex gap-1 items-center">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                <path
                  d="M3 5h18v14H3V5zm0 0l9 8 9-8"
                  stroke="#6b7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              +91 78457 77499
            </span>
            <span className="text-sm text-gray-500">+91 44 2454 0122</span>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-gray-900">Business</h4>
            <a href="mailto:bd@shai.health" className="text-sm text-gray-500">
              bd@shai.health
            </a>
            <span className="text-sm text-gray-500">+1 (321)-220-3804</span>
            <span className="text-sm text-gray-500">+1 (561) 771-2005</span>
          </div>
        </div>

        {/* Offices */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-bold text-gray-900">USA Office</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              📍 SHAI Global Analytics Inc. 5851 Legacy Circle, Suite 6059 (6th
              Floor), Plano, Tx 75024.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-bold text-gray-900">India Office</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              📍 Synthesis Healthcare (SHAI), Fayola Towers: #56/3A, 3rd Floor;
              200 Ft. Radial Rd, Palikaranai, Chennai 600100.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-4">
        <p className="text-center text-xs text-gray-400">
          © Copyright 2025 SHAI Global Analytics, Inc. All rights reserved
        </p>
      </div>
    </footer>
  );
}

// ─── Blog Content Renderer ────────────────────────────────────────────────────
// Renders the Quill HTML output with proper Tailwind prose styling
function BlogContentRenderer({ html }) {
  return (
    <div
      className="
        prose prose-gray max-w-none
        prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mt-8 prose-headings:mb-3
        prose-h2:text-xl
        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-800
        prose-ul:text-gray-600 prose-ol:text-gray-600
        prose-img:rounded-xl text-black
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ─── Main PreviewBlog Component ───────────────────────────────────────────────
export default function PreviewBlog({}) {
  const [blogContent, setBlogContent] = useState({
    heading: DEFAULT_BLOG.heading,
    subHeading: DEFAULT_BLOG.subHeading,
    coverImage: DEFAULT_BLOG.coverImage,
    mainImage: DEFAULT_BLOG.mainImage,
    content: DEFAULT_BLOG.content,
  });

  useEffect(() => {
    // Set Intervals
    const interval = setInterval(() => {
      const blog = getPreview();
      setBlogContent((state) => {
        return {
          ...state,
          ...blog,
        };
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-14">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
          {blogContent.heading}
        </h1>

        {/* Sub Heading */}
        {blogContent.subHeading && (
          <p className="text-base text-gray-500 leading-relaxed mb-8 border-l-4 border-pink-400 pl-4">
            {blogContent.subHeading}
          </p>
        )}

        {/* Main Image — rendered inline if present but not already in content */}
        {blogContent.mainImage && (
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden my-10 shadow-md">
            <Image
              src={blogContent.mainImage}
              alt="Blog main visual"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Cover Image
        {coverImage && (
          <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-10 shadow-md">
            <Image
              src={coverImage}
              alt={heading}
              fill
              className="object-cover"
              priority
            />
          </div>
        )} */}

        {/* Rich Blog Content (from Quill) */}
        <BlogContentRenderer html={blogContent.content} />
      </main>

      <Footer />
    </div>
  );
}

/*
─── USAGE ────────────────────────────────────────────────────────────────────
 
  import PreviewBlog from "@/components/PreviewBlog";

  // Pass props from your API / state:
  <PreviewBlog
    heading={blog.heading}
    subHeading={blog.subHeading}
    coverImage={blog.coverImageUrl}
    mainImage={blog.mainImageUrl}
    content={blog.content}          // raw HTML string from Quill
  />

  Required tailwind plugins in tailwind.config.js:
  plugins: [require("@tailwindcss/typography")],

  Install:
  npm install @tailwindcss/typography
*/
