"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
// import BlogTopBar from "@/components/BlogTopBar";
// import BlogSideBar from "@/components/BlogSideBar";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import BlogTopBar from "@/blog_components/BlogTopBar";
import BlogSideBar from "@/blog_components/BlogSideBar";
import BlogAppLayout from "@/blog_components/BlogAppLayout";

const quillModules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ script: "sub" }, { script: "super" }],
    ["link", "image"],
    ["clean"],
  ],
};

const quillFormats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "script",
  "link",
  "image",
];

export default function NewBlogPage() {
  const [blogData, setBlogData] = useState({
    heading: "",
    subHeading: "",
    coverImage: null,
    mainImage: null,
    content: "",
  });

  const coverRef = useRef(null);
  const mainRef = useRef(null);

  const handleFileChange = (field) => (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData((prev) => ({ ...prev, [field]: file }));
    }
  };

  const handleSave = () => {
    console.log("Saving blog:", blogData);
  };

  const handlePreview = () => {
    console.log("Previewing blog:", blogData);
  };

  return (
    <BlogAppLayout>
      {/* Sub Header */}
      <div className="flex items-center justify-between py-4 border-b border-[#e8e8e8] mb-6">
        <div className="flex items-center gap-2.5">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="2" width="6" height="7" rx="1" fill="#555" />
            <rect x="2" y="13" width="16" height="1.5" rx="0.75" fill="#555" />
            <rect x="2" y="16" width="12" height="1.5" rx="0.75" fill="#555" />
            <rect x="10" y="2" width="8" height="7" rx="1" fill="#ccc" />
          </svg>
          <h1 className="text-[17px] font-semibold">New Create Blog</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Schedule */}
          <button
            onClick={handlePreview}
            className="flex items-center gap-2 px-6 py-[9px]
      bg-white text-[#e91e8c] text-sm font-semibold
      border-2 border-[#e91e8c] rounded-full
      transition hover:bg-[#fce4f3] hover:-translate-y-[1px]"
          >
            {/* Calendar Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="5"
                width="18"
                height="16"
                rx="2"
                stroke="#E91E8C"
                strokeWidth="2"
              />
              <path
                d="M16 3v4M8 3v4M3 10h18"
                strokeLinecap="round"
                stroke="#E91E8C"
                strokeWidth="2"
              />
            </svg>
            Schedule
          </button>

          {/* Save as Draft */}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-[9px] 
      bg-gradient-to-br from-[#e91e8c] to-[#c2185b]
      text-white text-sm font-semibold
      rounded-full transition hover:opacity-90 hover:-translate-y-[1px]"
          >
            {/* Document Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M14 3v6h6"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            Save as draft
          </button>

          {/* Make Live */}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-[9px] 
      bg-gradient-to-br from-[#e91e8c] to-[#c2185b]
      text-white text-sm font-semibold
      rounded-full transition hover:opacity-90 hover:-translate-y-[1px]"
          >
            {/* Rocket Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 13l7-7 6 6-7 7H4v-6z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="14.5" cy="9.5" r="1.5" fill="white" />
            </svg>
            Make Live
          </button>

          {/* Preview */}
          <button
            onClick={handlePreview}
            className="flex items-center gap-2 px-6 py-[9px]
      bg-white text-[#e91e8c] text-sm font-semibold
      border-2 border-[#e91e8c] rounded-full
      transition hover:bg-[#fce4f3] hover:-translate-y-[1px]"
          >
            {/* Eye Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                stroke="#E91E8C"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="3" stroke="#E91E8C" strokeWidth="2" />
            </svg>
            Preview
          </button>
        </div>
      </div>

      {/* Blog Content Details Card */}
      <div className="bg-[#f9fbdc] rounded-xl p-6 mb-8">
        <h2 className="text-[16px] font-bold underline mb-5">
          Blog Content Details
        </h2>

        {/* Heading */}
        <div className="mb-4">
          <label className="block text-[13px] font-medium text-[#444] mb-1.5">
            Blog Heading
          </label>
          <input
            type="text"
            placeholder="Enter a blog heading"
            value={blogData.heading}
            onChange={(e) =>
              setBlogData((prev) => ({
                ...prev,
                heading: e.target.value,
              }))
            }
            className="w-full px-3.5 py-2.5 text-sm
            border border-[#ddd] rounded-lg
            bg-white outline-none
            focus:border-[#e91e8c]"
          />
        </div>

        {/* Sub Heading */}
        <div className="mb-4">
          <label className="block text-[13px] font-medium text-[#444] mb-1.5">
            Blog Sub Heading
          </label>
          <input
            type="text"
            placeholder="Enter a blog sub heading"
            value={blogData.subHeading}
            onChange={(e) =>
              setBlogData((prev) => ({
                ...prev,
                subHeading: e.target.value,
              }))
            }
            className="w-full px-3.5 py-2.5 text-sm
            border border-[#ddd] rounded-lg
            bg-white outline-none
            focus:border-[#e91e8c]"
          />
        </div>

        {/* Cover Image */}
        <div className="mb-4">
          <label className="block text-[13px] font-medium text-[#444] mb-1.5">
            Upload Cover Image
          </label>
          <div className="flex items-center border border-[#ddd] rounded-lg overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => coverRef.current?.click()}
              className="px-4 py-2.5 text-[13px] font-medium text-[#444]
                  bg-[#f0f0f0] border-r border-[#ddd]
                  hover:bg-[#e4e4e4]"
            >
              Choose file
            </button>
            <span className="px-3.5 text-[13px] text-[#666]">
              {blogData.coverImage
                ? blogData.coverImage.name
                : "Coveronblog1.jpg"}
            </span>
            <input
              ref={coverRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange("coverImage")}
            />
          </div>
        </div>

        {/* Main Image */}
        <div className="mb-4">
          <label className="block text-[13px] font-medium text-[#444] mb-1.5">
            Upload Main Image
          </label>
          <div className="flex items-center border border-[#ddd] rounded-lg overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => mainRef.current?.click()}
              className="px-4 py-2.5 text-[13px] font-medium text-[#444]
                  bg-[#f0f0f0] border-r border-[#ddd]
                  hover:bg-[#e4e4e4]"
            >
              Choose file
            </button>
            <span className="px-3.5 text-[13px] text-[#666]">
              {blogData.mainImage
                ? blogData.mainImage.name
                : "MainImageonblog1.jpg"}
            </span>
            <input
              ref={mainRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange("mainImage")}
            />
          </div>
        </div>
      </div>

      {/* Blog Content Editor */}
      <div className="bg-white rounded-xl p-6 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
        <h2 className="text-lg font-semibold text-center mb-4">Blog Content</h2>

        <div className="rounded-lg overflow-hidden  [&_.ql-editor]:min-h-[320px]">
          <ReactQuill
            theme="snow"
            value={blogData.content}
            onChange={(value) =>
              setBlogData((prev) => ({ ...prev, content: value }))
            }
            modules={quillModules}
            formats={quillFormats}
            placeholder="Compose an epic..."
          />
        </div>
      </div>
    </BlogAppLayout>
  );
}
