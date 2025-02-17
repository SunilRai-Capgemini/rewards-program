import { useEffect, useState } from "react";
import "./App.css";
import { mockData } from "../public/data/mockData";
import { useCalculateCustomerTotalRewardsPoints } from "./utils/rewards";
import RewardsTable from "./components/rewardsTable";
import logger from "./logger";

function App() {
  const [rewards, setRewards] = useState(null);
  const [error, setError] = useState(null);
  const calculateRewards = useCalculateCustomerTotalRewardsPoints();

  useEffect(() => {
    const fetchData = async () => {
      logger.info("Starting to fetch rewards data");
      try {
        const response = await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (!mockData) {
              reject(new Error("Failed to fetch rewards data"));
            }
            resolve(mockData);
          }, 1000);
        });

        const customerRewards = calculateRewards(response);
        logger.info(
          { customerRewards },
          "Successfully calculated customer rewards"
        );
        setRewards(customerRewards);
        setError(null);
      } catch (error) {
        logger.error({ error }, "Error fetching or processing rewards data");
        console.error("Error fetching or processing data:", error);
        setError("Failed to load rewards data. Please try again later.");
        setRewards(null);
      }
    };

    fetchData();
  }, [calculateRewards]);

  if (error) {
    logger.warn({ error }, "Rendering error message to user");
    return <div className="error-message">{error}</div>;
  }

  logger.debug({ rewards }, "Rendering rewards component");
  return (
    <>
      {!rewards ? (
        <p>Loading rewards points...</p>
      ) : (
        <RewardsTable rewards={rewards} transactions={mockData} />
      )}
    </>
  );
}

export default App;
