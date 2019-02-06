import React, { Component } from "react";
import styled from "styled-components";
import * as COLORS from "../constants/colors";

export const H1 = styled.h1`
  color: ${props => props.color ? props.color : COLORS.GENERAL.BLUE};
  text-transform: uppercase;
`;

