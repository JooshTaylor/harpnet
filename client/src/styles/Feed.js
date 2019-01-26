import styled from 'styled-components'

export const FeedStyles = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
`

export const FeedListStyles = styled.ul`
  margin-top: 9rem;
  width: 80%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  /* border: 1px solid green; */

  .feed__container--left {
    /* border: 1px solid blue; */
  }

  .feed__container--right {
    height: 30rem;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.25);
  }
`

export const AddPostStyles = styled.form`
  background-color: ${props => props.theme.whiteDark};
  border-radius: 10px;
  padding: 1.5rem;
  max-width: 70rem;
  margin: 0 auto;

  .post-field {
    width: 59rem;
    padding: 1rem;
    border: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    font-size: 1.6rem;
    box-sizing: border-box;
    transition: all 0.2s;
  }

  .post-field:focus {
    outline: none;
    border-top: 2px solid ${props => props.theme.bgDefault};
    border-left: 2px solid ${props => props.theme.bgDefault};
    border-bottom: 2px solid ${props => props.theme.bgDefault};
    border-right: 1px solid ${props => props.theme.bgDefault};
  }

  .post-field:focus + .post-btn {
    background-color: ${props => props.theme.primaryLight};
    border-top: 2px solid ${props => props.theme.primary};
    border-right: 2px solid ${props => props.theme.primary};
    border-bottom: 2px solid ${props => props.theme.primary};
    border-left: 1px solid ${props => props.theme.primary};
  }

  .post-errors {
    color: red;
    text-align: left;
    padding-right: 35rem;
  }

  @media only screen and (max-width: 1400px) {
    .post-form {
      max-width: 60rem;
      transform: translateX(6rem);
    }

    .post-field {
      max-width: 50rem;
    }
  }

  @media only screen and (max-width: 1250px) {
    .post-form {
      max-width: 50rem;
      transform: translateX(6rem);
    }

    .post-field {
      max-width: 40rem;
    }
  }

  @media only screen and (max-width: 900px) {
    .post-form {
      max-width: 40rem;
      transform: translateX(6rem);
    }

    .post-field {
      max-width: 30rem;
    }
  }
`
