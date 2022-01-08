const HOST = "http://localhost:8080";
const GET_SCROLLING_IMAGES_URL = `${HOST}/gallery/scrolling-images`;
const GET_ALL_GALLERY_IMAGES_URL = `${HOST}/gallery/images`;
const GET_GALLERY_CATEGORIES_URL = `${HOST}/gallery/categories`;
const GET_IMAGES_BY_CATEGORY_URL = `${HOST}/gallery/images/`; // append category
const GET_IMAGE_BY_ID_URL = `${HOST}/gallery/image/`; // append imageId
const GET_BLOG_POSTS_URL = `${HOST}/blog/posts`;
const GET_BLOG_POST_BY_ID_URL = `${HOST}/blog/post/`; // append id
const DELETE_IMAGE_URL = `${HOST}/admin/gallery/delete-image`;
const UPLOAD_IMAGE_URL = `${HOST}/admin/gallery/upload-image`;

const _sendRequest = async (url: string, requestConfig?: {}) => {
  let result;

  // if requestConfig isn't set then GET request is sent
  if (!requestConfig) {
    const response = await fetch(url);
    result = await response.json();
  } else {
    console.log("requestConfig: ", requestConfig);
    const response = await fetch(url, requestConfig);
    result = await response.json();
  }

  return result;
};

/*
  =======================
  Non-authenticated
  =======================
*/

export const getScrollingImages = async () => {
  return _sendRequest(GET_SCROLLING_IMAGES_URL);
};

export const getAllGalleryImages = async () => {
  return _sendRequest(GET_ALL_GALLERY_IMAGES_URL);
};

export const getGalleryCategories = () => {
  return _sendRequest(GET_GALLERY_CATEGORIES_URL);
};

export const getImagesByCategory = async (category: string) => {
  return _sendRequest(GET_IMAGES_BY_CATEGORY_URL + category);
};

export const getImageById = async (imageId: string) => {
  return _sendRequest(GET_IMAGE_BY_ID_URL + imageId);
};

export const getBlogPosts = async (requestQueries: {
  [key: string]: string;
}) => {
  let url = GET_BLOG_POSTS_URL;

  // if requestQueries were provided, append them to the url
  if (requestQueries && Object.keys(requestQueries).length > 0) {
    const queries = [];

    for (const parameter of Object.keys(requestQueries)) {
      queries.push(`${parameter}=${requestQueries[parameter]}`);
    }

    const queriesString = "?" + queries.join("&");

    url = url + queriesString;
  }

  return _sendRequest(url);
};

export const getBlogPostsByMonth = async (year: number, month: number) => {
  return _sendRequest(`${GET_BLOG_POSTS_URL}/${year}/${month}`);
};

export const getBlogPostById = async (id: string) => {
  return _sendRequest(GET_BLOG_POST_BY_ID_URL + id);
};

/*
  =======================
  Authenticated
  =======================
*/

export const uploadImage = async (
  image: File,
  category: string,
  userId: string,
  accessToken: string
) => {
  const data = new FormData();
  data.append("image", image);
  data.append("category", category);

  const requestConfig = {
    method: "POST",
    headers: {
      Authorization: `Bearer: ${accessToken}`,
      UserId: userId,
    },
    body: data,
  };
  _sendRequest(UPLOAD_IMAGE_URL, requestConfig);
};

export const deleteImage = async (
  imageId: string,
  userId: string,
  accessToken: string
) => {
  const requestConfig = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer: ${accessToken}`,
      UserId: userId,
    },
    body: JSON.stringify({ imageId: imageId }),
  };

  return _sendRequest(DELETE_IMAGE_URL, requestConfig);
};
