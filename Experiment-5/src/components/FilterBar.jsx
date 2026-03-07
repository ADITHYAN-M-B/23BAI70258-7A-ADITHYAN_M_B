import { Box, TextField } from "@mui/material";

export default function FilterBar({ value, onChange }) {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <TextField
        label="Search skills"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        fullWidth
      />
    </Box>
  );
}