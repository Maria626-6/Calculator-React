// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useReducer } from "react";
import DigitButton from "./pages/DigitButton";
import OperationButton from "./pages/OperationButton";
import Notfound from "./pages/Notfound";


export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state; // Avoids multiple zeros at the start
      } 
      else if (payload.digit === "." && state.currentOperand?.includes(".")) {
        return state; // Avoids multiple decimal points
      } 
      else if(state.overwrite){
        return{
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      else {
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`,
        }; // Close the object properly with a semicolon
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state; // No operation to choose if both operands are null
      } 
      else if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      } 
      else if (state.currentOperand == null){
        return{
          ...state,
          operation: payload.operation
        };
      }else {
        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload.operation,
          currentOperand: null,
        };
      }

    case ACTIONS.CLEAR:
      return {}; // Clears the state
    
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite){
        return{
          ...state,
          overwrite: false,
          currentOperand: null
        };
      }else if(state.currentOperand == null){
        return state
      }
      else if(state.currentOperand.length ===1 ){
        return {
          ...state,
          currentOperand: null
        };
      } else {
        return{
          ...state,
          currentOperand: state.currentOperand.slice(0, -1)
        };
      }
    
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null){
        return state
      }else{
        return{
          ...state,
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperand: evaluate(state)
        }
      }

    default:
      return state;
  }
}


//this is to evaluate
function evaluate({ currentOperand, previousOperand, operation}){
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return ""; 
  switch (operation) {
    case "+":
      return prev + current;
    case "-":
      return prev - current;
    case "*":
      return prev * current;
    case "÷":
      return prev / current;
    default:
      return "";
  }
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null || operand === "") return; 
  const [integer, decimal] = String(operand).split("."); 
  if (decimal == null) return INTEGER_FORMATTER.format(integer); 
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`; //if there's a decimal part, formats the integer part and concatenates the decimal part.
}



function App() {
  const [ {currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});

  
  return (
    <div className="calculator-grid bg-gradient-to-r from-green-400 to-blue-500 grid gap-6 grid-cols-4 mt-8 grid-rows-4 justify-center p-12">
      <div className="h-full output grid col-span-full bg-gray-600 flex-col justify-around p-3 break-normal break-all">
        <div className="previous-operand text-white text-base">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand text-white text-4xl">{formatOperand(currentOperand)}</div>
      </div>
  
      <button
        className="span=two grid col-span-2 cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
  
      <button
        className="cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300"
        onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
  
      <OperationButton operation="÷" dispatch={dispatch} className="cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300" />
  
      <DigitButton digit="1" dispatch={dispatch} className="cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300" />
      <DigitButton digit="2" dispatch={dispatch} className="cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300" />
      <DigitButton digit="3" dispatch={dispatch} className="cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300" />
  
      <OperationButton operation="*" dispatch={dispatch} className="cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300" />
  
      <DigitButton digit="4" dispatch={dispatch} className="cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300" />
      <DigitButton digit="5" dispatch={dispatch} className="cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300" />
      <DigitButton digit="6" dispatch={dispatch} className="cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300" />
  
      <OperationButton operation="-" dispatch={dispatch} className="cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300" />
  
      <DigitButton digit="7" dispatch={dispatch} className="cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300" />
      <DigitButton digit="8" dispatch={dispatch} className="cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300" />
      <DigitButton digit="9" dispatch={dispatch} className="cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300" />
  
      <OperationButton operation="+" dispatch={dispatch} className="cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300" />
  
      <DigitButton digit="." dispatch={dispatch} className="cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300" />
      <DigitButton digit="0" dispatch={dispatch} className="cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300" />

      <button
        className="span-two cursor-pointer text-4xl border-2 outline-none bg-slate-50 hover:bg-slate-300"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default App;
