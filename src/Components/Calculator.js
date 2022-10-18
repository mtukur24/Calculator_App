import { useReducer } from "react";
import styled from "styled-components";

const Div2 = styled.div`
    border: none;
    border-radius: 1mm;
    background:  ${(props) => props.theme.screen_bg};
    height: 30px auto;
    padding: 20px;
    text-align: end;
    color: ${(props) => props.theme.Screen_text};
    margin-bottom: 20px;
    word-wrap: break-word;
    word-break: break-all;
`;

const Div21 = styled.div`
    font-size: 15px;
`;

const Div22 = styled.div`
    font-size: 20px;
`;

const Div3 = styled.div`
    border: none;
    border-radius: 1mm;
    background:  ${(props) => props.theme.secondary_bg};
    padding: 15px;
`;

const Div31 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 10px;
    row-gap: 15px;
`;

const Div32 = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr;
    column-gap: 10px;
    margin-top: 10px;
`;

const Button = styled.button`
    font-size: 30px;
    color: ${(props) => props.theme.Numbers_text};
    border-radius: 1mm;
    border: none;
    background: ${(props) => props.theme.Numbers_bg};
    box-shadow: inset 0px -2px 0px ${(props) => props.theme.Numbers_shadow};
    cursor: pointer;

    &:active {
        background: ${(props) => props.theme.Numbers_actv_bg};
    }
`;

const ButtonDel = styled.button`
    background: ${(props) => props.theme.Delete_bg};
    box-shadow: inset 0px -2px 0px ${(props) => props.theme.Delete_shadow};
    border: none;
    color: white;
    font-size: 15px;
    border-radius: 1mm;
    cursor: pointer;

    &:active {
        background: ${(props) => props.theme.Delete_actv_bg};
    }
`;

const ButtonEq = styled.button`
    background: ${(props) => props.theme.Equals_bg};
    box-shadow: inset 0px -2px 0px ${(props) => props.theme.Equals_shadow};
    border: none;
    color: ${(props) => props.theme.Eq_text};
    font-size: 30px;
    border-radius: 1mm;
    cursor: pointer;

    &:active {
        background: ${(props) => props.theme.Equals_actv_bg};
    }
`;


const ACTIONS = {
    INPUT_BUTTON: 'inputButton',
    INPUT_OPERATION: 'inputOperation',
    RESET_BUTTON: 'resetButton',
    DELETE_BUTTON: 'deleteButton',
    EQUALS_BUTTON: 'equalsButton',
  
}

  
const reducer = (state, {type, payload}) => {
    switch(type) {
        case ACTIONS.INPUT_BUTTON:
            if (state.overwrite === true) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false,
                }
            }

            if (payload.digit === '0' && state.currentOperand === '0') {
                return state;
            }

            if (payload.digit === '.' && state.currentOperand == null) {
                return {
                    ...state,
                    currentOperand: '0.',
                }
            }

            if (payload.digit === '.' && state.currentOperand.includes('.')) {
                return state;
            }

            return {
            ...state,
            currentOperand: `${state.currentOperand || ''}${payload.digit}`,
            }
            
        case ACTIONS.RESET_BUTTON:
            return {}

        case ACTIONS.INPUT_OPERATION:
            if (state.previousOperand == null && state.currentOperand == null) {
                return state
            }
            if (state.previousOperand == null) {
                return{
                    ...state,
                    previousOperand: state.currentOperand,
                    operation: payload.operation,
                    currentOperand: null
                }
            }
            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: payload.operation
                }
            }
            return {
                ...state,
                previousOperand: equalsButton(state),
                operation: payload.operation,
                currentOperand: null
            }            

        case ACTIONS.EQUALS_BUTTON:
            if ((state.currentOperand == null && state.previousOperand == null) || (state.currentOperand !== null && state.previousOperand == null) ) {
                return state;
            }

            if (state.currentOperand == null && state.previousOperand !== null) {
                return {
                    ...state,
                    operation: null,
                    previousOperand: null,
                    currentOperand: state.previousOperand,
                }
            }
            
            return {
                overwrite: true,
                previousOperand: null,
                currentOperand: equalsButton(state),
            }

        case ACTIONS.DELETE_BUTTON:
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: null,
                    overwrite: false,
                }
            }
            if (state.currentOperand == null) {
                return state;
            }
            if (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: null,
                }
            }
            
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1),
            }

        default:
    }

  
}

