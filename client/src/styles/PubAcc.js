import styled from 'styled-components'

const PubAccStyles = styled.div`
  margin-top: 1rem;
  width: 50rem;
  display: flex;
  justify-content: space-between;

  .account {
    flex: 0 0 30%;
    text-align: center;
    transition: all 0.2s;
  }

  .account:hover {
    transform: scale(1.1);
  }

  .account-img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    background-color: ${props => props.theme.whiteDark};
    border: 2px solid ${props => props.theme.textDark};
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .account-img:hover {
    box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
  }

  .account-link {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .account-link:focus {
    outline: none;
  }

  .account:active {
    transform: scale(1.02);
  }

  .account-name {
    color: ${props => props.theme.primaryDark};
    transform: translateY(-1rem);
  }

  .account-link:hover ~ .account-name {
    text-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
  }
`

export default PubAccStyles
