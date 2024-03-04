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

import { validateAge, validateEmail } from "./utils/validationUtils";
import AddButton from "../../components/AddButton";
import { get, post, del } from "../../../api/restApiClient";
import { DIALOG_ACTIONS, ERROR_MSG, PAGES_CONTENT } from "../../constants";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
}

interface State {
  showModal: boolean;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  students: Student[]; // Add this line
  ageError: string;
  emailError: string;
  notificationOpen: boolean;
  notificationMessage: string;
  notificationSeverity: "success" | "error" | "warning" | "info";
}

class Students extends Component<{}, State> {
  state: State = {
    showModal: false,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    students: [],
    ageError: "",
    emailError: "",
    notificationOpen: false,
    notificationMessage: "",
    notificationSeverity: "success",
  };

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = async () => {
    try {
      const data = await get<Student[]>("/students");
      this.setState({ students: data });
    } catch (error) {
      this.handleError(ERROR_MSG.ERROR_FETCHING_STUDENTS, error);
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

    if (name === "dateOfBirth") {
      this.setState({ ageError: validateAge(value) });
    }
    if (name === "email") {
      this.setState({ emailError: validateEmail(value) });
    }
  };

  handleSubmit = async () => {
    const { firstName, lastName, dateOfBirth, email, ageError, emailError } =
      this.state;
    if (
      firstName &&
      lastName &&
      dateOfBirth &&
      email &&
      !ageError &&
      !emailError
    ) {
      try {
        await post("/students", {
          firstName,
          lastName,
          dateOfBirth,
          email,
        });

        this.fetchStudents();
        this.setState({
          showModal: false,
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          email: "",
        });
        this.handleNotificationOpen(
          PAGES_CONTENT.STUDENTS.CREATED_SUCCESSFULLY,
          "success"
        );
      } catch (error) {
        this.handleError(ERROR_MSG.ERROR_CREATING_STUDENT, error);
      }
    }
  };

  handleDelete = async (id: number) => {
    try {
      await del(`/students/${id}`);

      this.fetchStudents();
      this.handleNotificationOpen(
        PAGES_CONTENT.STUDENTS.DELETED_SUCCESSFULLY,
        "success"
      );
    } catch (error) {
      this.handleError(ERROR_MSG.ERROR_DELETING_STUDENT, error);
    }
  };

  render() {
    const {
      showModal,
      firstName,
      lastName,
      dateOfBirth,
      email,
      students,
      ageError,
      emailError,
      notificationOpen,
      notificationSeverity,
      notificationMessage,
    } = this.state;

    const isDisabled =
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !email ||
      !!ageError ||
      !!emailError;

    return (
      <div>
        <h2>{PAGES_CONTENT.STUDENTS.MODULE_TITLE}</h2>
        <p>{PAGES_CONTENT.STUDENTS.MODULE_DESCRIPTION}</p>

        <AddButton onClick={this.handleOpenModal} buttonText={PAGES_CONTENT.STUDENTS.ADD_RESULT_BUTTON_TEXT} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {PAGES_CONTENT.STUDENTS.TABLE_HEADERS.map((header) => (
                  <TableCell>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell component="th" scope="row">
                    {student.id}
                  </TableCell>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.dateOfBirth}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => this.handleDelete(student.id)}
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
          <DialogTitle>{PAGES_CONTENT.STUDENTS.DIALOG_TITLE}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={this.handleInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={this.handleInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={this.handleInputChange}
              fullWidth
              error={!!ageError}
              helperText={ageError}
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={this.handleInputChange}
              fullWidth
              error={!!emailError}
              helperText={emailError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseModal}>{DIALOG_ACTIONS.CANCEL_BUTTON_TEXT}</Button>
            <Button
              onClick={this.handleSubmit}
              disabled={isDisabled} // Use the calculated disabled state
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

export default Students;
