import React from "react";
import { FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";
import "./index.css";

const SearchBar = (props) => {
    return (
        <div className="Search">
            <span className="SearchSpan">
                <FaSearch />
            </span>
            <input
                className="SearchInput"
                type="text"
                onChange={props.onChange}
                placeholder={props.placeholder}
            />
        </div>
    );
};

SearchBar.propTypes = {
    /**
     *  Function to run when onChange event is triggered
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Text placeholder for the search bar
     */
    placeholder: PropTypes.string.isRequired,
};

export default SearchBar;