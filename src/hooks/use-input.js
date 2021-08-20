import { useReducer, useCallback } from "react";

const initialInputState = {
  value: "",
  isValid: false,
  hasError: false,
  isTouched: false,
  validityChecks: [],
  errorMessage: null,
};

const applyValidityChecks = (value, validityChecks) => {
  for (let validityCheck of validityChecks) {
    const [valid, error] = validityCheck(value);

    if (!valid) {
      return [false, error];
    }
  }
  return [true];
};

const inputReducer = (state, action) => {
  if (action.type === "INPUT") {
    if (state.hasError) {
      const [valid] = applyValidityChecks(state.value, state.validityChecks);

      if (!valid) {
        return { ...state, value: action.input, isTouched: true };
      } else {
        const isValid = state.value !== "";
        return {
          ...state,
          value: action.input,
          isTouched: true,
          hasError: false,
          isValid,
          errorMessage: null,
        };
      }
    }

    return { ...state, value: action.input, isTouched: true };
  } else if (action.type === "BLUR") {
    const [valid, errorMessage] = applyValidityChecks(
      state.value,
      state.validityChecks
    );

    if (!valid) {
      return {
        ...state,
        isValid: false,
        hasError: true,
        errorMessage,
      };
    }

    const isValid = state.value !== "";
    return { ...state, isValid, hasError: false, errorMessage: null };
  } else if (action.type === "ADD_VALIDITY_CHECK") {
    return {
      ...state,
      validityChecks: [...state.validityChecks, action.validityCheck],
    };
  } else if (action.type === "SET_VALIDITY_CHECKS") {
    return { ...state, validityChecks: action.validityChecks };
  } else if (action.type === "RESET") {
    return initialInputState;
  }
  return initialInputState;
};

const useInput = (...validityChecks) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialInputState);
  const { value, isTouched, isValid, hasError, errorMessage } = inputState;

  /**
   * Updates the value of the input.
   *
   * @param {String} value - The new input value.
   */
  const inputHandler = (event) => {
    dispatch({ type: "INPUT", input: event.target.value });
  };

  /**
   * Checks if the inputs value is valid and updates the state.
   */
  const blurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  /**
   * Resets the input to its initial state.
   */
  const resetHandler = () => {
    dispatch({ type: "RESET" });
  };

  /**
   * Adds a function to the validity checks of the input.
   *
   * @param {(String) => [Boolean, String]} validityCheck - The new function to be applied to the input to check for validity.
   */
  const newValidityCheckHandler = (validityCheck) => {
    dispatch({ type: "ADD_VALIDITY_CHECK", validityCheck });
  };

  /**
   * Sets the validity check functions of the input to the ones provided. Any previous validity check function will be overwritte.
   *
   * @param  {...(String) => [Boolean, String]} validityChecks - The validity check functions to be used to validate the inputs value.
   */
  const setValidityChecksHandler = useCallback((...validityChecks) => {
    dispatch({ type: "SET_VALIDITY_CHECKS", validityChecks });
  }, []);

  return {
    inputHandler,
    blurHandler,
    resetHandler,
    newValidityCheckHandler,
    setValidityChecksHandler,
    value,
    isTouched,
    isValid,
    hasError,
    errorMessage,
  };
};

export default useInput;
