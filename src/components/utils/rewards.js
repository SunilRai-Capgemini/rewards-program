export const calculateRewardsPoints = (amount) => {
  let points = 0;
  
  // Calculate 2 points for every dollar spent over $100
  if (amount > 100) {
    points += (amount - 100) * 2;
  }
  
  // Calculate 1 point for every dollar spent between $50-$100
  if (amount > 50) {
    const dollars = Math.min(amount, 100) - 50;
    points += dollars * 1;
  }
  
  return points;
};

export const calculateCustomerTotalRewardsPoints = (transactions) => {
  const rewardsPoints = {};
  transactions.forEach((transaction) => {
    const month = new Date(transaction.date).toLocaleString("default", {
      month: "long",
    });
    const points = calculateRewardsPoints(transaction.amount);
    if (!rewardsPoints[transaction.customerName]) {
      rewardsPoints[transaction.customerName] = {monthly :{}, total:0};
    }
    if (!rewardsPoints[transaction.customerName].monthly[month]) {
      rewardsPoints[transaction.customerName].monthly[month] = 0;
    }
    rewardsPoints[transaction.customerName].monthly[month] += points;
    rewardsPoints[transaction.customerName].total += points;
  });
  return rewardsPoints;
};
