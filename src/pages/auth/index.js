import React, { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { AlertModal } from "src/components/Modal/AlertModal";

const Page = () => {
  const auth = useAuth();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const login = async () => {
    try {
      await auth.googleLogin();
    } catch (err) {
      console.log(err);
    }
  };

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
              onClick={login}
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
