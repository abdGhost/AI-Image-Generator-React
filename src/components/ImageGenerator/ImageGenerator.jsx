import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import Default_Image from "../Assets/default_image.svg";
import axios from "axios";

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return;
    } else {
      setLoading(true); // Start loading animation
      try {
        const response = await axios({
          method: "POST",
          url: "https://open-ai21.p.rapidapi.com/texttoimage2",
          headers: {
            "x-rapidapi-key": process.env.REACT_APP_API_KEY,
            "x-rapidapi-host": "open-ai21.p.rapidapi.com",
            "Content-Type": "application/json",
          },
          data: {
            text: inputRef.current.value,
          },
        });
        let imageUrl = response.data.generated_image;
        setImage_url(imageUrl);
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setLoading(false); // Stop loading on error
      }
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="img">
          <img
            src={image_url === "/" ? Default_Image : image_url}
            alt=""
            onLoad={() => setLoading(false)} // Stop loading once image loads
          />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-loop" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            Loading...
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Describe what you want to see"
          ref={inputRef}
        />
        <div className="generate-btn" onClick={imageGenerator}>
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
