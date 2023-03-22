import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import UturnLeftIcon from "@heroicons/react/24/solid/ArrowUturnLeftIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Link,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Router, { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addList } from "../api/shop";
import { AlertModal } from "src/components/Modal/AlertModal";

// Style
const FlexBox = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
  width: "100%",
  alignItems: "center",
  textAlign: "center",
});

const FlexBox2 = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
  width: "49.5%",
  textAlign: "center",
  alignItems: "center",
});

const UploadBox = styled("div")({
  border: "1px solid #D1D5DB",
  padding: "10px",
  borderRadius: "8px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#F4F6FA",
  color: "#6C6C6C",
});

// const validate = (values) => {
//   const errors = {};
//   if (!values.title) {
//     console.log("dfdf");
//     errors.title = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//     errors.title = "Invalid email address";
//   }
//   return errors;
// };

const Page = () => {
  // Modal state
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [result, setResult] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  // 파일
  const [thumbnailFile, setThumbnailFile] = useState([]);
  const [fbxFile, setFbxFile] = useState([]);
  const [thumbnailFileName, setThumbnailFileName] = useState("No file chosen");
  const [fbxFileName, setFbxFileName] = useState("No file chosen");

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
    },
    // validate,
    onSubmit: async (values) => {
      const formData = new FormData();
      for (let key in values) {
        if (!values[key]) {
          setText("모든 항목은 필수값입니다.");
          setOpen(true);
          return;
        }
        formData.append(`${key}`, values[key]);
      }

      if (thumbnailFile.length === 0 || fbxFile.length === 0) {
        setText("모든 항목은 필수값입니다.");
        setOpen(true);
        return;
      }
      formData.append("files", thumbnailFile);
      formData.append("files", fbxFile);
      const { data, statusCode } = await addList(formData);
      if (statusCode === 200) {
        setOpen(true);
        setResult(true);
        setText("저장 완료!");
      }
      try {
        // await
      } catch (err) {}
    },
  });

  // 파일첨부
  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    if (e.target.name === "thumbnail") {
      setThumbnailFileName(name);
      setThumbnailFile(file);
    }
    if (e.target.name === "fbx") {
      setFbxFileName(name);
      setFbxFile(file);
    }
  };

  return (
    <>
      <AlertModal open={open} onClose={onClose} text={text} result={result} />
      <Head>
        <title>Add | Soulx Admin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Add</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <UturnLeftIcon />
                    </SvgIcon>
                  }
                  onClick={() => Router.back()}
                  variant="contained"
                  sx={{ mr: "10px" }}
                >
                  back
                </Button>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#E242E5" }}
                  onClick={formik.handleSubmit}
                >
                  save
                </Button>
              </div>
            </Stack>

            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  "& .MuiTextField-root": { width: "49.5%" },
                }}
                noValidate
                autoComplete="off"
                bgcolor="#fff"
                borderRadius="8px"
                border="1px solid #E8E8E8"
                p="1.5rem 1rem"
              >
                <FlexBox>
                  <TextField
                    name="title"
                    type="text"
                    fullWidth
                    required
                    id="title"
                    label="제목"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title || ""}
                  />
                  <TextField
                    name="description"
                    fullWidth
                    required
                    id="description"
                    label="설명"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description || ""}
                  />
                </FlexBox>
                <FlexBox>
                  <TextField
                    name="price"
                    fullWidth
                    required
                    id="price"
                    label="가격"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price || ""}
                  />
                  {/* <TextField
                    name="seller"
                    fullWidth
                    required
                    id="seller"
                    label="셀러"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.seller}
                  /> */}
                </FlexBox>
                <FlexBox>
                  <FlexBox2>
                    <UploadBox>
                      <Button
                        component="label"
                        variant="outlined"
                        sx={{
                          bgcolor: "#fff",
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.1)",
                          color: "#6C6C6C",
                          border: "1px solid #fff",
                          fontWeight: "500",
                          "&:hover": {
                            boxShadow: "none",
                            backgroundColor: "rgba(99, 102, 241, 0.8)",
                            color: "#fff",
                          },
                        }}
                      >
                        Thumbnail File
                        <input
                          type="file"
                          accept=".png"
                          hidden
                          name="thumbnail"
                          onChange={handleFileUpload}
                        />
                      </Button>
                      <span style={{ paddingLeft: "1rem" }}>
                        {thumbnailFileName}
                      </span>
                    </UploadBox>
                  </FlexBox2>
                  <FlexBox2>
                    <UploadBox>
                      <Button
                        component="label"
                        variant="outlined"
                        sx={{
                          bgcolor: "#fff",
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.1)",
                          color: "#6C6C6C",
                          border: "1px solid #fff",
                          fontWeight: "500",
                          "&:hover": {
                            boxShadow: "none",
                            backgroundColor: "rgba(99, 102, 241, 0.8)",
                            color: "#fff",
                          },
                        }}
                      >
                        FBX File
                        <input
                          type="file"
                          accept=".fbx"
                          hidden
                          name="fbx"
                          onChange={handleFileUpload}
                        />
                      </Button>
                      <span style={{ paddingLeft: "1rem" }}>{fbxFileName}</span>
                    </UploadBox>
                  </FlexBox2>
                </FlexBox>
              </Box>
            </form>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
