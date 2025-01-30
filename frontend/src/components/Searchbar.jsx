import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilteredUsers } from "../features/userSlice";
import "../styles/searchbar.css"

const Searchbar = () => {
  const dispatch = useDispatch();
  const loggedusername = useSelector((state) => state.user.loggedusername);
  const allusers = useSelector((state) => state.user.alluser);
  const handleuserlistchange = (e) => {
    const searchValue = e.target.value.toLowerCase();

    if (searchValue.trim() === "") {
      dispatch(setFilteredUsers(allusers));
    } else {
      const filteredUsers = allusers.filter((user) =>
        user.username.toLowerCase().includes(searchValue)
      );
      dispatch(setFilteredUsers(filteredUsers));
    }
  };
  return (
    <div className="search-bar-container">
      <h4>Welcome {loggedusername}</h4>
      <input type="text" onChange={handleuserlistchange} className="search-bar" />
    </div>
  );
};

export default Searchbar;
