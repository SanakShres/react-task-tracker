import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, toggleAddTaskForm, showAddTask }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAddTask ? "red" : "Green"}
        text={showAddTask ? "Close" : "Add"}
        onclick={toggleAddTaskForm}
      />
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
