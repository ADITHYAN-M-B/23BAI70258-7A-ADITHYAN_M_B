import CustomNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container, Typography, Card, CardContent } from "@mui/material";

export default function Projects() {
  return (
    <>
      <CustomNavbar />

      <div className="main-content">
        <Container sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom align="center">
            My Projects
          </Typography>

          {/* Project 1 */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">
                Real-Time Sign Language to Speech and Subtitle System
              </Typography>
              <Typography variant="body2">
                Built a real-time system using machine learning and computer vision
                to recognize static sign language alphabets (A–Z). The system processes
                live camera input to detect hand gestures and converts them into speech
                output and subtitles.
              </Typography>
            </CardContent>
          </Card>

          {/* Project 2 */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">
                Role-Based Access Control (RBAC) System
              </Typography>
              <Typography variant="body2">
                Developed a backend system to manage user permissions and secure
                sensitive operations. Implemented authentication and authorization
                logic to restrict access to protected features.
              </Typography>
            </CardContent>
          </Card>

          {/* Project 3 */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">
                Wi-Fi and Cloud-Based Car Parking System
              </Typography>
              <Typography variant="body2">
                Built a smart parking system using ESP32, IR sensors, and cloud
                integration to provide real-time slot availability and centralized
                monitoring through IoT devices.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </div>

      <Footer />
    </>
  );
}
