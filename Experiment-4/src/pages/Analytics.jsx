import CustomNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContextOnly";
import { Container, Typography, Card, CardContent, Button, Divider, List, ListItem, ListItemText, Box, TextField } from "@mui/material";

export default function Analytics() {
  const { state, dispatch } = useContext(AppContext);
  const totalSkills = useMemo(() => state.skills.length, [state.skills]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      dispatch({
        type: "ADD_SKILL",
        payload: {
          id: Date.now(),
          name: newSkill.trim()
        }
      });
      setNewSkill("");
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="main-content">
        <Container sx={{ mt: 8, maxWidth: 700 }}>
          <Typography variant="h4" gutterBottom align="center">
            Analytics
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4 }}>
            Manage your skills below.
          </Typography>

          <Card sx={{ mb: 4, p: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                <Typography variant="h6">Total Skills</Typography>
                <Typography variant="h3" color="primary">{totalSkills}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Skills List
              </Typography>
              <List>
                {state.skills.map(skill => (
                  <ListItem
                    key={skill.id}
                    secondaryAction={
                      <Button
                        size="small"
                        color="error"
                        onClick={() => dispatch({ type: "REMOVE_SKILL", payload: skill.id })}
                      >
                        Remove
                      </Button>
                    }
                  >
                    <ListItemText primary={skill.name} />
                  </ListItem>
                ))}
              </List>
              <Box textAlign="center" mt={2} display="flex" justifyContent="center" gap={2}>
                <TextField
                  label="Skill Name"
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  size="small"
                  sx={{ width: 200 }}
                  onKeyDown={e => { if (e.key === 'Enter') handleAddSkill(); }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddSkill}
                  disabled={newSkill.trim() === ""}
                >
                  Add Skill
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </div>
    </>
  );
}

