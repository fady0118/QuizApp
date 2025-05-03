import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../config/firebase";
import LeaderboardItem from "./LeaderboardItem";
import "./css/Leaderboard.css";
import { IoSearch } from "react-icons/io5";
import { TbFilterDown } from "react-icons/tb";
import Art from "../assets/ArtBg.png";
import Music from '../assets/MusicBg.png'
import PC from '../assets/ComputersBg.png'
import Maths from '../assets/MathsBg.png'
import Anime from '../assets/AnimeBg.png'
import Games from '../assets/GamesBg.png'
import Mythos from '../assets/MythBg.png'
import loadingImg from '../assets/loading.png'

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

  // search & filtering
  const [inputvalue, setInputValue] = useState("");
  const splitKeywords = (searchString) => {
    return searchString
      .toLowerCase()
      .split(" ")
      .filter((keyword) => keyword.trim() !== "");
  };
  const handleSearch = (searchString) => {
    console.log('searchString: ',searchString)
    const keywords = splitKeywords(searchString);
    const olddata = data;
    if (keywords.length <= 0) {
      setAllfilteredData(olddata);
      return;
    }
    // Filter data based on category or username matching any keyword
    const filteredData = olddata.filter((element) =>
      keywords.some(
        (keyword) =>
          element.category.toLowerCase().includes(keyword) ||
          element.userName.toLowerCase().includes(keyword)
      )
    );
    setAllfilteredData(filteredData);
  };

  const [filterItems, setFilterItems] = useState([]);

  const activateElement = (event) => {
    const newId = event.target.id;
    console.log('newId',newId)
    setFilterItems((prev)=>prev.includes(newId)?prev.filter(id=>id!==newId):[...prev,newId]);
  };

  const filterResults = (filterItems) => {
    if (filterItems.length <= 0) {
      handleSearch('');
      return;
    }
    const filterstring = filterItems.toString().replaceAll(",", " ");
    handleSearch(filterstring);
  };

  useEffect(() => {
    // // clear old classes
    // const allfilterImagesIds = [
    //   "Art",
    //   "Music",
    //   "Computers",
    //   "Mathematics",
    //   "Anime",
    //   "Games",
    //   "Mythology",
    // ];
    // allfilterImagesIds.map((item) =>
    //   document.getElementById(item).classList.remove("activeFilter")
    // );
    console.log('filterItems', filterItems);
    // add class to filtered items
    // filterItems.map((item) => {
    //   document.getElementById(item).classList.add("activeFilter");
    // });
    filterResults(filterItems);
  }, [filterItems]);

const handleFilterPopup = ()=>{
  const filterPopup = document.querySelector(".filterPopup");
  filterPopup.classList.toggle('visible')

}

  const toggleBorder = () => {
    document
      .getElementById("search-filter")
      .classList.toggle("search-filter-bordered");
  };

  return (
    <div className="leaderboardContainer">
      <div className="leaderboardSearchbar">
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
        <div className="leaderboardFilterbar">
          <div className="filterIcon" onClick={handleFilterPopup}>
            <TbFilterDown />
          </div>
          <div className="filterPopup">
            <div className="filterItem" onClick={(e) => activateElement(e)}>
            <div>Art</div>
              <img
                id="Art"
                className={filterItems.includes('Art')?'activeFilter':''}
                style={{ width: "100%", height: "100%" }}
                src={Art}
                alt=""
              />
            </div>
            <div className="filterItem" onClick={(e) => activateElement(e)}>
              <div>Music</div>
              <img
                id="Music"
                className={filterItems.includes('Music')?'activeFilter':''}
                style={{ width: "100%", height: "100%" }}
                src={Music}
                alt=""
              />
            </div>
            <div className="filterItem" onClick={(e) => activateElement(e)}>
            <div>PC</div>
              <img
                id="Computers"
                className={filterItems.includes('Computers')?'activeFilter':''}
                style={{ width: "100%", height: "100%" }}
                src={PC}
                alt=""
              />
            </div>
            <div className="filterItem" onClick={(e) => activateElement(e)}>
            <div>Maths</div>
              <img
                id="Mathematics"
                className={filterItems.includes('Mathematics')?'activeFilter':''}
                style={{ width: "100%", height: "100%" }}
                src={Maths}
                alt=""
              />
            </div>
            <div className="filterItem" onClick={(e) => activateElement(e)}>
            <div>Anime</div>
              <img
                id="Anime"
                className={filterItems.includes('Anime')?'activeFilter':''}
                style={{ width: "100%", height: "100%" }}
                src={Anime}
                alt=""
              />
            </div>
            <div className="filterItem" onClick={(e) => activateElement(e)}>
            <div>Games</div>
              <img
                id="Games"
                className={filterItems.includes('Games')?'activeFilter':''}
                style={{ width: "100%", height: "100%" }}
                src={Games}
                alt=""
              />
            </div>
            <div className="filterItem" onClick={(e) => activateElement(e)}>
            <div>Mythos</div>
              <img
                id="Mythology"
                className={filterItems.includes('Mythology')?'activeFilter':''}
                style={{ width: "100%", height: "100%" }}
                src={Mythos}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="loadingScreenContainer">
                      <img src={loadingImg} alt="" className="loadingscreenImg"/>
                      <p>loading leaderboard</p>
                    </div>
        // <p>Loading Leaderboard...</p>
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
