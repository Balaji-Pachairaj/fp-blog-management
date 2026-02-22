"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
// import BlogTopBar from "@/components/BlogTopBar";
// import BlogSideBar from "@/components/BlogSideBar";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import BlogTopBar from "@/blog_components/BlogTopBar";
import BlogSideBar from "@/blog_components/BlogSideBar";
import BlogAppLayout from "@/blog_components/BlogAppLayout";
import { useRouter } from "next/router";
import { Blog_App_Full_API, Blog_App_Routes } from "@/blog_components/config";
import axios from "axios";
import toast from "react-hot-toast";
import { setPreview } from "@/blog_components/config/utils";
import UseBeAuthenticated from "@/blog_components/hooks/UseBeAuthenticated";

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
  UseBeAuthenticated();
  const router = useRouter();
  const [loading, setLoading] = useState({
    makeLive: false,
    saveAsDraft: false,
    preview: false,
  });
  const [isPreviewing, setIsPreviewing] = useState(false);

  const [blogData, setBlogData] = useState({
    heading: "",
    subHeading: "",
    coverImage: null,
    mainImage: null,
    content: "",
  });

  const coverRef = useRef(null);
  const mainRef = useRef(null);

  const takePreview = () => {
    setIsPreviewing(true);
    const mainImageUrl =
      blogData.mainImage && URL.createObjectURL(blogData.mainImage);
    const coverImageURL =
      blogData.coverImage && URL.createObjectURL(blogData.coverImage);

    setPreview({
      ...blogData,
      coverImage: coverImageURL,
      mainImage: mainImageUrl,
    });
  };

  useEffect(() => {
    if (isPreviewing) {
      takePreview();
    }
  }, [blogData]);

  const handleFileChange = (field) => (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData((prev) => ({ ...prev, [field]: file }));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("heading", blogData.heading);
      formData.append("subHeading", blogData.subHeading);
      formData.append("content", blogData.content);

      // assuming you got files from <input type="file" />
      formData.append("coverImage", blogData.coverImage);
      formData.append("mainImage", blogData.mainImage);

      await axios.post(Blog_App_Full_API.BLOG_ADD, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      router.push(Blog_App_Routes.BLOGLIST);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMakeLive = async () => {
    setLoading((state) => {
      return {
        ...state,
        makeLive: true,
      };
    });

    await handleSave();

    setLoading((state) => {
      return {
        ...state,
        makeLive: false,
      };
    });
  };

  const handleSaveAsDraft = async () => {
    setLoading((state) => {
      return {
        ...state,
        saveAsDraft: true,
      };
    });

    await handleSave();

    setLoading((state) => {
      return {
        ...state,
        saveAsDraft: false,
      };
    });
  };

  const handlePreview = () => {
    console.log("Previewing blog:", blogData);
    takePreview();
    const url = Blog_App_Routes.BLOG_PREVIEW;
    const previewWindow = window.open(url, "blog_preview_tab");
    previewWindow?.focus();
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
          {/* Save as Draft */}
          <button
            onClick={handleSaveAsDraft}
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
            {loading.saveAsDraft ? "Loading..." : "Save as draft"}
          </button>

          {/* Make Live */}
          <button
            onClick={handleMakeLive}
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
            {loading.makeLive ? "Loading..." : "Make Live"}
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
                : "Please select the file"}
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
                : "Please select the file"}
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
