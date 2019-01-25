import styled from "styled-components";
import color from "./colours";

export const H1 = styled.h1`
  font-weight: 700;
  font-size: 4rem;
  align-self: center;
  background-image: linear-gradient(
    ${props => (props.reverse ? "to left" : "to right")},
    ${color["primary-light"]},
    ${color["primary-dark"]}
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const H2 = styled.h2`
  font-weight: 700;
  line-height: 1;
  margin-top: 2rem;
`;
