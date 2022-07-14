import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from 'prop-types'
import {NavDropdown} from "react-bootstrap"

function DropDown({options} : any) {

  return (
    <>
    {/* <ul className="custom-dropdown">{options.map((data)=>(
        <li key={data.key}>{data.value}</li>
    ))}</ul> */}

    {options.map((data : any)=>(
        <NavDropdown.Item>{data.value}</NavDropdown.Item>
    ))
    }
    <NavDropdown.Divider />
    <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
    </>
  )
}

export default DropDown;