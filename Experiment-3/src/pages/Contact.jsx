import CustomNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container, Typography, TextField, Button } from "@mui/material";

export default function Contact() {
  return (
    <>
      <CustomNavbar />

      <div className="main-content">
        <Container sx={{ mt: 8, maxWidth: 600 }}>
          <Typography variant="h4" gutterBottom align="center">
            Contact Me
          </Typography>

          <Typography variant="body1" gutterBottom align="center">
            Feel free to reach out to me for collaborations or project discussions.
          </Typography>

          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Your Email"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Button variant="contained" fullWidth>
            Send Message
          </Button>

          <Typography variant="body2" sx={{ mt: 4 }} align="center">
            Email: adi.mariyathody@gmail.com
          </Typography>
          <Typography variant="body2" align="center">
            Phone: +91 9605423421
          </Typography>
        </Container>
      </div>

      <Footer />
    </>
  );
}
