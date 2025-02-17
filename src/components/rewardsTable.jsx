import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { styles } from "../styles/rewardsTableStyles";
import { TABLE_LABELS } from "../constants/tableConstants";

const RewardsTable = ({ rewards, transactions }) => {
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const transactionDetails = useMemo(() => {
    return transactions?.filter(
      (transaction) => transaction.customerName === selectedCustomer
    );
  }, [transactions, selectedCustomer]);

  const handleCustomerChange = (e) => {
    const newValue = e.target.value;
    setSelectedCustomer(newValue);
  };

  return (
    <div style={styles.mainContainer}>
      <Container maxWidth="md" sx={styles.contentContainer}>
        <Typography variant="h3" component="h1" sx={styles.headerText}>
          {TABLE_LABELS.HEADER}
        </Typography>
        <FormControl fullWidth sx={styles.formControl}>
          <InputLabel id="customer-select-label" sx={styles.inputLabel}>
            {TABLE_LABELS.CUSTOMER_SELECT}
          </InputLabel>
          <Select
            labelId="customer-select-label"
            id="customer-select"
            value={selectedCustomer}
            label={TABLE_LABELS.CUSTOMER_SELECT}
            onChange={handleCustomerChange}
            displayEmpty
            sx={styles.select}
          >
            {Object.keys(rewards)?.map((customerName) => (
              <MenuItem
                key={customerName}
                value={customerName}
                sx={styles.menuItem}
              >
                {customerName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedCustomer && (
          <>
            <Card elevation={3} sx={styles.card}>
              <CardContent>
                <Typography variant="h5" sx={styles.cardTitle}>
                  {TABLE_LABELS.MONTHLY_SUMMARY}
                </Typography>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="rewards table">
                    <TableHead>
                      <TableRow sx={styles.tableHeader}>
                        <TableCell sx={styles.tableHeaderCell}>
                          {TABLE_LABELS.MONTH}
                        </TableCell>
                        <TableCell align="right" sx={styles.tableHeaderCell}>
                          {TABLE_LABELS.REWARDS_POINTS}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(rewards[selectedCustomer].monthly)?.map(
                        ([month, points]) => (
                          <TableRow key={month} sx={styles.tableRow}>
                            <TableCell component="th" scope="row">
                              {month}
                            </TableCell>
                            <TableCell align="right">{points}</TableCell>
                          </TableRow>
                        )
                      )}
                      <TableRow sx={styles.totalRow}>
                        <TableCell sx={styles.totalCell}>
                          {TABLE_LABELS.TOTAL_REWARDS}:
                        </TableCell>
                        <TableCell align="right" sx={styles.totalCell}>
                          {rewards[selectedCustomer].total}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            <Card elevation={3} sx={styles.card}>
              <CardContent>
                <Typography variant="h5" sx={styles.cardTitle}>
                  {TABLE_LABELS.TRANSACTION_HISTORY}
                </Typography>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="transactions table">
                    <TableHead>
                      <TableRow sx={styles.tableHeader}>
                        <TableCell sx={styles.tableHeaderCell}>
                          {TABLE_LABELS.TRANSACTION_ID}
                        </TableCell>
                        <TableCell sx={styles.tableHeaderCell}>
                          {TABLE_LABELS.DATE}
                        </TableCell>
                        <TableCell align="right" sx={styles.tableHeaderCell}>
                          {TABLE_LABELS.AMOUNT}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactionDetails?.map((transaction) => (
                        <TableRow key={transaction.id} sx={styles.tableRow}>
                          <TableCell>{transaction.id}</TableCell>
                          <TableCell>
                            {new Date(transaction.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="right">
                            ${transaction.amount.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </>
        )}
      </Container>
    </div>
  );
};

RewardsTable.propTypes = {
  rewards: PropTypes.objectOf(
    PropTypes.shape({
      monthly: PropTypes.objectOf(PropTypes.number).isRequired,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      customerName: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default RewardsTable;
