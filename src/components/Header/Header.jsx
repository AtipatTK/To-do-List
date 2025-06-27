import React from "react";
import "./Header.css"

function Header({ value, onChange }) {
    return (
        <div className="container-header">
            <div className="label-header">
                Filter:
            </div>
            <select value={value} onChange={onChange} className="select-header">
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
            </select>
        </div>

    )
}

export default Header;
