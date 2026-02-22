import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle, StyledImage } from './styles';
import { ArtProps } from "./types";
import React from 'react';

export default function BasicCard(drawingProps: ArtProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card
      sx={{
        boxShadow: "none",
        border: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          gutterBottom
          sx={{ color: "text.secondary", fontSize: 25, fontWeight: "bold" }}
        >
          {drawingProps.title}
        </Typography>

        <StyledImage
          src={drawingProps.image}
          alt="image"
          onClick={handleOpen}
          style={{ cursor: "pointer" }}
        />

        <Modal
          open={open}
          onClose={handleClose}
          className="flex flex-row gap-2"
        >
          <Box sx={modalStyle}>
            <img className="w-[500px]" src={drawingProps.image} alt="image" />
          </Box>
        </Modal>
      </CardContent>
    </Card>
  );
}