import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Register = (props) => {
  const [state, setState] = useState({

      _id:'',
      firstName: '',
      lastName: '',
      userName:'',
      password:''
    

  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/";

  // const saveNurse = (e) => {
  //   setShowLoading(true);
  //   e.preventDefault();
  //   const data = { firstName: nurse.firstName, lastName: nurse.lastName, userName: nurse.userName,
  //        password: nurse.password };
  //   axios.post(apiUrl, data)
  //     .then((result) => {
  //       setShowLoading(false);
  //       props.history.push('/shownurse/' + result.data._id)
  //     }).catch((error) => setShowLoading(false));
  // };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.history.push({
      pathname: "/vitalsigns",
      state,
    });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div>
      <h1>Nurse Sign Up</h1>
      <Form className="register-form" onSubmit={handleOnSubmit}>
        <Form.Group controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            step="any"
            placeholder="Enter first name "
            name="firstName"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            step="any"
            placeholder="Enter last name "
            name="lastName"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            step="any"
            placeholder="Enter user name "
            name="userName"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            step="any"
            placeholder="Enter password "
            name="password"
            onChange={handleInputChange}
          />
        </Form.Group>
        
        {/* <Label>
          Role
        </Label>
        <select>
          <option value= 'patient'>Patient</option>
          <option value= 'nurse'>Nurse</option>
        </select> */}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};
export default Register;
