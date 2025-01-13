import { ACTIONS } from "../App"

export default function DigitButton({ dispatch, digit, className }) {
    return (
      <button
        className={className}
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
      >
        {digit}
      </button>
    );
  }
  