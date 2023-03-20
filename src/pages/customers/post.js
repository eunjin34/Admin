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
      submit: null,
    },
    // 유효성검사
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      console.log(values);
      console.log(helpers);
      //   try {
      //     await auth.signIn(values.email, values.password);
      //     router.push("/");
      //   } catch (err) {
      //     helpers.setStatus({ success: false });
      //     helpers.setErrors({ submit: err.message });
      //     helpers.setSubmitting(false);
      //   }
    },
  });

  const [thumbnailFile, setThumbnailFile] = useState("No file chosen");
  const [fbxFile, setFbxFile] = useState("No file chosen");

  // 파일첨부
  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    if (e.target.name === "thumbnail") setThumbnailFile(name);
    if (e.target.name === "fbx") setFbxFile(name);
  };

  return (
    <>
      <Head>
        <title>Post | Soulx Admin</title>
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
                <Typography variant="h4">Register</Typography>
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
                  onClick={() => Router.back()}
                  variant="contained"
                  sx={{ bgcolor: "#E242E5" }}
                >
                  save
                </Button>
              </div>
            </Stack>

            <form noValidate onSubmit={formik.handleSubmit}>
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
                    id="outlined-required"
                    label="제목"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                  <TextField
                    name="desc"
                    fullWidth
                    required
                    id="outlined-required"
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
                    id="outlined-required"
                    label="가격"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                  />
                  <TextField
                    name="seller"
                    fullWidth
                    required
                    id="outlined-required"
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
                        {thumbnailFile}
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
                      <span style={{ paddingLeft: "1rem" }}>{fbxFile}</span>
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
