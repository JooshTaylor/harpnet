import styled, { css } from 'styled-components'

export const ButtonStyles = styled.button`
  ${({ type }) => {
    if (type === 'form') {
      return css`
        margin-top: 2rem;
        border: none;
        border: 2px solid black;
        border-radius: 5px;
        padding: 1rem 3rem;
        text-decoration: none;
        text-transform: uppercase;
        cursor: pointer;
        color: currentColor;
        font-weight: 700;
        background-color: ${props => props.theme.whiteDark};
        transition: all 0.2s;
        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
        }
        &:active {
          transform: translateY(-1px);
          box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.1);
        }
        &:focus {
          outline: none;
        }
      `
    }
    if (type === 'post') {
      return css`
        background-color: ${props => props.theme.primary};
        border: none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 1rem;
        cursor: pointer;
        width: 8rem;
        font-size: 1.6rem;
        transition: all 0.2s;
        box-sizing: border-box;
      `
    }
  }}
`
