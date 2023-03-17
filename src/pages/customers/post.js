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
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
// import { CustomersTable } from "src/sections/customer/customers-table";
// import { CustomersSearch } from "src/sections/customer/customers-search";
// import { applyPagination } from "src/utils/apply-pagination";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

// import UploadFileIcon from "@mui/icons-material/UploadFile";

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

// const states = [
//   {
//     value: "alabama",
//     label: "Alabama",
//   },
//   {
//     value: "new-york",
//     label: "New York",
//   },
//   {
//     value: "san-francisco",
//     label: "San Francisco",
//   },
//   {
//     value: "los-angeles",
//     label: "Los Angeles",
//   },
// ];

const Page = () => {
  const [values, setValues] = useState({
    firstName: "Anika",
    lastName: "Visser",
    email: "demo@devias.io",
    phone: "",
    state: "los-angeles",
    country: "USA",
  });

  const formik = useFormik({
    initialValues: {
      title: "demo@devias.io",
      desc: "Password123!",
      price: "300",
      seller: "eunjin",
      submit: null,
    },
    // validationSchema: Yup.object({
    //   email: Yup.string()
    //     .email("Must be a valid email")
    //     .max(255)
    //     .required("Email is required"),
    //   password: Yup.string().max(255).required("Password is required"),
    // }),
    onSubmit: async (values, helpers) => {
      console.log("123!");
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

  //   const handlePageChange = useCallback((event, value) => {
  //     setPage(value);
  //   }, []);

  //   const handleRowsPerPageChange = useCallback((event) => {
  //     setRowsPerPage(event.target.value);
  //   }, []);

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const [csvData, setCsvData] = useState([]);
  const [filename, setFilename] = useState("No file chosen");

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFilename(name);
    // const reader = new FileReader();
    // reader.onload = (evt) => {
    //   if (!evt?.target?.result) {
    //     return;
    //   }
    //   const { result } = evt.target;
    //   const records = parse(result, {
    //     columns: ["id", "value"],
    //     delimiter: ";",
    //     trim: true,
    //     skip_empty_lines: true,
    //   });
    //   setCsvData(records);
    // };
    // reader.readAsBinaryString(file);
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
            {/* top row */}
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
            {/* container */}
            <form noValidate onSubmit={formik.handleSubmit}>
              <Box
                component="form"
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
                    defaultValue="Hello World"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                  <TextField
                    name
                    fullWidth
                    required
                    id="outlined-required"
                    label="설명"
                    defaultValue="Hello World"
                  />
                </FlexBox>

                <FlexBox>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="가격"
                    defaultValue="Hello World"
                  />
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="셀러"
                    defaultValue="Hello World"
                  />
                </FlexBox>
                {/* select */}
                {/* <FlexBox>
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {states.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </FlexBox> */}
                <FlexBox>
                  <FlexBox2>
                    {/* <Typography variant="body1" width="20%">
                    썸네일
                  </Typography> */}
                    <UploadBox>
                      <Button
                        component="label"
                        variant="outlined"
                        sx={{
                          marginRight: "1rem",
                          bgcolor: "#fff",
                          border: "none",
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.1)",
                          color: "#6C6C6C",
                          fontWeight: "500",
                          textTransform: "none",
                        }}
                      >
                        Thumbnail File
                        <input
                          type="file"
                          accept=".png"
                          hidden
                          onChange={handleFileUpload}
                        />
                      </Button>
                      {filename}
                    </UploadBox>
                  </FlexBox2>
                  <FlexBox2>
                    {/* <Typography variant="body1" width="20%">
                    fbx파일
                  </Typography> */}
                    <UploadBox>
                      <Button
                        component="label"
                        variant="outlined"
                        sx={{
                          marginRight: "1rem",
                          bgcolor: "#fff",
                          border: "none",
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.1)",
                          color: "#6C6C6C",
                          fontWeight: "500",
                          textTransform: "none",
                        }}
                      >
                        FBX File
                        <input
                          type="file"
                          accept=".png"
                          hidden
                          onChange={handleFileUpload}
                        />
                      </Button>
                      {filename}
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
