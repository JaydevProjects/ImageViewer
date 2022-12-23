import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { ImageViewer } from "./components/imageViewer";
import { RightAccordion } from "./components/accordion";
import "./App.css";

function App() {
  const [image, setImage] = useState("grey-green");
  const [fullScreen, setFullScreen] = useState(false);
  const [frame, setFrame] = useState(0);

  //set image on right accordion selection
  const onImageClick = (img) => {
    setImage(img);
  };

  //set fullscreen
  const zoomClick = () => {
    setFullScreen(!fullScreen);
  };

  return (
    <Container>
      <Row className="py-4">
        <Col md={6} className="mb-3">
          <ImageViewer
            image={image}
            fullScreen={fullScreen}
            zoomClick={zoomClick}
            setFrame={setFrame}
            frame={frame}
          />
        </Col>
        <Col md="6">
          <RightAccordion image={image} onImageClick={onImageClick} />
        </Col>
      </Row>
      {fullScreen && (
        <div className="position-fixed w-100 h-100 p-3 fullscreen-modal bg-white">
          <ImageViewer
            image={image}
            fullScreen={fullScreen}
            zoomClick={zoomClick}
            hideCarousel={true}
            setFrame={setFrame}
            frame={frame}
          />
        </div>
      )}
    </Container>
  );
}

export default App;
