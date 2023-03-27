import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Link,
} from "@mui/material";
// import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { getList } from "../api/shop";

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataList, setDataList] = useState([]);

  // const customers = useCustomers(page, rowsPerPage);
  // const customersIds = useCustomerIds(customers);
  // const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback((e, value) => {
    console.log("페이지 변경시 실행");
    console.log(value);
    // 페이지 변경시 실행
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((e) => {
    console.log("리밋 변경시 실행");
    console.log(e.target.vlaue);
    // 리밋 변경시 실행
    setRowsPerPage(e.target.value);
  }, []);

  const shopList = async () => {
    const params = {
      page: page,
      limit: rowsPerPage,
    };
    const { data, statusCode } = await getList(params);
    if (statusCode === 200) {
      setDataList(data);
    }
  };

  const tabelTitle = ["제목", "설명", "가격", "등록일"];

  useEffect(() => {
    shopList();
  }, [page, rowsPerPage]);

  return (
    <>
      <Head>
        <title>Shop | Soulx Admin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Shop</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Link
                  component={NextLink}
                  href="/shop/post"
                  underline="hover"
                  variant="subtitle2"
                >
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Add
                  </Button>
                </Link>
              </div>
            </Stack>
            {/* <CustomersSearch /> */}
            <CustomersTable
              count={dataList.length}
              // items={customers}
              items={dataList}
              tableHead={tabelTitle}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
