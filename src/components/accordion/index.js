import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import { accordianItems } from "../../constants";

export const RightAccordion = ({ image, onImageClick }) => {
  return (
    <Accordion defaultActiveKey={0}>
      {accordianItems?.map((val, index) => (
        <Accordion.Item eventKey={index} key={`accordian-item-${index}`}>
          <Accordion.Header>{val.label}</Accordion.Header>
          <Accordion.Body>
            <Row>
              {val?.items?.map((img, imgIndex) => {
                return (
                  <Col md={3} xs={4} sm={4} key={`image-${imgIndex}`}>
                    <div
                      className={`border p-1 rounded d-flex flex-column justify-content-center align-items-center ${
                        image === img ? "bg-secondary" : ""
                      }`}
                      role="button"
                      onClick={() => onImageClick(img)}
                    >
                      <img
                        alt="Not Found"
                        className="w-100"
                        src={`../images/thumbnails/${img}.jpg`}
                      />
                      <h6 className="mt-2 font-size-12">{img}</h6>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
