import { useEffect, useState } from "react";
import "./App.css";
import { mockData } from "./components/data/mockData";
import { calculateCustomerTotalRewardsPoints } from "./components/utils/rewards";
import RewardsTable from "./components/RewardsTable";

function App() {
  const [rewards, setRewards] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockData);
        }, 1000);
      });
    };

    fetchData().then((data) => {
      const customerRewards = calculateCustomerTotalRewardsPoints(data);
      setRewards(customerRewards);
    });
  }, []);

  return (
    <div>
      {Object.keys(rewards).length === 0 ? (
        <p>Loading rewards points...</p>
      ) : (
        <RewardsTable rewards={rewards} transactions={mockData} />
      )}
    </div>
  );
}

export default App;
