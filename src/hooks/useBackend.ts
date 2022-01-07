import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { IImage } from "../interfaces/image";
import { IStoreState } from "../store/store";

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

const useBackend = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | string>(false);

  const authState = useSelector((state: IStoreState) => state.auth);

  const _sendRequest = useCallback(
    async (url, errorMessage, requestConfig?) => {
      setIsLoading(true);
      setError(false);

      let result;

      try {
        // if requestConfig isn't set then GET request is sent
        if (!requestConfig) {
          const response = await fetch(url);
          result = JSON.parse(await response.json());
        } else {
          const response = await fetch(url, requestConfig);
          result = JSON.parse(await response.json());
        }
      } catch (err) {
        setError(errorMessage);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      return result;
    },
    []
  );

  /*
  =======================
  Non-authenticated
  =======================
  */

  const getScrollingImages = useCallback(async () => {
    return _sendRequest(GET_SCROLLING_IMAGES_URL, "Kunde inte hämta bilder.");
  }, [_sendRequest]);

  const getAllGalleryImages = useCallback(async () => {
    return _sendRequest(GET_ALL_GALLERY_IMAGES_URL, "Kunde inte hämta bilder.");
  }, [_sendRequest]);

  const getGalleryCategories = useCallback(() => {
    return _sendRequest(
      GET_GALLERY_CATEGORIES_URL,

      "Kunde inte hämta kategorier."
    );
  }, [_sendRequest]);

  const getImagesByCategory = useCallback(
    async (category) => {
      return _sendRequest(
        GET_IMAGES_BY_CATEGORY_URL + category,
        "Kunde inte hämta bilder."
      );
    },
    [_sendRequest]
  );

  const getImageById = useCallback(
    async (imageId: string) => {
      return _sendRequest(
        GET_IMAGE_BY_ID_URL + imageId,
        "Kunde inte hämta bild."
      );
    },
    [_sendRequest]
  );

  const getBlogPosts = useCallback(
    async (requestQueries) => {
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

      return _sendRequest(url, "Kunde inte hämta blogginlägg.");
    },
    [_sendRequest]
  );

  const getBlogPostsByMonth = useCallback(
    async (year, month) => {
      return _sendRequest(
        `${GET_BLOG_POSTS_URL}/${year}/${month}`,
        "Kunde inte hämta blogginlägg"
      );
    },
    [_sendRequest]
  );

  const getBlogPostById = useCallback(
    async (id) => {
      return _sendRequest(
        GET_BLOG_POST_BY_ID_URL + id,
        "Kunde inte hämta blogginlägg."
      );
    },
    [_sendRequest]
  );

  /*
  =======================
  Authenticated
  =======================
  */

  const uploadImage = useCallback(
    async (image: File, category: string) => {
      const userId = authState.userId;
      const accessToken = authState.accessToken;

      if (!(userId && accessToken)) {
        throw new Error("User is not logged in");
      }

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
      _sendRequest(
        UPLOAD_IMAGE_URL,
        "Kunde inte lägga till bild.",
        requestConfig
      );
    },
    [_sendRequest, authState]
  );

  const deleteImage = useCallback(
    async (imageId) => {
      const userId = authState.userId;
      const accessToken = authState.accessToken;

      if (!(userId && accessToken)) {
        return; // should lead to error being shown
      }

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

      return _sendRequest(
        DELETE_IMAGE_URL,
        "Kunde inte ta bort bild.",
        requestConfig
      );
    },
    [authState, _sendRequest]
  );

  return {
    getScrollingImages,
    getAllGalleryImages,
    getGalleryCategories,
    getImagesByCategory,
    getImageById,
    getBlogPosts,
    getBlogPostsByMonth,
    getBlogPostById,
    deleteImage,
    uploadImage,
    isLoading,
    error,
  };
};

export default useBackend;
