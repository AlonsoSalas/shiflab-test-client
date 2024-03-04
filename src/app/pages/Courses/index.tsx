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
  TextField,
  Snackbar,
  IconButton,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import { get, post, del } from "../../../api/restApiClient";
import AddButton from "../../components/AddButton";
import { DIALOG_ACTIONS, PAGES_CONTENT } from "../../constants";
import { ERROR_MSG } from "../../constants";

interface Course {
  id: number;
  name: string;
}

interface State {
  showModal: boolean;
  name: string;
  courses: Course[];
  notificationOpen: boolean;
  notificationMessage: string;
  notificationSeverity: "success" | "error" | "warning" | "info";
}

class Courses extends Component<{}, State> {
  state: State = {
    showModal: false,
    name: "",
    courses: [],
    notificationOpen: false,
    notificationMessage: "",
    notificationSeverity: "success",
  };

  componentDidMount() {
    this.fetchCourses();
  }

  fetchCourses = async () => {
    try {
      const data = await get<Course[]>("/courses");
      this.setState({ courses: data });
    } catch (error) {
      this.handleError(ERROR_MSG.ERROR_FETCHING_COURSES, error);
    }
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
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

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as unknown as Pick<State, keyof State>);
  };

  handleError = (message: string, error: any) => {
    this.handleNotificationOpen(message, "error");
    console.error(message, error);
  };

  handleSubmit = async () => {
    const { name } = this.state;
    try {
      await post<Course>("/courses", { name });

      this.fetchCourses();
      this.setState({ showModal: false, name: "" });
      this.handleNotificationOpen(
        PAGES_CONTENT.COURSE.COURSE_CREATED_SUCCESSFULLY,
        "success"
      );
    } catch (error) {
      this.handleError(ERROR_MSG.ERROR_CREATING_COURSE, error);
    }
  };

  handleDelete = async (id: number) => {
    try {
      await del(`/courses/${id}`);
      this.fetchCourses();
      this.handleNotificationOpen(
        PAGES_CONTENT.COURSE.COURSE_DELETED_SUCCESSFULLY,
        "success"
      );
    } catch (error) {
      this.handleError("Error deleting student", error);
    }
  };

  render() {
    const {
      showModal,
      name,
      courses,
      notificationOpen,
      notificationSeverity,
      notificationMessage,
    } = this.state;

    return (
      <div>
        <h2>{PAGES_CONTENT.COURSE.TITLE}</h2>
        <p>{PAGES_CONTENT.COURSE.DESCRIPTION}</p>

        <AddButton
          onClick={this.handleOpenModal}
          buttonText={PAGES_CONTENT.COURSE.ADD_BUTTON_TEXT}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {PAGES_CONTENT.COURSE.TABLE_HEADERS.map((header) => (
                  <TableCell>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell component="th" scope="row">
                    {course.id}
                  </TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => this.handleDelete(course.id)}
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
          <DialogTitle>{PAGES_CONTENT.COURSE.DIALOG_TITLE}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              name="name"
              value={name}
              onChange={this.handleInputChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseModal}>
              {DIALOG_ACTIONS.CANCEL_BUTTON_TEXT}
            </Button>
            <Button onClick={this.handleSubmit} disabled={!name}>
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

export default Courses;
