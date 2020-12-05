import React from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

const Typography = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          Headings
          <DocsLink href="https://coreui.io/docs/content/typography/"/>
        </CCardHeader>
        <CCardBody>
        <CTabs 
        activeTab="home"
      >
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="home">
              Home
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="profile">
              Profile
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="messages">
              Messages
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane data-tab="home">
          1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
          </CTabPane>
          <CTabPane data-tab="profile">
          2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
          </CTabPane>
          <CTabPane data-tab="messages">
          3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
          </CTabPane>
        </CTabContent>
      </CTabs>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Typography
