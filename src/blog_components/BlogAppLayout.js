import React from "react";
import BlogTopBar from "./BlogTopBar";
import BlogSideBar from "./BlogSideBar";

const BlogAppLayout = (props) => {
  return (
    <div className="h-screen flex flex-col bg-[#f7f7f7] text-[#1a1a1a] font-['DM_Sans',sans-serif] overflow-hidden">
      <BlogTopBar />

      <div className="flex flex-1 overflow-hidden">
        <BlogSideBar />

        {/* Scrollable Content Area */}
        <div className="flex-1 px-8 pb-10 overflow-y-auto">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default BlogAppLayout;
