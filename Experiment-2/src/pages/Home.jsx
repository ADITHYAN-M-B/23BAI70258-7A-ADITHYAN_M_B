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
                title="React Development"
                description="Experience in building UI using React, Bootstrap and MUI."
              />
            </Col>
            <Col md={4}>
              <CardComponent
                title="Database Knowledge"
                description="Experience working with SQL and DBMS projects."
              />
            </Col>
            <Col md={4}>
              <CardComponent
                title="Database Knowledge"
                description="Experience working with SQL and DBMS projects."
              />
            </Col>
          </Row>
        </Container>

        <Container className="mt-5">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                About Me
              </Accordion.Header>
              <Accordion.Body>
                I am a Computer Science student interested in full stack development.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>My Goal</Accordion.Header>
              <Accordion.Body>
                To become a skilled software developer and build impactful projects.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>

      <Footer />
    </>
  );
}
