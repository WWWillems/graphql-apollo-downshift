import React, { Component } from "react";
import styled from "styled-components";
import * as COLORS from "../constants/colors";

export const H1 = styled.h1`
  font-size: 1em;
  color: ${props => props.color ? props.color : COLORS.GENERAL.BLUE};
  text-transform: uppercase;
`;

