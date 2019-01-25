import styled from "styled-components";
import color from "./colours";

export const FormStyles = styled.form`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  * {
    margin-bottom: 0.5rem;
  }
`;

export const InputStyles = styled.input`
  border: none;
  border: 2px solid ${color["bg-default"]};
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 1.8rem;
  width: 45rem;

  &:focus {
    border: 2px solid ${color["primary"]};
    outline: none;
  }

  &:invalid:focus {
    border: 2px solid red;
    outline: none;
  }
`;
