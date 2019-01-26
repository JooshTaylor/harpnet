import styled from 'styled-components'

const SearchStyles = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  .searchbar__input {
    font-family: inherit;
    font-size: inherit;
    background-color: ${props => props.theme.whiteDark};
    border: none;
    padding: 0.7rem 2rem;
    margin-right: -3.25rem;
    border-radius: 100px;
    width: 80%;

    transition: all 0.2s;
  }

  .searchbar__input:focus {
    outline: none;
    width: 85%;
    background-color: ${props => props.theme.white};
  }

  .searchbar__button {
    border: none;
    cursor: pointer;
    background-color: ${props => props.theme.whiteDark};
  }

  @media only screen and (max-width: 850px) {
    .searchbar__button {
      transform: translateX(-0.3rem);
    }
  }

  @media only screen and (max-width: 670px) {
    .searchbar__button {
      transform: translateX(-1rem);
    }
  }

  @media only screen and (max-width: 510px) {
    .searchbar__button {
      transform: translateX(-1.6rem);
    }
  }

  .searchbar__input:focus + .searchbar__button {
    outline: none;
    background-color: ${props => props.theme.white};
  }
`

export default SearchStyles
