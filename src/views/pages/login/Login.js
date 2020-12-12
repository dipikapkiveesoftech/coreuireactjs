import React, { useState, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Toast, Alert } from 'react-bootstrap';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import ToasterSep from '../../../reusable/ToasterSep';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      fields: {},
      errors: {},
      isShowToast: false,
      list:[]
    }

    this.handleChange = this.handleChange.bind(this);
    this.submituserLoginForm = this.submituserLoginForm.bind(this);

  };

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  submituserLoginForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fetch("http://localhost:3000/api/v1/users/")
        .then(res => res.json())
        .then(
          (result) => {
            console.log("resulkt", result);
            this.setState({
              isLoaded: true,
              items: result
            })
            this.setState({ list : [{
                    color: "success",
                    message : "Hello login"}] , isShowToast : true })
            window.location.href = '/#/home'
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
      // fields["email"] = "";
      // fields["password"] = "";
      // this.setState({ fields: fields });
      // this.setState({ setShow: true });
    }
  }

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

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
    this.setState({
      errors: errors
    });
    return formIsValid;
  }
  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
         {this.state.isShowToast ? <ToasterSep toastList={this.state.list}
              position="top-right"
              color={this.state.list.color} /> : null}
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm name="userLoginForm" onSubmit={this.submituserLoginForm}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" name="email" placeholder="Email" autoComplete="email" value={this.state.fields.email} onChange={this.handleChange} />
                      </CInputGroup>
                      <div className="errorMsg">{this.state.errors.email}</div>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" name="password" placeholder="Password" autoComplete="current-password" value={this.state.fields.password} onChange={this.handleChange} />
                      </CInputGroup>
                      <div className="errorMsg">{this.state.errors.password}</div>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary" type="submit" className="px-4">Login</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">Forgot password?</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

