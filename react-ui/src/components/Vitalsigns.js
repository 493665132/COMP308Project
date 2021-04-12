import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Register = (props) => {
  const [state, setState] = useState({

    
      bodytemperature: '',
      hearrate: '',
      bloodpressure:'',
      respiratoryrate:'',
      patient:''
    

  });

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
      <h1>Add Vital Signs</h1>
      <Form className="vitalsigns-form" onSubmit={handleOnSubmit}>
        <Form.Group controlId="bodytemperature">
          <Form.Label>Body Temperature (℃)</Form.Label>
          <Form.Control
            type="text"
            step="any"
            placeholder="Enter body temperature "
            name="bodytemperature"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="hearrate">
          <Form.Label>Hear Rate (per minute)</Form.Label>
          <Form.Control
            type="number"
            step="any"
            placeholder="Enter heart rate "
            name="heartrate"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="bloodpressure">
          <Form.Label>Blood Pressure (systolic/diastolic mm Hg)</Form.Label>
          <Form.Control
            type="text"
            step="any"
            placeholder="Enter blood pressure "
            name="bloodpressure"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="respiratoryrate">
          <Form.Label>Respiratory Rate (per minute)</Form.Label>
          <Form.Control
            type="number"
            step="any"
            placeholder="Enter respiratory rate "
            name="respiratoryrate"
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
          Save
        </Button>
      </Form>
    </div>
  );
};
export default Register;
