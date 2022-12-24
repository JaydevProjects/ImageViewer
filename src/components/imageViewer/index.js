import { useEffect, useRef, useState } from "react";
import * as SpriteSpin from "spritespin";
import { imageCarousel } from "../../constants";
import "./styles.css";

export const ImageViewer = ({
  image,
  fullScreen = false,
  hideCarousel = false,
  zoomClick,
  frame = 0,
  setFrame,
}) => {
  const [data, setData] = useState();
  const [cursor, setCursor] = useState(false);
  const imageRef = useRef(null);
  const parentRef = useRef(null);

  //update data as image changes
  useEffect(() => {
    initializeData();
  }, [image]);

  //initialize function for image viewer
  const initializeData = () => {
    SpriteSpin.spritespin({
      target: imageRef?.current,
      source: SpriteSpin.source(`../images/${image}/${image}-{frame}.jpg`, {
        frame: [1, 24],
        lane: [0, 11],
        digits: 1,
      }),
      sourceZoom: SpriteSpin.source(`../images/${image}/${image}-{frame}.jpg`, {
        frame: [1, 24],
        lane: [0, 11],
        digits: 1,
      }),
      lanes: 12,
      height: fullScreen ? parentRef?.current?.clientHeight - 80 : 300,
      frames: 24,
      sense: 1,
      senseLane: -2,
      lane: 6,
      frame: frame,
      animate: false,
      zoomUseClick: true,
      zoomUseWheel: true,
      zoomPinFrame: true,
      progress: {
        percent: 0,
      },
      plugins: ["360", "drag", "zoom", "progress"],
      responsive: true,
      onInit: (e, data) => {
        setData(data);
      },
    });
  };

  //update frame on carousel image click
  const updateFrame = (value) => {
    const val = value - 1;
    if (data.frame === val) {
      return;
    }
    setFrame(val);
    SpriteSpin.startAnimation(data);
    SpriteSpin.updateFrame(data, value - 6);
    setTimeout(() => {
      SpriteSpin.stopAnimation(data);
    }, 250);
  };

  //change cursor on double click
  const changeCursor = () => {
    setCursor(!cursor);
  };

  //set frame on mouse move
  const onMouseMove = () => {
    if (data?.frame !== frame) {
      setFrame(data?.frame);
    }
  };

  return (
    <>
      <div
        className={`border rounded p-1 position-relative ${
          fullScreen ? "w-100 h-100" : ""
        }`}
        ref={parentRef}
      >
        <div
          className={cursor ? "cursor-all-scroll" : "cursor-grabbable"}
          ref={imageRef}
          onDoubleClick={changeCursor}
          onMouseMove={onMouseMove}
        >
          <div
            className="zoom-icon p-2 bg-light rounded-circle d-flex justify-content-center align-items-center"
            onClick={zoomClick}
            role="button"
          >
            <img
              alt="Not Found"
              height="15px"
              src={`../images/${!fullScreen ? "zoom-out" : "zoom-in"}.png`}
            />
          </div>
        </div>
        <div className="w-100 mt-2 px-2 d-flex justify-content-center align-items-center mb-2">
          <div className="bg-light rounded d-flex justify-content-center align-items-center p-2">
            <h6 className="m-0 text-center">
              {cursor
                ? "Move the mouse to pan"
                : "Drag to rotate and Double Click to zoom in/zoom out"}
            </h6>
          </div>
        </div>
      </div>
      {!hideCarousel && (
        <div className="w-100 mt-3 d-flex justify-content-center align-items-center">
          {imageCarousel?.map((val) => {
            return (
              <div
                className={`mx-2 transition flex-fixed-width-item ${
                  frame + 1 === val
                    ? "carousel-icon-dark"
                    : "carousel-icon-light"
                }`}
                key={val}
              >
                <div
                  role="button"
                  className="border carousel-icon-inner"
                  onClick={() => updateFrame(val)}
                >
                  <img
                    alt="Not Found"
                    className="w-100"
                    src={`../images/${image}/${image}-${val}.jpg`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
