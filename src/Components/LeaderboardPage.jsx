import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../config/firebase";
import LeaderboardItem from "./LeaderboardItem";
import "./css/Leaderboard.css";
import { IoSearch } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";

const LeaderboardPage = () => {
  const [data, setData] = useState([]);
  const [AllfilteredData, setAllfilteredData] = useState([]);
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
          console.log(orderedList);
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

  useEffect(() => {
    setAllfilteredData(data);
  }, [data]);

  const [inputvalue, setInputValue] = useState("");
  const handleSearch = (keyword) => {
    const olddata = data;
    const filterDataByCategory = olddata.filter((element) =>
      element.category.toLowerCase().includes(keyword.toLowerCase())
    );
    const filterDataByUserName = olddata.filter((element) =>
      element.userName.toLowerCase().includes(keyword.toLowerCase())
    );
    const Allfiltereddata = Array.from(
      new Set([...filterDataByCategory, ...filterDataByUserName])
    );
    setAllfilteredData(Allfiltereddata);
  };

  const toggleBorder = () => {
    document
      .getElementById("search-filter")
      .classList.toggle("search-filter-bordered");
  };
  return (
    <div className="leaderboardContainer">
      <div id="search-filter">
        <input
          type="text"
          name="leaderboardSearch"
          id="leaderboardSearch"
          placeholder="Search by user name or category..."
          value={inputvalue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={toggleBorder}
          onBlur={toggleBorder}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleSearch(inputvalue);
            }
          }}
        />
        <button
          className="leaderboardSearchButton"
          onClick={() => handleSearch(inputvalue)}
        >
          <IoSearch />
        </button>
      </div>
      {loading ? (
        <p>Loading Leaderboard...</p>
      ) : (
        <div className="leaderboardResults">
          {AllfilteredData.map((result) => (
            <LeaderboardItem key={result.id} data={result} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;
