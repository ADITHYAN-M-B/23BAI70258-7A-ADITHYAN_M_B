import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useSelector } from "react-redux";

export default function CardComponent({ title, description }) {
  const totalSkills = useSelector((state) => state.skills.skills.length);

  return (
    <Card sx={{ minWidth: 275, m: 2 }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2">{description}</Typography>
        <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
          Current global skills: {totalSkills}
        </Typography>
      </CardContent>
    </Card>
  );
}
