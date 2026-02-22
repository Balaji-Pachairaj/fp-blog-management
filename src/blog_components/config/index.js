export const Blog_App_Routes = {
  LOGIN: "/app/login",
  BLOGLIST: "/app/blog/list",
  BLOG_CREATE: "/app/blog/add",
  BLOG_PREVIEW: "/app/blog/preview",
};

export const Base_APP = process.env.NEXT_API_URL || "http://localhost:5000";

export const Blog_App_BE_End_Points = {
  LOGIN: "/api/login",
  BLOG_LIST: "/api/blog-list",
  BLOG_ADD: "/api/add-blog",
};

export const Blog_App_Full_API = {
  LOGIN: Base_APP + Blog_App_BE_End_Points.LOGIN,
  BLOG_LIST: Base_APP + Blog_App_BE_End_Points.BLOG_LIST,
  BLOG_ADD: Base_APP + Blog_App_BE_End_Points.BLOG_ADD,
};
