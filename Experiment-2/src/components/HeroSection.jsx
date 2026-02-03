import { Typography, Button, Container } from '@mui/material';

export default function HeroSection() {
  return (
    <Container sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Experiment-2
      </Typography>
      <Typography variant="h6" gutterBottom>
        This section is built using Material UI components.
      </Typography>
      <Button variant="contained">Get Started</Button>
    </Container>
  );
}
