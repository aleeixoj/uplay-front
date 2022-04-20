import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  body {
    margin: 0 auto;
    background: ${(props) => props.theme.colors.base.bg};
  }

  body,
  input,
  textarea,
  button {
    font: 500 1rem Inter, sans-serif;
    color: ${(props) => props.theme.colors.base.text};
  }
  a {
    text-decoration: none;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    font-family: Lexend, sans - serif;
    color: ${(props) => props.theme.colors.base.text};

  }

  h1 {
   font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  button {
    cursor: pointer;
    border: none;
  }

`;

export { GlobalStyle };
