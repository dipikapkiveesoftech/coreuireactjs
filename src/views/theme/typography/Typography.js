import React from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody
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
      </CCard>
    </>
  )
}

export default Typography
