import CustomNavbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import { useSelector, useDispatch } from "react-redux";
import { addSkill, removeSkill, clearSkills } from "../redux/slices/skillSlice";
import { Container, Typography, Card, CardContent, Button, List, ListItem, ListItemText, Stack, TextField } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContextOnly";

export default function Reports() {
  const { state } = useContext(AppContext);
  const dispatch = useDispatch();
  const skills = useSelector((store) => store.skills.skills);
  const [searchTerm, setSearchTerm] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const filteredSkills = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return skills;
    }

    return skills.filter((skill) =>
      skill.name.toLowerCase().includes(normalizedSearch)
    );
  }, [skills, searchTerm]);

  const handleAddSkill = () => {
    const normalizedSkill = newSkill.trim();

    if (!normalizedSkill) {
      return;
    }

    dispatch(
      addSkill({
        id: Date.now(),
        name: normalizedSkill
      })
    );

    setNewSkill("");
  };

  return (
    <>
      <CustomNavbar />

      <Container sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Reports 
        </Typography>

        <Typography align="center" sx={{ mb: 2 }}>
          User: {state.user.name} | Theme: {state.theme}
        </Typography>

        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6">Skills Summary</Typography>
            <Typography>Total Skills: {skills.length}</Typography>
            <Typography>Filtered Skills: {filteredSkills.length}</Typography>


            <FilterBar value={searchTerm} onChange={setSearchTerm} />

            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <TextField
                label="New Skill"
                size="small"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <Button variant="contained" onClick={handleAddSkill}>
                Add 
              </Button>
              <Button color="error" onClick={() => dispatch(clearSkills())}>
                Clear All
              </Button>
            </Stack>

            <List>
              {filteredSkills.map((skill) => (
                <ListItem
                  key={skill.id}
                  secondaryAction={
                    <Button color="error" onClick={() => dispatch(removeSkill(skill.id))}>
                      Remove
                    </Button>
                  }
                >
                  <ListItemText primary={skill.name} />
                </ListItem>
              ))}
            </List>

          </CardContent>
        </Card>
      </Container>

    </>
  );
}