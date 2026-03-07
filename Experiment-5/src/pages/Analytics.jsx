import CustomNavbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { addSkill, removeSkill, clearSkills } from "../redux/slices/skillSlice";

import { Container, Typography, Card, CardContent, Button, Divider, List, ListItem, ListItemText, Box, TextField } from "@mui/material";

import { useState, useMemo, useContext } from "react";
import { AppContext } from "../context/AppContextOnly";

export default function Analytics() {
  const { state } = useContext(AppContext);

  const skills = useSelector(state => state.skills.skills);
  const dispatch = useDispatch();

  const [newSkill, setNewSkill] = useState("");

  const totalSkills = useMemo(() => skills.length, [skills]);

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {

      dispatch(addSkill({
        id: Date.now(),
        name: newSkill
      }));

      setNewSkill("");
    }
  };

  return (
    <>
      <CustomNavbar />

      <Container sx={{ mt: 8, maxWidth: 700 }}>
        <Typography variant="h4" align="center">
          Analytics
        </Typography>
        <Typography align="center" sx={{ mt: 1 }}>
          Welcome, {state.user.name}
        </Typography>

        <Card sx={{ mt: 4 }}>
          <CardContent>

            <Typography variant="h6">
              Total Skills: {totalSkills}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <List>
              {skills.map(skill => (
                <ListItem
                  key={skill.id}
                  secondaryAction={
                    <Button
                      color="error"
                      onClick={() => dispatch(removeSkill(skill.id))}
                    >
                      Remove
                    </Button>
                  }
                >
                  <ListItemText primary={skill.name}/>
                </ListItem>
              ))}
            </List>

            <Box display="flex" gap={2}>
              <TextField
                label="Skill"
                value={newSkill}
                onChange={(e)=>setNewSkill(e.target.value)}
              />

              <Button
                variant="contained"
                onClick={handleAddSkill}
              >
                Add
              </Button>

              <Button
                color="error"
                onClick={()=>dispatch(clearSkills())}
              >
                Clear
              </Button>

            </Box>

          </CardContent>
        </Card>

      </Container>
    </>
  );
}