import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const firstNameErrorText = "First name must be at least 3 symbols";

  const [lastName, setLastName] = useState("");
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const lastNameErrorText = "Last name must be maximum 15 symbols";

  const [password, setPassword] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [terms, setTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Email validation
    setIsEmailValid(validateEmail(email));
    if (!email) {
      setEmailErrorText("This field is required");
    } else {
      setEmailErrorText("Please enter a valid email");
    }

    //First name validation
    setIsFirstNameValid(validateFirstName(firstName));

    //Last name validation
    setIsLastNameValid(validateLastName(lastName));

    //Password validation
    setIsPasswordValid(validatePassword(password));
    if (!password) {
      setPasswordErrorText("This field is required");
    } else {
      setPasswordErrorText(
        "The password must contain at least 1 uppercase letter, at least 1 special character, at least 1 number"
      );
    }

    //Terms validation
    if (terms) {
      setTermsError(false);
    } else {
      setTermsError(true);
    }

    if (
      isEmailValid &&
      isFirstNameValid &&
      isLastNameValid &&
      isPasswordValid &&
      terms
    ) {
      registerUser();
    }
  };

  const registerUser = async () => {
    try {
      const res = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: `${email}`,
          first_name: `${firstName}`,
          last_name: `${lastName}`,
          password: `${password}`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("id", data["id"]);
        navigate("/profile");
      } else {
        throw new Error(
          `${res.status}: ${res.statusText} \n${await res.text()}`
        );
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //Validations
  const validateEmail = (email) => {
    var re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validateFirstName = (firstName) => {
    return firstName.length >= 3;
  };

  const validateLastName = (lastName) => {
    return lastName.length <= 15;
  };

  const validatePassword = (password) => {
    var re = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return re.test(password);
  };

  //Handle changes
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTermsChange = (event) => {
    setTerms(event.target.checked);
  };

  return (
    <Container>
      <Box
        className={styles.box}
        maxWidth={"md"}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e)}
      >
        <TextField
          fullWidth
          required
          type="email"
          label="Email"
          error={!isEmailValid}
          helperText={!isEmailValid && emailErrorText}
          onChange={(e) => handleEmailChange(e)}
        />
        <TextField
          fullWidth
          type="text"
          label="First name"
          error={!isFirstNameValid}
          helperText={!isFirstNameValid && firstNameErrorText}
          onChange={(e) => handleFirstNameChange(e)}
        />
        <TextField
          fullWidth
          type="text"
          label="Last name"
          error={!isLastNameValid}
          helperText={!isLastNameValid && lastNameErrorText}
          onChange={(e) => handleLastNameChange(e)}
        />
        <TextField
          fullWidth
          required
          type="password"
          label="Password"
          error={!isPasswordValid}
          helperText={!isPasswordValid && passwordErrorText}
          onChange={(e) => handlePasswordChange(e)}
        />
        <FormControl>
          <FormControlLabel
            label="Terms Accepted"
            control={
              <Checkbox required checked={terms} onChange={handleTermsChange} />
            }
          />
          {termsError && (
            <FormHelperText error>You must accept terms</FormHelperText>
          )}
        </FormControl>
        <Button variant="contained" type="submit">
          Register !
        </Button>
      </Box>
    </Container>
  );
}
