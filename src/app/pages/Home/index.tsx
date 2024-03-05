import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to the ShiftLab Technical Assessment</h1>
        <p>
          This is a Single Page Application (SPA) designed for the ShiftLab Technical Assessment. 
          It provides a user-friendly interface for managing courses, students, and results. 
          With this application, you can perform various operations such as creating, reading, updating, and deleting records.
        </p>
        <p>
          Use the navigation links to access different sections of the application, 
          including Courses, Students, and Results management pages.
        </p>
      </div>
    );
  }
}

export default Home;