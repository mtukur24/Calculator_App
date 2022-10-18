import { useEffect, useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Calculator from "./Components/Calculator";
import Header from "./Components/Header";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${(props) => props.theme.main_bg};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

`;

const Maindiv = styled.div`
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;

    @media screen and (max-width: 40em){
      width: 250px;
    }
`;

const Theme1 = {
    main_bg: 'hsl(222, 26%, 31%)',
    secondary_bg: 'hsl(223, 31%, 20%)',
    screen_bg: 'hsl(224, 36%, 15%)',
    Delete_bg: 'hsl(225, 21%, 49%)',
    Equals_bg: 'hsl(6, 63%, 50%)',
    Numbers_bg: 'hsl(30, 25%, 89%)', 
    Delete_shadow: 'hsl(224, 28%, 35%)',
    Equals_shadow: 'hsl(6, 70%, 34%)',
    Numbers_shadow: 'hsl(28, 16%, 65%)',
    Delete_actv_bg: 'hsl(225, 21%, 69%)',
    Equals_actv_bg: 'hsl(6, 63%, 70%)',
    Numbers_actv_bg: 'hsl(28, 16%, 100%)', 
    Numbers_text: 'hsl(221, 14%, 31%)',
    Eq_text: 'white',
    Screen_text: 'white',
}

const Theme2 = {
    main_bg: 'hsl(0, 0%, 90%)',
    secondary_bg: 'hsl(0, 5%, 81%)',
    screen_bg: 'hsl(0, 0%, 93%)',
    Delete_bg: 'hsl(185, 42%, 37%)',
    Equals_bg: 'hsl(25, 98%, 40%)',
    Numbers_bg: 'hsl(45, 7%, 89%)', 
    Delete_shadow: 'hsl(185, 58%, 25%)',
    Equals_shadow: 'hsl(25, 99%, 27%)',
    Numbers_shadow: 'hsl(35, 11%, 61%)',
    Delete_actv_bg: 'hsl(185, 42%, 57%)',
    Equals_actv_bg: 'hsl(25, 98%, 60%)',
    Numbers_actv_bg: 'hsl(45, 7%, 98%)',
    Numbers_text: 'hsl(60, 10%, 19%)',
    Eq_text: 'white',
    Screen_text: 'black',
}

const Theme3 = {
    main_bg: 'hsl(268, 75%, 9%)',
    secondary_bg: 'hsl(268, 71%, 12%)',
    screen_bg: 'hsl(268, 71%, 12%)',
    Delete_bg: 'hsl(281, 89%, 26%)',
    Equals_bg: 'hsl(176, 100%, 44%)',
    Numbers_bg: 'hsl(268, 47%, 21%)', 
    Delete_shadow: 'hsl(285, 91%, 52%)',
    Equals_shadow: 'hsl(177, 92%, 70%)',
    Numbers_shadow: 'hsl(290, 70%, 36%)',
    Delete_actv_bg: 'hsl(281, 89%, 46%)',
    Equals_actv_bg: 'hsl(176, 100%, 64%)',
    Numbers_actv_bg: 'hsl(268, 47%, 41%)',
    Numbers_text: 'hsl(52, 100%, 62%)',
    Eq_text: 'black',
    Screen_text: 'hsl(52, 100%, 62%)',
}

function App() {

  const loadedBg_Theme_Calculator = localStorage.getItem("bg_Theme_Calculator")? JSON.parse(localStorage.getItem("bg_Theme_Calculator")) : Theme1;

  const [themeselect, setThemeselect] = useState(loadedBg_Theme_Calculator);

  useEffect(() => {
    window.localStorage.setItem("bg_Theme_Calculator", JSON.stringify(themeselect))
  }, [themeselect]);

  return (
    <ThemeProvider theme={themeselect} >
      <Maindiv>
        <GlobalStyle />
        <Header 
          setThemeselect={setThemeselect} 
          Theme1={Theme1} 
          Theme2={Theme2} 
          Theme3={Theme3}
        />
        <Calculator />
      </Maindiv>
    </ThemeProvider>
  );
}

export default App;
