import { useEffect, useState } from "react";
import styled from "styled-components";


const Div1 = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    color: ${(props) => props.theme.Screen_text};
`;

const CalDiv = styled.div`
    background: none;
    font-size: 25px;
`;

const Input = styled.input`
    height: 10px;
    width: 10px;
    appearance: none;
    align-self: center;
    background-color: ${(props) => props.theme.Equals_bg};
    border-radius: 50%;
    opacity: 0;
    margin-bottom: 3px;
    transition: 0.1s;

    &:hover {
        cursor: pointer;
    }
`;

const Toggle = styled.div`
    display: flex;
    justify-content: center;
    border: none;
    background: ${(props) => props.theme.secondary_bg};
    border-radius: 3mm;
    width: fit-content;
`;

const ThemeDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: end;
`;

const Txttheme = styled.div`
    margin-right: 15px;
    margin-top: 10px;
    font-size: 10px;
    align-self: center;
`;

const Label = styled.label`
    position: relative;
    top: -15px;
    left: -12px;
    font-size: 10px;
    cursor: pointer;
`;


const Header = ({ setThemeselect, Theme1, Theme2, Theme3 }) => {

    const loadedToggle_ID_Calculator = localStorage.getItem("toggle_ID_Calculator")? JSON.parse(localStorage.getItem("toggle_ID_Calculator")) : "one";

    const [toggleID, setToggleID] = useState(loadedToggle_ID_Calculator);

    useEffect( () => { 
        if (localStorage.toggle_ID_Calculator === "one" || toggleID === "one") {
            document.getElementById("one").style.opacity = "1";
        }
        else if (localStorage.toggle_ID_Calculator === "two" || toggleID === "two") {
            document.getElementById("two").style.opacity = "1";
        }
        else if (localStorage.toggle_ID_Calculator === "three" || toggleID === "three") {
            document.getElementById("three").style.opacity = "1";
        }
    }, [ ]);

    useEffect(() => {
        window.localStorage.setItem("toggle_ID_Calculator", JSON.stringify(toggleID))
      }, [toggleID])
      

    const handleThemeClick = (e) => {
        var buttons = document.getElementsByClassName("button");
        var arr = [...buttons];

        arr.forEach((element) => {
            element.style.opacity = "0";
        })

        if (e.target.id === 'one') {
            e.target.style.opacity = '1';
            setToggleID('one');
            setThemeselect(Theme1);
        }
        else if (e.target.id === 'two') {
            e.target.style.opacity = '1';
            setToggleID('two');
            setThemeselect(Theme2);
        }
        else if (e.target.id === 'three') {
            e.target.style.opacity = '1';
            setToggleID('three');
            setThemeselect(Theme3);
        } 
    }

    return ( 
        <Div1>
            <CalDiv>calc</CalDiv>
            <ThemeDiv>
                <Txttheme>
                    <b>THEME</b>
                </Txttheme>
                <Toggle> 
                    <Input className="button" type="radio" name="toggle" id="one" onClick={handleThemeClick} />
                    <Label htmlFor="one"><b>1</b></Label>
                    <Input className="button" type="radio" name="toggle" id="two" onClick={handleThemeClick} />
                    <Label htmlFor="two"><b>2</b></Label>
                    <Input className="button" type="radio" name="toggle" id="three" onClick={handleThemeClick} />
                    <Label htmlFor="three"><b>3</b></Label>
                </Toggle>
            </ThemeDiv>
        </Div1>
     );
}
 
export default Header;