import React, { useState, useEffect } from "react";
import axios from "axios";
import { Forecast } from "./Forecast";

function UnsplashPhoto({ location }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const unsplashApiKey = "nOq89hQk6sTCBZb8EOXZB0tQKvOoJLdpbFA9QuoKR3E";
  const unsplashUrl = `https://api.unsplash.com/photos/random?query=${location}&client_id=${unsplashApiKey}`;

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(unsplashUrl);
        const photo = response.data;
        setPhotoUrl(photo.urls.regular);
        console.log(photo);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPhoto();
  }, [location, unsplashUrl]);

  return { photoUrl };
}

export default UnsplashPhoto;
