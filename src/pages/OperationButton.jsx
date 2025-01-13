import { ACTIONS } from "../App"

export default function OperationButton({ dispatch, operation, className }) {
    return (
      <button
        className={className}
        onClick={() =>
          dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
        }
      >
        {operation}
      </button>
    );
  }
  