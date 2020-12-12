import React, { useState, Component } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CForm, CInputGroup, CInput, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import moment from 'moment'

import usersData from '../../users/UsersData'

export default class Edituserlist extends Component {

    id = '';
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            fields: {},
            errors: {},
            setShow: false,
            list: [],
            data:[]
        }
        this.id = this.props.match.params.id
        this.handleChange = this.handleChange.bind(this);
        this.updateUserDetail = this.updateUserDetail.bind(this);
    }

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/users/' + this.id)
            .then(response => response.json())
            .then((data) => {
                this.setState({ fields: data })
            })
    }

    updateUserDetail(e) {
        e.preventDefault();

        if (this.validateForm()) {
            let fields = this.state.fields;
            // let data = this.state.data;
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: fields["email"],
                    mobile: fields["mobile"],
                    name: fields["name"],
                    role: fields["role"]
                })
            }
            console.log("ttt",requestOptions,this.id);
            fetch('http://localhost:3000/api/v1/users/'+this.id,{
                method: 'PUT',
                body : requestOptions
            })
            .then(response => response.json())
            .then(data => {
                    if (data.id) {
                        this.setState({
                            list: [{
                                title: "Success",
                                description: "Update user detail successfully",
                                color: "success"
                            }]
                        })
                        
                        // const error = (data && data.message) || response.status;
                        // return Promise.reject(error);
                    }
                    if(data.message){
                        this.setState({
                            list: [{
                                title: "Error",
                                description: data.message,
                                color: "danger"
                            }]
                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        list: [{
                            title: "Error",
                            description: "Network Error",
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
            }else if(fields["mobile"].length != 10){
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
        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    render() {
        return (
            <CRow>
                <CCol lg={6}>
                    <CCard>
                        <CCardHeader>
                            User id: {this.id}
                        </CCardHeader>
                        <CCardBody>
                            <CForm name="userRegistrationForm" onSubmit={this.updateUserDetail}>
                                <table className="table table-striped table-hover">
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td>
                                                <CInputGroup className="mb-3">
                                                    <CInput type="text" id="name" name="name" value={this.state.fields.name} onChange={this.handleChange} />
                                                </CInputGroup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>
                                                <CInputGroup className="mb-3">
                                                    <CInput type="text" id="email" name="email" value={this.state.fields.email} onChange={this.handleChange} />
                                                </CInputGroup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Phone</td>
                                            <td>
                                                <CInputGroup className="mb-3">
                                                    <CInput type="text" id="mobile" name="mobile" value={this.state.fields.mobile} onChange={this.handleChange} />
                                                </CInputGroup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Role</td>
                                            <td>
                                                <CInputGroup className="mb-3">
                                                    <CInput type="text" id="role" name="role" value={this.state.fields.role} onChange={this.handleChange} />
                                                </CInputGroup>
                                            </td>
                                        </tr>
                                        {/* <tr>
                                            <td>CurrentLogin</td>
                                            <td>
                                                <CInputGroup className="mb-3">
                                                    <CInput type="date" id="currentlogin" name="currentlogin" value={moment(this.state.userDetails.currentLogin).format("yyyy-MM-dd")} onChange={this.handleChange} />
                                                </CInputGroup>
                                            </td>
                                        </tr> */}
                                    </tbody>
                                </table>
                                <CButton type="submit" color="success" block>Update</CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow >
        )
    }
}
