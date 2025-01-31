/* global describe, it, test, expect */

import {
  calculateCustomerTotalRewardsPoints,
  calculateRewardsPoints,
} from "./rewards";

describe("calculateRewardsPoints", () => {
  it("should return 0 points for amount less than or equal to $50", () => {
    expect(calculateRewardsPoints(49)).toBe(0);
    expect(calculateRewardsPoints(50)).toBe(0);
  });

  it("should return correct points for amount between $50 and $100", () => {
    expect(calculateRewardsPoints(75)).toBe(25); 
    expect(calculateRewardsPoints(99)).toBe(49);  
  });

  it("should return correct points for amount over $100", () => {
    expect(calculateRewardsPoints(120)).toBe(90);
    expect(calculateRewardsPoints(200)).toBe(250);
  });
});

describe("calculateCustomerTotalRewardsPoints", () => {
  const mockData = [
    { id: 1, customerName: "John", amount: 120, date: "2024-01-01" }, 
    { id: 2, customerName: "John", amount: 75, date: "2024-02-01" }, 
    { id: 3, customerName: "Bobby", amount: 200, date: "2024-01-05" }, 
  ];

  test("should calculate monthly and total rewards for each customer", () => {
    const rewards = calculateCustomerTotalRewardsPoints(mockData);
    expect(rewards).toEqual({
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
        total: 250, 
      },
    });
  });
});
