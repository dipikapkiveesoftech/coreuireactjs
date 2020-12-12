import React, { useState } from 'react'
import PropTypes from 'prop-types';
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
   CAlert,
   CProgress
} from '@coreui/react';
import ToasterSep from '../../../reusable/ToasterSep';
import DButton from 'src/reusable/DButton';
import { color } from '@storybook/addon-knobs';
const Colors = () => {

   ToasterSep.propTypes = {
      toastList: PropTypes.array.isRequired,
      position: PropTypes.string
   }

   const [list, setList] = useState([]);
   let toastProperties = null;

   const showToast = (type) => {

      switch (type) {
         case 'success':
            toastProperties = {
               message: "Welcome Back",
               color: "success",
            }
            break;
         case 'danger':
            toastProperties = {
               message: "Welcome Back",
               color: "danger"
            }
            break;
         case 'info':
            toastProperties = {
               message: "Welcome Back",
               color: "info"
            }
            break;
         case 'warning':
            toastProperties = {
               message: "Welcome Back",
               color: "warning"
            }
            break;
         default:
            setList([]);
      }
      setList([...list, toastProperties]);
   }


   const [alertsS] = useState([
      { position: 'top-right' },
      { position: 'top-left' },
      { position: 'top-center' }
   ])

   const BUTTON_PROPS = [
      {
         id: 1,
         type: 'success',
         className: 'success',
         label: 'Success',
         color: "success"
      },
      {
         id: 2,
         type: 'danger',
         className: 'danger',
         label: 'Danger',
         color: "danger"
      },
      {
         id: 3,
         type: 'info',
         className: 'info',
         label: 'Info',
         color: "info"
      },
      {
         id: 4,
         type: 'warning',
         className: 'warning',
         label: 'Warning',
         color: "warning"
      },
   ];

   const addToast = (color) => {
      // setToasts([
      //     ...toasts,
      //     { position, autohide: autohide && autohideValue, closeButton, fade, color: color }
      // ])
   }

   // const addAlert = () => {
   //    setAlerts([
   //       ...alerts,
   //       { position, closeButton, color }
   //    ])
   // }

   // const alertset = (() => {
   //    return alertsS.reduce((alertset, alert) => {
   //       alertset[alert.position] = alertset[alert.position] || []
   //       alertset[alert.position].push(alert)
   //       return alertset
   //    }, {})
   // })();

   return (
      <>
         {/* {alertset['top-center'].map((alert, key) => {
            return (
               <CAlert
                  color="danger"
                  position="top-center"
                  key={'alert' + key}
                  closeButton={true}>
                  This is a danger alert — check it out!
               </CAlert>
            )
         })
         } */}
         <ToasterSep toastList={list}
            position="top-right"
            color={list.color} />
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
                  <CRow>
                     <CCol lg="2" md="2" xs="4">
                        <CLabel htmlFor="nf-showalert">Show Toaster</CLabel>
                     </CCol>
                     <CCol lg="10" md="14" xs="20">
                        {
                           BUTTON_PROPS.map(e =>
                              <DButton
                                 key={e.id}
                                 className={e.className}
                                 label={e.label}
                                 color={e.color}
                                 handleClick={() => showToast(e.type)}
                              />
                           )
                        }
                        {/* <CButton
                           className="mr-1 w-25"
                           color="success"
                           type="button"
                           id="success"
                           onClick={e => showToast("success")}>
                           Add Success
                           </CButton>
                        <CButton
                           className="mr-1 w-25"
                           color="warning"
                           type="button"
                           id="warning"
                           onClick={e => showToast("warning")}>
                           Add warning
                           </CButton>
                        <CButton
                           className="mr-1 w-25"
                           color="danger"
                           type="button"
                           id="danger"
                           onClick={e => showToast("danger")}>
                           Add error
                           </CButton> */}
                     </CCol>
                  </CRow>
               </CForm>



            </CCardBody>
         </CCard >
      </>
   );
}

export default Colors;