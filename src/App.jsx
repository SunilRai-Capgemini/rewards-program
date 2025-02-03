import { useEffect, useState, useMemo } from "react";
import "./App.css";
import { mockData } from "../public/data/mockData";
import { useCalculateCustomerTotalRewardsPoints } from "./utils/rewards";
import RewardsTable from "./components/RewardsTable";

function App() {
  const [rewards, setRewards] = useState(null);
  const [error, setError] = useState(null);
  const calculateRewards = useCalculateCustomerTotalRewardsPoints();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (!mockData) {
              reject(new Error("Failed to fetch data"));
            }
            resolve(mockData);
          }, 1000);
        });

        const customerRewards = calculateRewards(response);
        setRewards(customerRewards);
        setError(null);
      } catch (error) {
        console.error("Error fetching or processing data:", error);
        setError("Failed to load rewards data. Please try again later.");
        setRewards(null);
      }
    };

    fetchData();
  }, [calculateRewards]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      {!rewards ? (
        <p>Loading rewards points...</p>
      ) : (
        <RewardsTable rewards={rewards} transactions={mockData} />
      )}
    </div>
  );
}

export default App;
