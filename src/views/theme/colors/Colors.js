import React, { useEffect, useState, createRef, Component } from 'react'
import { useDispatch, connect } from 'react-redux'
import { Alert, Toast, Button } from 'react-bootstrap';
import {
   CCard,
   CCardBody,
   CCol,
   CFormGroup,
   CSpinner,
   CFormText,
   CForm,
   CLabel,
   CInput,
   CInputCheckbox,
   CRow,
   CHeader,
   CTextarea,
   CSelect,
   CDropdown,
   CDropdownToggle,
   CDropdownMenu,
   CDropdownItem,
   CInputRadio,
   CSwitch,
   CToaster,
   CToast,
   CToastHeader,
   CToastBody,
   CCardHeader,
   CButton,
   CInputFile,
   CAlert
} from '@coreui/react'
import { boolean, number, text, select } from '@storybook/addon-knobs';
export default class Colors extends Component {

   constructor(props) {
      super(props);
      this.state = {
         error: null,
         isLoaded: false,
         items: [],
         fields: {},
         errors: {},
         setShow: false,
         isLoaded: false
      }
   }

   // componentWillMount() {
   //    setTimeout(function () { //Start the timer
   //       this.setState({ isLoaded: true }) //After 1 second, set render to true
   //    }.bind(this), 2000)
   // }

