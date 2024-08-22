// frontend/src/components/AdminPage/SongManagement.tsx

import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, TextField, Button } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select"; // Import SelectChangeEvent
import { ISong } from "../../types";
import theme from "../../styles/themes/theme"; // Import your theme

const SongManagement: React.FC = () => {
  const [songForm, setSongForm] = useState<ISong>({
    title: "",
    artists: [],
    genres: [],
    album: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSongForm({ ...songForm, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>, field: string) => {
    const { value } = e.target;
    setSongForm({ ...songForm, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: theme.colors.background, padding: theme.spacing(2) }}>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="title">Title</InputLabel>
        <TextField
          id="title"
          name="title"
          value={songForm.title}
          onChange={handleInputChange}
          fullWidth
        />
      </FormControl>

      {/* Similar TextField for artists and genres */}

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="album">Album</InputLabel>
        <Select
          id="album"
          value={songForm.album || ""}
          onChange={(e) => handleSelectChange(e, "album")}
        >
          {/* Replace with your album options */}
          <MenuItem value="album1">Album 1</MenuItem>
          <MenuItem value="album2">Album 2</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: theme.spacing(2) }}
      >
        Save Song
      </Button>
    </form>
  );
};

export default SongManagement;