const equalsButton = ({currentOperand, previousOperand, operation}) => {
    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(current)  || isNaN(previous)) {
        return ''
    }
    let result = '';
    switch (operation) {
        case '+':
            result = previous + current;
            break;
        case '-':
            result = previous - current;
            break;
        case '*':
            result = previous * current;
            break;
        case '÷':
            result = previous / current;
            break;
        default:
    }
    return result;
}

// const IntegerFormatter = new Intl.NumberFormat("en-us", {
//     maximumFractionDigits: 0,
// });

// const digitFomating = (operand) => {
//     if (operand == null) return
//     const [integer, decimal] = operand.split('.');
//     if (decimal == null) return IntegerFormatter.format(integer);
//     return `${IntegerFormatter.format(integer)}.${decimal}`;

// }

const Calculator = () => {

    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

    return ( 
        <>
            <Div2>
                <Div21>
                    {(previousOperand)} {operation}
                </Div21>
                <Div22>
                    {(currentOperand)}
                </Div22>
            </Div2>
            
            <Div3>
                <Div31>
                    <Button onClick={() => dispatch({ type: ACTIONS.INPUT_BUTTON, payload: {digit: 7} })}>7</Button>
                    <Button onClick={() => dispatch({ type: ACTIONS.INPUT_BUTTON, payload: {digit: 8} })}>8</Button>
                    <Button onClick={() => dispatch({ type: ACTIONS.INPUT_BUTTON, payload: {digit: 9} })}>9</Button>
                    <ButtonDel onClick={() => dispatch({ type: ACTIONS.DELETE_BUTTON }) } ><strong> DEL </strong></ButtonDel>
                    <Button onClick={() => dispatch({ type: ACTIONS.INPUT_BUTTON, payload: {digit: 4} })}>4</Button>
                    <Button onClick={() => dispatch({ type: ACTIONS.INPUT_BUTTON, payload: {digit: 5} })}>5</Button>
                    <Button onClick={() => dispatch({ type: ACTIONS.INPUT_BUTTON, payload: {digit: 6} })}>6</Button>
                    <Button onClick={() => dispatch({type: ACTIONS.INPUT_OPERATION, payload: {operation: '+'}})} >+</Button>
                    <Button onClick={() => dispatch({ type: ACTIONS.INPUT_BUTTON, payload: {digit: 1} })}>1</Button>
                    <Button onClick={() => dispatch({ type: ACTIONS.INPUT_BUTTON, payload: {digit: 2} })}>2</Button>
                    <Button onClick={() => dispatch({ type: ACTIONS.INPUT_BUTTON, payload: {digit: 3} })}>3</Button>
                    <Button onClick={() => dispatch({type: ACTIONS.INPUT_OPERATION, payload: {operation: '-'}})}>-</Button>
                    <Button onClick={() => dispatch({ type: ACTIONS.INPUT_BUTTON, payload: {digit: '.'} })}>.</Button>
                    <Button onClick={() => dispatch({ type: ACTIONS.INPUT_BUTTON, payload: {digit: '0'} })}>0</Button>
                    <Button onClick={() => dispatch({type: ACTIONS.INPUT_OPERATION, payload: {operation: '÷'}})}>÷</Button>
                    <Button onClick={() => dispatch({type: ACTIONS.INPUT_OPERATION, payload: {operation: '*'}})}>x</Button>
                </Div31>
                <Div32>
                    <ButtonDel onClick={() => dispatch({type: ACTIONS.RESET_BUTTON })}><strong> RESET </strong></ButtonDel>
                    <ButtonEq onClick={() => dispatch({ type: ACTIONS.EQUALS_BUTTON }) } >=</ButtonEq>
                </Div32>
            </Div3>
        </>

     );
}
 
export default Calculator;