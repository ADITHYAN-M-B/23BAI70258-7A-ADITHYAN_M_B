import { Typography, Button, Container } from '@mui/material';

export default function HeroSection() {
  return (
    <Container sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h3">
  Hi, I'm Adithyan
</Typography>
<Typography variant="h6">
  A Computer Science student passionate about Web Development
</Typography>

      <Button variant="contained">Get Started</Button>
    </Container>
  );
}
