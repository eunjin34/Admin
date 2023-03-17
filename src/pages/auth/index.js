import { useCallback, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { AlertModal } from "src/components/Modal/AlertModal";
import { GoogleLogin } from "../api/auth/googleLogin";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();

  const [method, setMethod] = useState("email");
  const formik = useFormik({
    initialValues: {
      email: "demo@devias.io",
      password: "Password123!",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signIn(values.email, values.password);
        router.push("/");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  // const handleSkip = useCallback(() => {
  //   auth.skip();
  //   router.push("/");
  // }, [auth, router]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  // // 파이어베이스 구글 로그인
  // const handleGoogleLogin = async () => {
  //   const provider = new GoogleAuthProvider();
  //   console.log(googleAuth, provider);
  //   signInWithPopup(googleAuth, provider)
  //     .then((data) => {
  //       console.log(data);
  //       // setUserData(data.user.uid);
  //       // if(userData)login();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // toast({
  //       //   title: '구글 로그인 실패',
  //       //   status: 'error', //success:성공
  //       //   // description: "We've created your account for you.",
  //       //   duration: 3000,//시간
  //       //   isClosable: true, //닫기
  //       // });
  //     });
  // };

  return (
    <>
      <AlertModal open={open} onClose={handleClose} />
      <Head>
        <title>Login | Soulx Admin</title>
      </Head>

      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 1 }}>
              <Typography variant="h3">Welcome</Typography>
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>

            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              onClick={GoogleLogin}
            >
              Sign in with Google
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
