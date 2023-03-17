import { Modal, Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

// styled
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: "0px 6px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  pt: 4,
};
const IconBox = styled("div")({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  p: "10px 10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const CancelBtn = styled("button")({
  backgroundColor: "#fff",
  padding: "8px 30px",
  borderRadius: 4,
  borderRadius: 8,
  border: "2px solid #D6DADF",
  cursor: "pointer",
});
const ConfrimBtn = styled("button")({
  color: "#fff",
  padding: "8px 40px",
  marginLeft: 12,
  borderRadius: 8,
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
});

export const AlertModal = ({ open, onClose, text, result }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...modalStyle }}>
        <Grid container spacing={2} p="0 30px 30px">
          <Grid item xs={2}>
            <IconBox sx={{ bgcolor: result ? "#97D292" : "#FDE2E2" }}>
              {result ? (
                <img src="/assets/check.svg" alt="확인아이콘" />
              ) : (
                <img src="/assets/exIcon.svg" alt="경고아이콘" />
              )}
            </IconBox>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h6" mt="12px" fontSize="18px">
              {text}
            </Typography>
          </Grid>
        </Grid>
        <Box
          bgcolor="#F9FAFB"
          p="14px 30px"
          display="flex"
          justifyContent="flex-end"
          borderRadius="0 0 8px 8px"
        >
          <CancelBtn onClick={onClose}>취소</CancelBtn>
          <ConfrimBtn sx={{ bgcolor: result ? "#97D292" : "#DA292E" }}>
            확인
          </ConfrimBtn>
        </Box>
      </Box>
    </Modal>
  );
};
