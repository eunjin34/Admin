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
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextFormContainer } from "src/components/shop/TextForm";

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

const Page = () => {
  const formik = useFormik({
    initialValues: {
      title: "demo@devias.io",
      desc: "Password123!",
      price: "300",
      seller: "eunjin",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      for (let key in values) {
        formData.append(`${key}`, values[key]);
      }
      formData.append("thumbnail", thumbnailFile);
      formData.append("fbx", fbxFile);
      try {
        // await
      } catch (err) {}
    },
  });

  const [thumbnailFile, setThumbnailFile] = useState([]);
  const [fbxFile, setFbxFile] = useState([]);
  const [thumbnailFileName, setThumbnailFileName] = useState("No file chosen");
  const [fbxFileName, setFbxFileName] = useState("No file chosen");

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
  const btn = () => {
    return (
      <Button
        variant="contained"
        sx={{ bgcolor: "#E242E5" }}
        onClick={formik.handleSubmit}
      >
        save
      </Button>
    );
  };

  return (
    <>
      <Head>
        <title>Detail | Soulx Admin</title>
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
                <Typography variant="h4">Detail</Typography>
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
                  sx={{ mr: "12px", borderRadius: "8px" }}
                >
                  back
                </Button>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#E242E5", borderRadius: "8px" }}
                  onClick={formik.handleSubmit}
                >
                  save
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    border: "1px solid #5048E5",
                    color: "#5048E5",
                    bgcolor: "#F9FAFB",
                    borderRadius: "8px",
                    ml: "5px",
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                  onClick={() => console.log("삭제")}
                >
                  delete
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
                    value={formik.values.title}
                  />
                  <TextField
                    name="desc"
                    fullWidth
                    required
                    id="desc"
                    label="설명"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.desc}
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
                    value={formik.values.price}
                  />
                  <TextField
                    name="seller"
                    fullWidth
                    required
                    id="seller"
                    label="셀러"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.seller}
                  />
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
                          accept=".png"
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
