import React, { useState, Component } from 'react'
import { CommonService } from '../../../comman';
import { Alert, Toast } from 'react-bootstrap';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

export default class Register extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      fields: {},
      errors: {},
      setShow: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.submituserRegisterForm = this.submituserRegisterForm.bind(this);
  };

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  submituserRegisterForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = this.state.fields;
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: fields["email"],
          mobile: fields["mobile"],
          password: fields["password"],
          name: fields["name"]
        })
      };
      console.log("req", requestOptions);
      fetch('http://localhost:3000/api/v1/users/', requestOptions)
        .then(async response => {
          const data = await response.json();
          if (!response.ok) {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          this.setState({ postId: data.id , setShow : true})
        })
        .catch(error => {
          this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
        });
      // window.location.href = '/'

    }
  }

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "*Please enter your Name.";
    }

    if (!fields["mobile"]) {
      formIsValid = false;
      errors["mobile"] = "*Please enter your Mobile No.";
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email.";
    }

    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email.";
      }
    }
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }
    if (!fields["npassword"]) {
      formIsValid = false;
      errors["npassword"] = "*Please enter your Confirm password.";
    }
    if (fields["npassword"] != fields["password"]) {
      formIsValid = false;
      errors["npassword"] = "*Please enter your same password.";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }
  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <Alert show={this.state.setShow} key="success" variant="success" onClose={() =>  window.location.href = '/'} dismissible>
          Registration Success....!!Now you can login!
          </Alert>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm name="userRegistrationForm" onSubmit={this.submituserRegisterForm}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Name" id="name" name="name" value={this.state.fields.name} onChange={this.handleChange} autoComplete="name" />
                    </CInputGroup>
                    <div className="errorMsg">{this.state.errors.name}</div>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-phone" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Mobile" id="mobile" name="mobile" value={this.state.fields.mobile} onChange={this.handleChange} autoComplete="mobile" />
                    </CInputGroup>
                    <div className="errorMsg">{this.state.errors.mobile}</div>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Email" id="email" name="email" value={this.state.fields.email} onChange={this.handleChange} autoComplete="email" />
                    </CInputGroup>
                    <div className="errorMsg">{this.state.errors.email}</div>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" id="password" name="password" value={this.state.fields.password} onChange={this.handleChange} autoComplete="new-password" />
                    </CInputGroup>
                    <div className="errorMsg">{this.state.errors.password}</div>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Repeat password" id="npassword" name="npassword" value={this.state.fields.npassword} onChange={this.handleChange} autoComplete="new-password" />
                    </CInputGroup>
                    <div className="errorMsg">{this.state.errors.npassword}</div>
                    <CButton type="submit" color="success" block>Create Account</CButton>
                  </CForm>
                </CCardBody>
                <CCardFooter className="p-4">
                  <CRow>
                    <CCol xs="12" sm="6">
                      <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                    </CCol>
                    <CCol xs="12" sm="6">
                      <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}
