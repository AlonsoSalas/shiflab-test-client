export const HOME_ROUTE = "/";
export const COURSES_ROUTE = "/courses";
export const STUDENTS_ROUTE = "/students";
export const RESULTS_ROUTE = "/results";

export const HEADER_TITLE = "ShiftLabs Test";

export const LEFT_MENU_ITEMS = [
  { label: "Home", path: HOME_ROUTE },
  { label: "Courses", path: COURSES_ROUTE },
  { label: "Students", path: STUDENTS_ROUTE },
  { label: "Results", path: RESULTS_ROUTE },
];

export const MIN_AGE = 10;
export const AGE_ERROR_MESSAGE = "Age must be greater than 9";
export const EMAIL_ERROR_MESSAGE = "Invalid email format";

export const PAGES_CONTENT = {
  COURSE: {
    TITLE: "Courses Module",
    DESCRIPTION: `Access the Courses module to manage all aspects related to courses offered within the educational institution. Use it to add new courses or remove outdated ones. Navigate through the list of courses to view detailed information.`,
    ADD_BUTTON_TEXT: "Add Course",
    TABLE_HEADERS: ["ID", "Name", "Delete"],
    DIALOG_TITLE: "Add New Course",
    COURSE_CREATED_SUCCESSFULLY: "Course created successfully",
    COURSE_DELETED_SUCCESSFULLY: "Course deleted successfully",
  },
  RESULTS: {
    MODULE_TITLE: "Results Module",
    MODULE_DESCRIPTION:
      "Manage academic results and assessments using the Results module, which offers tools for recording and analyzing student performance.",
    ADD_RESULT_BUTTON_TEXT: "Add Result",
    CREATED_SUCCESSFULLY: "Result created successfully",
    DELETED_SUCCESSFULLY: "Result deleted successfully",
    DIALOG_TITLE: "Add New Result",
    TABLE_HEADERS: ["ID", "Course Name", "Student Name", "Score", "Delete"],
  },
  STUDENTS: {
    MODULE_TITLE: "Students Module",
    MODULE_DESCRIPTION:
      "Utilize the Students module to handle student-related operations, including registration.",
    ADD_RESULT_BUTTON_TEXT: "Add Student",
    CREATED_SUCCESSFULLY: "Student created successfully",
    DELETED_SUCCESSFULLY: "Student deleted successfully",
    DIALOG_TITLE: "Add New Student",
    TABLE_HEADERS: [
      "ID",
      "First Name",
      "Second Name",
      "Date of Birth",
      "Email",
      "Delete",
    ],
  },
};

export const DIALOG_ACTIONS = {
  CANCEL_BUTTON_TEXT: "Cancel",
  SUBMIT_BUTTON_TEXT: "Submit",
};

export const ERROR_MSG = {
  ERROR_FETCHING_COURSES: "Error fetching courses",
  ERROR_CREATING_COURSE: "Error creating course",
  ERROR_CREATING_STUDENT: "Error creating course",
  ERROR_DELETING_COURSE: "Error deleting course",
  ERROR_DELETING_STUDENT: "Error deleting student",
  ERROR_FETCHING_STUDENTS: "Error fetching students",
  ERROR_FETCHING_RESULTS: "Error fetching results",
  ERROR_CREATING_RESULT: "Error creating result",
  ERROR_DELETING_RESULT: "Error deleting result",
};
