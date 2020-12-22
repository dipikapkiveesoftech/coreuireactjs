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
    CRow,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CBadge,
    CSelect,
    CToast,
    CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import ToasterSep from '../../../reusable/ToasterSep';
import Cspinner from '../../../reusable/CSpinner';
import { Redirect, Route, Link } from 'react-router-dom'

export default class Adduserlist extends Component {

    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            fields: {},
            errors: {},
            setShow: false,
            list: [],
            data: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.submituserRegisterForm = this.submituserRegisterForm.bind(this);
    }

    componentDidMount() {
        
    }
    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    }

    changeList() {
        window.location.href = '/#/user'
    }
    submituserRegisterForm(e) {
        e.preventDefault();

        if (this.validateForm()) {
            let fields = this.state.fields;
            // let data = this.state.data;
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: fields["email"],
                    mobile: fields["mobile"],
                    password: fields["password"],
                    name: fields["name"],
                    role: fields["role"]
                })
            }
            fetch('http://localhost:3000/api/v1/users/', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.id) {
                        this.setState({
                            list: [{
                                message: "Addedd user successfully",
                                color: "success",

                            }],
                            fields: [''],
                        })
                        // window.location.href = '/#/user'
                        // const error = (data && data.message) || response.status;
                        // return Promise.reject(error);
                    }
                    if (data.message) {
                        this.setState({
                            list: [{
                                message: "somting wrong",
                                color: "danger"
                            }]
                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        list: [{
                            message: "Network Error",
                            color: "danger"
                        }]
                    })
                });
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

        if (typeof fields["mobile"] !== "undefined") {
            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(fields["mobile"])) {
                formIsValid = false;
                errors["mobile"] = "*Please enter only number.";
            } else if (fields["mobile"].length != 10) {
                formIsValid = false;
                errors["mobile"] = "Please enter valid mobile number.";
            }
        }

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter your email.";
        }

        if (!fields["role"]) {
            formIsValid = false;
            errors["role"] = "*Please enter role.";
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
        if (fields["npassword"] !== fields["password"]) {
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
            <>
                <ToasterSep
                    toastList={this.state.list}
                    onClose={() => <Link to="/#/user" />} />
                <CCol xl={12}>
                    <CCard className="mx-4">
                        <CCardBody className="p-4">
                            <CForm name="userRegistrationForm" onSubmit={this.submituserRegisterForm}>
                                <h1>Add User</h1>
                                <CRow>
                                    <CCol xl={6}>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-user" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="text" placeholder="Name" id="name" name="name" value={this.state.fields.name} onChange={this.handleChange} autoComplete="name" />
                                        </CInputGroup>

                                        <div className="errorMsg">{this.state.errors.name}</div>
                                    </CCol>
                                    <CCol xl={6}>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-phone" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="text" placeholder="Mobile" id="mobile" name="mobile" value={this.state.fields.mobile} onChange={this.handleChange} autoComplete="mobile" />
                                        </CInputGroup>
                                        <div className="errorMsg">{this.state.errors.mobile}</div>
                                    </CCol>
                                </CRow>
                                <CInputGroup className="mb-3">
                                    <CInputGroupPrepend>
                                        <CInputGroupText>@</CInputGroupText>
                                    </CInputGroupPrepend>
                                    <CInput type="text" placeholder="Email" id="email" name="email" value={this.state.fields.email} onChange={this.handleChange} autoComplete="email" />
                                </CInputGroup>
                                <div className="errorMsg">{this.state.errors.email}</div>
                                <CRow>
                                    <CCol xl={6}>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="password" placeholder="Password" id="password" name="password" value={this.state.fields.password} onChange={this.handleChange} autoComplete="new-password" />
                                        </CInputGroup>
                                        <div className="errorMsg">{this.state.errors.password}</div>
                                    </CCol>
                                    <CCol xl={6}>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="password" placeholder="Repeat password" id="npassword" name="npassword" value={this.state.fields.npassword} onChange={this.handleChange} autoComplete="new-password" />
                                        </CInputGroup>
                                        <div className="errorMsg">{this.state.errors.npassword}</div>
                                    </CCol>
                                </CRow>
                                <CInputGroup className="mb-4">
                                    <CInputGroupPrepend>
                                        <CInputGroupText>
                                            <CIcon name="cil-lock-locked" />
                                        </CInputGroupText>
                                    </CInputGroupPrepend>
                                    <CSelect id="role" name="role" value={this.state.fields.role} onChange={this.handleChange}>
                                        <option value=''>Select user role</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                        <option value="staff">Staff</option>
                                        <option value="guest">Guest</option>
                                    </CSelect>
                                </CInputGroup>
                                <div className="errorMsg">{this.state.errors.role}</div>
                                <CButton type="submit" color="success" block>Add user</CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </>
        )
    }
}
