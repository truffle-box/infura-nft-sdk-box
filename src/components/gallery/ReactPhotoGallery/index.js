import React, { useCallback, useState } from "react";
import Gallery from "react-photo-gallery";
import { photos } from "./photos";

const SelectedImage = ({
  photo,
  margin
}) => {

  const handleOnClick = e => {
    console.log("image clickled", { e });
  };

  return (
    <div
      style={{ margin, height: photo.height, width: photo.width }}
    >
      <img
        alt={photo.title}
        {...photo}
        onClick={handleOnClick}
      />
      <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
    </div>
  );
};

const AlternateGallery = () => {
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <SelectedImage
        selected={selectAll ? true : false}
        key={key}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
      />
    ),
    [selectAll]
  );

  return (
    <div>
      {/*<p>*/}
      {/*  <button onClick={toggleSelectAll}>toggle select all</button>*/}
      {/*</p>*/}
      <Gallery photos={photos} renderImage={imageRenderer} />
    </div>
  );
};

export default AlternateGallery;
