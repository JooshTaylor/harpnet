import styled from "styled-components";

export const NavStyles = styled.nav`
  position: fixed;
  width: 100%;
  margin: 0;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: ${props => props.theme.bgDefault};
  color: ${props => props.theme.white};
  box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.2);
  padding: 1rem 3rem;
  font-size: 1.4rem;
  letter-spacing: 0.5px;

  .nav__list {
    list-style: none;
    display: flex;
    align-items: center;
    width: 90%;
    margin: 0 auto;
  }

  .nav__list--nologin {
    padding: 1rem 0;
  }

  /* Individual list items */
  .nav__item {
    margin-right: 1rem;
  }

  .nav__item--home-1 {
    margin-right: auto;
  }

  .nav__item--home-2 {
    margin-right: 8rem;
  }

  .nav__item--search {
    margin-right: auto;
    width: 40%;
  }

  @media only screen and (max-width: 750px) {
    .nav__item--home-2 {
      margin-right: 5rem;
    }
    .nav__item--search {
      width: 30%;
    }
  }

  @media only screen and (max-width: 580px) {
    .nav__item--home-2 {
      margin-right: 2.5rem;
    }
  }

  /* Links nested within list items */
  .nav__link {
    border: 2px solid ${props => props.theme.textLight};
    border-radius: 5px;
    padding: 0.7rem 1.5rem;
    color: ${props => props.theme.white};
    text-decoration: none;
    text-transform: uppercase;
    transition: all 0.2s;
    font-size: 1.6rem;
  }

  .nav__link:hover {
    border: 2px solid ${props => props.theme.white};
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.textLight};
  }

  .nav__link:focus {
    outline: none;
  }

  .nav__link--home {
    border: 2px solid ${props => props.theme.primary};
    background-color: ${props => props.theme.primary};
  }

  .nav__link--home:hover {
    border: 2px solid ${props => props.theme.primaryDark};
    background-color: ${props => props.theme.primaryDark};
    color: ${props => props.theme.white};
  }

  .nav__link--logout {
    background-color: ${props => props.theme.bgDefault};
    cursor: pointer;
    font-size: 2rem;
  }

  .nav__link--icon {
    font-size: 1.8rem;
    margin: 0;
    padding: 0;
    line-height: 1;
  }

  .nav__link--profile {
    display: flex;
    align-items: center;
    padding: 0;
    padding-right: 1.5rem;
  }

  /* Logo */
  .nav__logo {
    width: 7rem;
    height: 5rem;
  }

  .nav__img {
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 50%;
    margin-right: 0.3rem;
    transform: translateY(-0.3rem);
  }

  /* Settings dropdown */
  .nav__dropdown {
    position: absolute;
    top: 3.7rem;
    right: 12rem;
    background-color: ${props => props.theme.whiteDark};
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 7rem;
    padding: 2rem;
    padding-bottom: 1.5rem;
    clip-path: polygon(
      0 1rem,
      70% 1rem,
      75% 0,
      80% 1rem,
      100% 1rem,
      100% 100%,
      0 100%
    );
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    z-index: 3;
  }

  @media screen and (min-width: 2000px) {
    .nav__dropdown {
      right: 12rem;
    }
  }

  @media screen and (max-width: 1500px) {
    .nav__dropdown {
      right: 8rem;
    }
  }

  @media screen and (max-width: 1200px) {
    .nav__dropdown {
      right: 6rem;
    }
  }

  @media screen and (max-width: 700px) {
    .nav__dropdown {
      right: 4rem;
    }
  }

  .nav__dropdown-item {
    width: 100%;
    text-align: center;
  }

  .nav__dropdown-link {
    color: ${props => props.theme.textDark};
    margin: 0;
    padding: 0;
    text-decoration: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .nav__dropdown-item:not(:last-child) {
    margin-bottom: 0.7rem;
    padding-bottom: 0.7rem;
    border-bottom: 1px solid #ccc;
  }
`;
