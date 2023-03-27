import PropTypes from "prop-types";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { useRouter } from "next/router";

export const CustomersTable = (props) => {
  const router = useRouter();
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    tableHead,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {tableHead?.map((el, idx) => {
                  return <TableCell key={idx}>{el}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.id);
                return (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isSelected}
                    onClick={() => {
                      if (router.pathname === "/shop")
                        router.push(`/shop/${customer.id}`);
                    }}
                  >
                    {customer?.title && (
                      <>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {customer.title}
                          </Typography>
                        </TableCell>
                        <TableCell>{customer.description}</TableCell>
                        <TableCell>{customer.price}</TableCell>
                        <TableCell>
                          {customer.createdAt.split("T")[0]}
                        </TableCell>
                      </>
                    )}
                    {customer?.name && (
                      <>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {customer.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>
                          {customer.createdAt.split("T")[0]}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
