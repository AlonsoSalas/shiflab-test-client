import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Box,
  Snackbar,
  IconButton,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddButton from "../../components/AddButton";
import { get, post, del } from "../../../api/restApiClient";
import { DIALOG_ACTIONS, ERROR_MSG, PAGES_CONTENT } from "../../constants";

interface Course {
  id: number;
  name: string;
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
}

interface Result {
  id: number;
  course: Course;
  student: Student;
  score: string;
}

interface State {
  showModal: boolean;
  scores: Result[];
  courses: Course[];
  students: Student[];
  selectedCourseId: number;
  selectedStudentId: number;
  score: string;
  notificationOpen: boolean;
  notificationMessage: string;
  notificationSeverity: "success" | "error" | "warning" | "info";
}

class Results extends Component<{}, State> {
  state: State = {
    showModal: false,
    scores: [],
    courses: [],
    students: [],
    selectedCourseId: -1,
    selectedStudentId: -1,
    score: "",
    notificationOpen: false,
    notificationMessage: "",
    notificationSeverity: "success",
  };

  componentDidMount() {
    this.fetchCourses();
    this.fetchStudents();
    this.fetchResults();
  }

  fetchCourses = async () => {
    try {
      const data = await get<Course[]>("/courses");
      this.setState({ courses: data });
    } catch (error) {
      this.handleError(ERROR_MSG.ERROR_FETCHING_COURSES, error);
    }
  };

  handleNotificationOpen = (
    message: string,
    severity: State["notificationSeverity"]
  ) => {
    this.setState({
      notificationOpen: true,
      notificationMessage: message,
      notificationSeverity: severity,
    });
  };

  handleNotificationClose = () => {
    this.setState({ notificationOpen: false });
  };

  fetchStudents = async () => {
    try {
      const data = await get<Student[]>("/students");
      this.setState({ students: data });
    } catch (error) {
      this.handleError(ERROR_MSG.ERROR_FETCHING_STUDENTS, error);
    }
  };

  fetchResults = async () => {
    try {
      const data = await get<Result[]>("/results");
      this.setState({ scores: data });
    } catch (error) {
      this.handleError(ERROR_MSG.ERROR_FETCHING_RESULTS, error);
    }
  };

  handleError = (message: string, error: any) => {
    this.handleNotificationOpen(message, "error");
    console.error(message, error);
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as unknown as Pick<State, keyof State>);
  };

  handleScoreChange = (event: SelectChangeEvent<string>) => {
    this.setState({ score: event.target.value });
  };

  handleSubmit = async () => {
    const { selectedCourseId, selectedStudentId, score } = this.state;
    try {
      await post("/results", {
        courseId: selectedCourseId,
        studentId: selectedStudentId,
        score,
      });

      this.fetchResults();
      this.setState({
        showModal: false,
        selectedCourseId: -1,
        selectedStudentId: -1,
        score: "",
      });
      this.handleNotificationOpen(
        PAGES_CONTENT.RESULTS.CREATED_SUCCESSFULLY,
        "success"
      );
    } catch (error) {
      this.handleError(ERROR_MSG.ERROR_CREATING_RESULT, error);
    }
  };

  handleDelete = async (id: number) => {
    try {
      await del(`/results/${id}`);

      this.fetchResults();
      this.handleNotificationOpen(
        PAGES_CONTENT.RESULTS.DELETED_SUCCESSFULLY,
        "success"
      );
    } catch (error) {
      this.handleError(ERROR_MSG.ERROR_DELETING_RESULT, error);
    }
  };

  render() {
    const {
      showModal,
      scores,
      courses,
      students,
      selectedCourseId,
      selectedStudentId,
      score,
      notificationOpen,
      notificationSeverity,
      notificationMessage,
    } = this.state;

    const options = ["A", "B", "C", "D", "E", "F"].map((letter) => (
      <MenuItem key={letter} value={letter}>
        {letter}
      </MenuItem>
    ));

    return (
      <div>
        <h2>{PAGES_CONTENT.RESULTS.MODULE_TITLE}</h2>
        <p>{PAGES_CONTENT.RESULTS.MODULE_DESCRIPTION}</p>

        <AddButton
          onClick={this.handleOpenModal}
          buttonText={PAGES_CONTENT.RESULTS.ADD_RESULT_BUTTON_TEXT}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {PAGES_CONTENT.RESULTS.TABLE_HEADERS.map((header) => (
                  <TableCell>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>{result.id}</TableCell>
                  <TableCell>{result.course.name}</TableCell>
                  <TableCell>{result.student.firstName}</TableCell>
                  <TableCell>{result.score}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => this.handleDelete(result.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={showModal} onClose={this.handleCloseModal}>
          <DialogTitle>{PAGES_CONTENT.RESULTS.DIALOG_TITLE}</DialogTitle>
          <Box mt={2}>
            <DialogContent>
              <Box mb={2}>
                <FormControl fullWidth>
                  <InputLabel>Course</InputLabel>
                  <Select
                    value={selectedCourseId}
                    onChange={(e) =>
                      this.setState({
                        selectedCourseId: e.target.value as number,
                      })
                    }
                  >
                    {courses.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box mb={2}>
                <FormControl fullWidth>
                  <InputLabel>Select Student</InputLabel>
                  <Select
                    value={selectedStudentId}
                    onChange={(e) =>
                      this.setState({
                        selectedStudentId: e.target.value as number,
                      })
                    }
                  >
                    {students.map((student) => (
                      <MenuItem
                        key={student.id}
                        value={student.id}
                      >{`${student.firstName} ${student.lastName}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="score-label">Score</InputLabel>
                  <Select
                    labelId="score-label"
                    value={score}
                    onChange={this.handleScoreChange}
                  >
                    {options}
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
          </Box>
          <DialogActions>
            <Button onClick={this.handleCloseModal}>
              {DIALOG_ACTIONS.CANCEL_BUTTON_TEXT}
            </Button>
            <Button
              onClick={this.handleSubmit}
              disabled={!selectedCourseId || !selectedStudentId || !score}
            >
              {DIALOG_ACTIONS.SUBMIT_BUTTON_TEXT}
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={notificationOpen}
          autoHideDuration={6000}
          onClose={this.handleNotificationClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleNotificationClose}
            severity={notificationSeverity}
          >
            {notificationMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
}

export default Results;
