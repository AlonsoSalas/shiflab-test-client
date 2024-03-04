import React from "react";
import { Routes, Route } from "react-router-dom";
import { HOME_ROUTE, COURSES_ROUTE, STUDENTS_ROUTE, RESULTS_ROUTE } from "../constants";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import Students from "../pages/Students";
import Results from "../pages/Results";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />} />
      <Route path={COURSES_ROUTE} element={<Courses />} />
      <Route path={STUDENTS_ROUTE} element={<Students />} />
      <Route path={RESULTS_ROUTE} element={<Results />} />
    </Routes>
  );
};

export default AppRoutes;
