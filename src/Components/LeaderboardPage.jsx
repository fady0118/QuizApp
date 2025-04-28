import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../config/firebase";
import LeaderboardItem from "./LeaderboardItem";
import "./css/Leaderboard.css";

const LeaderboardPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbref = ref(database, "results");
        const snapshot = await get(dbref);
        if (snapshot.exists()) {
          const rawData = snapshot.val();
          const dataArray = Object.entries(rawData).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          const orderedList = [...dataArray].sort((a, b) => b.grade - a.grade);
          setData(orderedList);
          console.log("data retrieved");
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="leaderboardContainer">
      {loading ? (
        <p>Loading Leaderboard...</p>
      ) : (
        data.map((result) => <LeaderboardItem key={result.id} data={result} />)
      )}
    </div>
  );
 };

export default LeaderboardPage;
