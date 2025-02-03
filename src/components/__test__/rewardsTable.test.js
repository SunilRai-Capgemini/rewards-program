/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import RewardsTable from "../RewardsTable";
import "@testing-library/jest-dom";

const mockRewards = {
  "John": { 
    monthly: { 
      "January": 90,
      "February": 25
    }, 
    total: 115
  },
  "Bobby": { 
    monthly: { 
      "January": 250
    }, 
    total: 250
  }
};

const mockTransactions = [
  { id: 1, customerName: "John", amount: 120, date: "2024-01-01" },
  { id: 2, customerName: "John", amount: 75, date: "2024-02-01" },
  { id: 3, customerName: "Bobby", amount: 200, date: "2024-01-05" }
];

describe("RewardsTable", () => {
  beforeEach(() => {
    render(
      <RewardsTable 
        rewards={mockRewards} 
        transactions={mockTransactions} 
      />
    );
  });

  test("renders the title", () => {
    expect(screen.getByText("Customer Rewards Points")).toBeInTheDocument();
  });

  test("renders the customer select dropdown", () => {
    expect(screen.getByLabelText("Select Customer")).toBeInTheDocument();
  });

  test("shows customer names in dropdown", () => {
    const select = screen.getByLabelText("Select Customer");
    fireEvent.mouseDown(select);
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Bobby")).toBeInTheDocument();
  });

  test("displays rewards data when customer is selected", () => {
    // Select John
    const select = screen.getByLabelText("Select Customer");
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText("John"));

    // Check if Monthly Rewards Summary is displayed
    expect(screen.getByText("Monthly Rewards Summary")).toBeInTheDocument();
    expect(screen.getByText("January")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();
    expect(screen.getByText("February")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("115")).toBeInTheDocument();

    // Check if Transaction History is displayed
    expect(screen.getByText("Transaction History")).toBeInTheDocument();
    expect(screen.getByText("$120.00")).toBeInTheDocument();
    expect(screen.getByText("$75.00")).toBeInTheDocument();
  });

  test("filters transactions for selected customer", () => {
    // Select Bobby
    const select = screen.getByLabelText("Select Customer");
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText("Bobby"));

    // Should only show Bobby's transaction
    expect(screen.getByText("$200.00")).toBeInTheDocument();
    expect(screen.queryByText("$120.00")).not.toBeInTheDocument();
    expect(screen.queryByText("$75.00")).not.toBeInTheDocument();
  });

  test("displays correct rewards total for selected customer", () => {
    // Select Bobby
    const select = screen.getByLabelText("Select Customer");
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText("Bobby"));

    // Check Bobby's total rewards
    const totalCells = screen.getAllByText("250");
    expect(totalCells.length).toBeGreaterThan(0);
  });
});