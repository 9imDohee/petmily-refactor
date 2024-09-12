import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
       
    }

    #root{
        display:flex;
        flex-direction:column;
        justify-content: center;
        background-color: ${({ theme }) => theme.backgroundColor.primary}
       };
    }

    body {
        font-family: 'Noto Sans KR', Roboto, sans-serif;


    a {
        text-decoration: none;
    }

    button {
        border:none;
        background-color: transparent;
    }

`;

export default GlobalStyle;
