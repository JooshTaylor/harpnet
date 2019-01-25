import styled from "styled-components";

const HomeStyles = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.text};

  .landing__info {
    padding: 8rem 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .landing__features {
    list-style: none;
    align-self: center;
    display: flex;
    justify-content: space-around;
  }

  .landing__feature {
    padding: 2rem 1rem;
    flex: 0 0 30%;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    text-align: center;
    transition: all 0.2s;
    opacity: 0.85;
  }

  .feature-icon {
    font-size: 6rem;
    color: ${props => props.theme.primary};
  }

  .feature-heading {
    font-weight: 700;
    line-height: 1;
    margin: 3rem 0 2rem;
    padding: 0;
  }

  .feature-info {
    color: ${props => props.theme.textLight};
    margin: 0;
    padding: 0;
  }

  .landing__feature:hover {
    transform: translateY(-3px);
    box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
    opacity: 1;
  }

  .landing__register {
    padding: 8rem 5rem;
    background-color: ${props => props.theme.whiteDark};

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .landing__form > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  @media screen and (max-width: 1200px) {
    .landing__info {
      width: 80%;
      margin: 0 auto;
      padding: 2rem 5rem 6rem 5rem;
    }

    .landing__heading-1 {
      margin-bottom: 1rem;
    }

    .landing__form {
      margin-top: 2rem;
    }

    .landing__features {
      justify-content: center;
    }

    .landing__feature {
      flex: 0 0 23%;
      margin: 0 2rem;
    }
  }

  @media screen and (max-width: 1000px) {
    .landing__features {
      justify-content: space-around;
    }

    .landing__feature {
      flex: 0 0 27%;
      margin: 0;
    }
  }

  @media screen and (max-width: 800px) {
    .feature__heading {
      margin: 1.5rem 0 1rem;
    }
  }

  @media screen and (max-width: 650px) {
    .feature__heading {
      margin: 1rem 0 0.5rem;
    }
  }
`;

export default HomeStyles;