   render() {

      return (
         <>
            {/* <div class="toaster toaster-top-right">
               <div class="toast toast-fade show" role="alert" aria-live="assertive" aria-atomic="true">
                  <div class="toast-header">Toast title<button class="close ml-auto" aria-label="Close">×</button></div>
                  <div class="toast-body">This is a toast in static positioned toaster number 1.</div>
               </div>
            </div> */}
<CToast
        className='class-name'
        show
        autohide
        fade
      >
        CToast
      </CToast>
            <CAlert
                  aria-live="assertive"
                  aria-atomic="true"
                  className='class-name'
                  closeButton
                  color='warning'
                  show={this.state.setShow}>
                  You are welcome..........!!
                </CAlert>
            <CCol lg="12" md="16" xs="2">
               <CCard>
                  <CCardHeader>Registration Form</CCardHeader>
                  <CCardBody>
                     <CFormText className='class-name' color='warning'>
                        CFormText
                        </CFormText>
                     <CForm action="" method="post">
                        <CFormGroup>
                           <CRow>
                              <CCol lg="2" md="2" xs="4">
                                 <CLabel htmlFor="nf-name">Name</CLabel>
                              </CCol>
                              <CCol lg="10" md="14" xs="20">
                                 <CInput
                                    type="Username"
                                    id="nf-name"
                                    name="nf-name"
                                    placeholder="Enter Name.."
                                    autoComplete="name"
                                 />
                                 <CFormText className="help-block">Please enter your name</CFormText>
                              </CCol>
                           </CRow>
                        </CFormGroup>
                        <CFormGroup>
                           <CRow>
                              <CCol lg="2" md="2" xs="4">
                                 <CLabel htmlFor="nf-email">Email</CLabel>
                              </CCol>
                              <CCol lg="10" md="14" xs="20">
                                 <CInput
                                    type="email"
                                    id="nf-email"
                                    name="nf-email"
                                    placeholder="Enter Email.."
                                    autoComplete="email"
                                 />
                                 <CFormText className="help-block">Please enter your email</CFormText>
                              </CCol>
                           </CRow>
                        </CFormGroup>
                        <CFormGroup>
                           <CRow>
                              <CCol lg="2" md="2" xs="4">
                                 <CLabel htmlFor="nf-password">Password</CLabel>
                              </CCol>
                              <CCol lg="10" md="14" xs="20">
                                 <CInput
                                    type="password"
                                    id="nf-password"
                                    name="nf-password"
                                    placeholder="Enter Password.."
                                    autoComplete="current-password"
                                 />
                                 <CFormText className="help-block">Please enter your password</CFormText>
                              </CCol>
                           </CRow>
                        </CFormGroup>

                        <CFormGroup>
                           <CRow>
                              <CCol lg="2" md="2" xs="4">
                                 <CLabel htmlFor="nf-password">Date Of Birth</CLabel>
                              </CCol>
                              <CCol lg="10" md="14" xs="20">
                                 <CInput
                                    type="date"
                                    id="nf-dob"
                                    name="nf-dob"
                                    placeholder="dd/mm/yy"
                                    autoComplete="dob"
                                 />
                                 <CFormText className="help-block">Please enter your Date of Birth</CFormText>
                              </CCol>
                           </CRow>
                        </CFormGroup>
                        <CFormGroup>
                           <CRow>
                              <CCol lg="2" md="2" xs="4">
                                 <CLabel htmlFor="nf-password">Date of Time</CLabel>
                              </CCol>
                              <CCol lg="10" md="14" xs="20">
                                 <CInput
                                    type="time"
                                    id="nf-dot"
                                    name="nf-dot"
                                    placeholder="hh:mm"
                                    autoComplete="current-dot"
                                 />
                                 <CFormText className="help-block">Please enter your date of time</CFormText>
                              </CCol>
                           </CRow>
                        </CFormGroup>
                        <CFormGroup>
                           <CRow>
                              <CCol lg="2" md="2" xs="4">
                                 <CLabel htmlFor="nf-add">Address</CLabel>
                              </CCol>
                              <CCol lg="10" md="14" xs="20">
                                 <CTextarea
                                    type="text"
                                    id="nf-add"
                                    rows="6"
                                    name="nf-add"
                                    placeholder="Enter Address.."
                                    autoComplete="current-add"
                                 />
                                 <CFormText className="help-block">Please enter your Address</CFormText>
                              </CCol>
                           </CRow>
                        </CFormGroup>
                        <CFormGroup>
                           <CRow>
                              <CCol lg="2" md="2" xs="4">
                                 <CLabel htmlFor="nf-country">Select Country</CLabel>
                              </CCol>
                              <CCol lg="10" md="14" xs="20">
                                 <CSelect>
                                    <option>Select Country ...</option>
                                    <option>India</option>
                                    <option>USA</option>
                                    <option>Canada</option>
                                    <option>UAE</option>
                                    <option>UK</option>
                                 </CSelect>
                                 <CFormText className="help-block">Please enter your country</CFormText>
                              </CCol>
                           </CRow>
                        </CFormGroup>
                        <CFormGroup>
                           <CRow>
                              <CCol lg="2" md="2" xs="4">
                                 <CLabel htmlFor="nf-city">Select City</CLabel>
                              </CCol>
                              <CCol lg="10" md="14" xs="20">
                                 <CDropdown>
                                    <CDropdownToggle size="lg" className="m-1">
                                       City
                                  </CDropdownToggle>
                                    <CDropdownMenu>
                                       <CDropdownItem header>Header</CDropdownItem>
                                       <CDropdownItem disabled>Action Disabled</CDropdownItem>
                                       <CDropdownItem>Action</CDropdownItem>
                                       <CDropdownItem>Another Action</CDropdownItem>
                                    </CDropdownMenu>
                                 </CDropdown>
                                 <CFormText className="help-block">Please enter your country</CFormText>
                              </CCol>
                           </CRow>
                        </CFormGroup>
                        <CFormGroup>
                           <CRow>
                              <CCol lg="2" md="2" xs="4">
                                 <CLabel htmlFor="nf-notification">Notofication</CLabel>
                              </CCol>
                              <CCol lg="10" md="14" xs="20">
                                 <CSwitch
                                    size='20px'
                                    shape='pill'
                                    variant='3d'
                                    color='warning'
                                    labelOn='On'
                                    labelOff='Off'
                                 />
                              </CCol>
                           </CRow>
                        </CFormGroup>
                        <CFormGroup>
                           <CRow>
                              <CCol lg="2" md="2" xs="4">
                                 <CLabel htmlFor="nf-gender" name="gender">Select Gender</CLabel>
                              </CCol>
                              <CCol lg="10" md="14" xs="20">
                                 <CRow >
                                    <CLabel>Male
                                    <CInputRadio name="gender" value="male" class="col-sm-9" checked />
                                    </CLabel>
                                    <CLabel>Female
                                    <CInputRadio name="gender" value="female" class="col-sm-9" />
                                    </CLabel>
                                    <CLabel>Other
                                    <CInputRadio name="gender" value="other" class="col-sm-9" />
                                    </CLabel>
                                 </CRow>
                                 <CFormText className="help-block">Please select your Gender</CFormText>
                              </CCol>
                           </CRow>
                        </CFormGroup>
                        <CFormGroup>
                           <CRow>
                              <CCol lg="2" md="2" xs="4">
                                 <CLabel htmlFor="nf-hobby">Hobby</CLabel>
                              </CCol>
                              <CCol lg="10" md="14" xs="20">
                                 <CCol>
                                    <CInputCheckbox value="reading" />
                                    <CLabel htmlFor="nf-reading">Reading</CLabel>
                                 </CCol>
                                 <CCol>
                                    <CInputCheckbox value="watching" />
                                    <CLabel htmlFor="nf-watching">Watchding</CLabel>
                                 </CCol>
                                 <CCol>
                                    <CInputCheckbox value="Running" />
                                    <CLabel htmlFor="nf-running">Running</CLabel>
                                 </CCol>
                              </CCol>
                           </CRow>
                        </CFormGroup>
                        <CFormGroup>
                           <CRow>
                              <CCol lg="2" md="2" xs="4">
                                 <CLabel htmlFor="nf-file">File</CLabel>
                              </CCol>
                              <CCol lg="10" md="14" xs="20">
                                 <CInputFile />
                              </CCol>
                           </CRow>
                        </CFormGroup>
                        <CFormGroup>
                           <CRow>
                              <CCol lg="2" md="2" xs="4">
                                 <CLabel htmlFor="nf-showalert">Show Alert</CLabel>
                              </CCol>
                              <CCol lg="10" md="14" xs="20">
                                 <CButton variant='ghost' size='lg' className='class-name' color='success'
                                    onClick={() => this.setState({ setShow: true })}
                                 >Show Alert</CButton>
                              </CCol>
                           </CRow>
                        </CFormGroup>
                     </CForm>
                  </CCardBody>
               </CCard >

               {/* <CAlert
         className='class-name'
         closeButton
         position='top-right'
         color='warning'
         show='true'
       >
         CAlert
       </CAlert>
       <CAlert
         className='class-name'
         closeButton
         position='top-right'
         color='warning'
         show='true'
       >
         CAlert
       </CAlert>
       <CAlert
         className='class-name'
         closeButton
         position='top-right'
         color='warning'
         show='true'
       >
         CAlert
       </CAlert>
       <CAlert
         className='class-name'
         closeButton
         position='top-right'
         color='warning'
         show='true'
       >
         CAlert
       </CAlert> */}
            </CCol >
         </>
      );
      // } else {
      //    return (
      //          <CSpinner className="overlay" position="top-center" animation="grow" variant="warning" size="lg" color="warning" />
      //    )

      // }
   }
}