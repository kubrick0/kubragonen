import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
        "&:focus": { outline: "none" },
        "&:focus-visible": { outline: "none" },
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
        <StyledImage
          src={drawingProps.image}
          alt="image"
          onClick={handleOpen}
          draggable={false}
          style={{ cursor: "pointer" }}
        />

        <Modal open={open} onClose={handleClose}>
          <Box sx={{ ...modalStyle, '&:focus': { outline: 'none' } }}>
            <img
              src={drawingProps.image}
              alt="image"
              style={{ outline: 'none' }}
            />
          </Box>
        </Modal>
      </CardContent>
    </Card>
  );
}