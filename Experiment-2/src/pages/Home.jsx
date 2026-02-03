import CustomNavbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CardComponent from "../components/CardComponent";
import Footer from "../components/Footer";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';

export default function Home() {
  return (
    <>
      <CustomNavbar />

      <div className="main-content">
        <HeroSection />

        <Container className="mt-5">
          <Row>
            <Col md={4}>
              <CardComponent
                title="Fast"
                description="Fast performance using modern UI."
              />
            </Col>
            <Col md={4}>
              <CardComponent
                title="Responsive"
                description="Works on mobile and desktop screens."
              />
            </Col>
            <Col md={4}>
              <CardComponent
                title="Simple"
                description="Clean and minimal interface."
              />
            </Col>
          </Row>
        </Container>

        <Container className="mt-5">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                What is this Experiment?
              </Accordion.Header>
              <Accordion.Body>
                This page demonstrates usage of Bootstrap and MUI components.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Is this responsive?</Accordion.Header>
              <Accordion.Body>
                Yes. Bootstrap grid ensures responsive layout.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>

      <Footer />
    </>
  );
}
