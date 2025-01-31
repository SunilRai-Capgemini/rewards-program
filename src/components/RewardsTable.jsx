/* eslint-disable react/prop-types */
import { useState } from "react";
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

const RewardsTable = ({ rewards, transactions }) => {
  const [selectedCustomer, setSelectedCustomer] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem 0",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          borderRadius: 4,
          padding: "2rem",
          background: "#000",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(0, 0, 0, 0.18)",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            textAlign: "center",
            fontWeight: 600,
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            py: 4,
            mb: 2,
          }}
        >
          Customer Rewards Points
        </Typography>
        <FormControl
          fullWidth
          sx={{
            mb: 4,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#2196F3",
              },
            },
          }}
        >
          <InputLabel
            id="customer-select-label"
            sx={{
              color: "#fff",
              "&.Mui-focused": {
                color: "#2196F3",
              },
            }}
          >
            Select Customer
          </InputLabel>
          <Select
            labelId="customer-select-label"
            id="customer-select"
            value={selectedCustomer}
            label="Select Customer"
            onChange={(e) => setSelectedCustomer(e.target.value)}
            displayEmpty
            sx={{
              color: "#fff",
              ".MuiSelect-icon": {
                color: "#fff",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2196F3",
              },
            }}
          >
            {Object.keys(rewards).map((customerName) => (
              <MenuItem
                key={customerName}
                value={customerName}
                sx={{
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                {customerName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedCustomer && (
          <>
            <Card
              elevation={3}
              sx={{
                mb: 4,
                borderRadius: 2,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: "#2196F3",
                  }}
                >
                  Monthly Rewards Summary
                </Typography>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="rewards table">
                    <TableHead>
                      <TableRow
                        sx={{
                          background:
                            "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        }}
                      >
                        <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                          Month
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: "bold", color: "white" }}
                        >
                          Rewards Points
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(rewards[selectedCustomer].monthly).map(
                        ([month, points]) => (
                          <TableRow
                            key={month}
                            sx={{
                              "&:nth-of-type(odd)": {
                                backgroundColor: "rgba(245, 245, 245, 0.9)",
                              },
                              "&:hover": {
                                backgroundColor: "#e3f2fd",
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {month}
                            </TableCell>
                            <TableCell align="right">{points}</TableCell>
                          </TableRow>
                        )
                      )}
                      <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Total Rewards :
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          {rewards[selectedCustomer].total}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            <Card
              elevation={3}
              sx={{
                borderRadius: 2,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: "#2196F3",
                  }}
                >
                  Transaction History
                </Typography>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="transactions table">
                    <TableHead>
                      <TableRow
                        sx={{
                          background:
                            "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        }}
                      >
                        <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                          Transaction ID
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                          Date
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: "bold", color: "white" }}
                        >
                          Amount ($)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions
                        .filter(
                          (transaction) =>
                            transaction.customerName === selectedCustomer
                        )
                        .map((transaction) => (
                          <TableRow
                            key={transaction.id}
                            sx={{
                              "&:nth-of-type(odd)": {
                                backgroundColor: "rgba(245, 245, 245, 0.9)",
                              },
                              "&:hover": {
                                backgroundColor: "#e3f2fd",
                              },
                              transition: "background-color 0.2s ease",
                            }}
                          >
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

export default RewardsTable;
