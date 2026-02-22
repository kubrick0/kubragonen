import { styled } from '@mui/material/styles';

export const StyledImage = styled("img")({
  width: "100%",
  borderRadius: "10px",
  border: "none",
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
  maxWidth: "500px",
  maxHeight: "500px",
});

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '90vw',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  border: 'none',
  overflow: 'auto',
  p: 2,
};