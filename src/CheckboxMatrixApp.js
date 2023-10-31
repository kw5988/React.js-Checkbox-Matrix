/**
 * This is the starter file for CS317 Fall 2023 Project 2 Task 1
 * React JS Checkbox Matrix Web App. It is a React JS version of the
 * Project 1 Task 2b Checkbox Matrix Web App that was implemented
 * using traditional HTML/CSS/JavaScript tecnology.
 *
 * This file has many skeleton functions that you are expected to
 * flesh out as specified in the Project 2 Task 1 description.
 */

import "./matrix.css";
import { useState } from "react";

/*
 * The following imports all exported functions from ./utils.js
 * as an object names utils, so that you can refer to them
 * as utils.range, utils.sum, etc.
 */
import * as utils from "./utils.js";
/*
 * Alternatively you can use the following destructor notation to grab
 * just the functions that you want from ./utils.py, without a prefix:
 *
 *  import { range, sum, prepend } from "./utils.js";
 */

export default function CheckboxMatrixApp() {
  /** The maximum size for a size x size matrix */
  const MAX_MATRIX_SIZE = 20;

  /******************** Control Panel State ********************/

  /** current string in textbox */
  const [sizeString, setSizeString] = useState("");

  /** current validity error message */
  const [validityError, setValidityError] = useState("");

  /** current selected mode (inclusive vs. exclusive) */
  const [mode, setMode] = useState("inclusive");

  /******************** State Panel State ********************/

  /** DO NOT MODIFY THIS SECTION */

  /** showCheckboxState that's `true` means display a text representation
   * of the state; `false` means this representation will be hidden.
   */
  const [showCheckboxState, setShowCheckboxState] = useState(true);

  /** current selected mode (inclusive vs. exclusive) */
  const [subtask, setSubtask] = useState("1a");

  /******************** State of Checkboxes ********************/
  /** DO NOT MODIFY THIS SECTION */

  /** size for size x size checkbox matrix */
  const [size, setSize] = useState(0);

  /** indicates which checkboxes in size x size checkbox matrix are checked */

  /** Representations for subtasks 1a, 1b, and 1c are defined below
   *  in the `setEmptyCheckedState` function.
   *  sees what boxes are checked in matrix ... what we will be focusing on
   *  most of the time
   */
  const [checkedState, setCheckedState] = useState(undefined);

  /**
   * Assume `subtaskString` is one '1a', `1b', or '1c', and that
   * `sizeNum` is an integer and 0 < `sizeNum` <= MAX_MATRIX_SIZE.
   * Use `setCheckedState` to initialize the state for an `sizeNum` x `sizeNum`
   * matrix of checkboxes in which all the checkboxes are unchecked.
   * The representation for this empty matrix will depend on `subtaskString`.
   *
   *  CAREFULLY STUDY THE FOLLOWING FUNCTION, BUT DO NOT MODIFY IT!
   */
  function setEmptyCheckedState(subtaskString, sizeNum) {
    // console.log(`setEmptyCheckedState(${subtaskString}, ${sizeNum})`);
    if (subtaskString === "1a") {
      /*
       * Representation 1a: A 2D sizeNum x sizeNum array of 0s and 1s.
       *
       * For an empty matrix, every slot contains 0.
       * E.g., for size 3, the representation of an empty matrix is
       *
       *     [ [0, 0, 0],  # row 0
       *       [0, 0, 0],  # row 1
       *       [0, 0, 0] ] # row 3
       *
       * and a matrix with checks in (row, col) positions
       * (0,0), (0,1), (2, 1) would be represented.
       *
       *     [ [1, 1, 0],
       *       [0, 0, 0],
       *       [0, 1, 0] ]
       */
      setCheckedState(
        utils
          .range(0, sizeNum)
          .map((row) => utils.range(0, sizeNum).map((col) => 0))
      );
    } else if (subtaskString === "1b") {
      /*
       * Representation 1d: An object mapping row indices to a list
       * (in any order, with no duplicates) of column indices that
       *  are checked. If a row index is undefined, all columns for
       * that row are assumed to be unchecked.
       *
       * In this representation, there are multiple representations
       * of the empty matrix, which include:
       *
       *     { }  # The empty object
       *     {0:[], 1:[], 2:[]} # Each index maps to []
       *    {1:[]} # Each defined index maps to []
       *
       * In this representation, there are also multiple representations of
       * the matrix with checks in (row, col) positions (0,0), (0,1), (2,1):
       *
       *     {0:[0,1], 2:[1]},
       *     {0:[1,0], 2:[1]}, # Order of indices is irrelevant
       *     {0:[0,1], 1:[], 2:[1]},
       *     {0:[1,0], 1:[], 2:[1]},
       */

      setCheckedState({});
    } else if (subtaskString === "1c") {
      /*
       * Representation 1c: A *Set* of [row,col] pair strings.
       * In this representation, an empty matrix is represented
       * as an empty set, and matrix with checks in (row, col)
       * positions (0,0), (0,1), (2,1) could be a Set
       * containing the elements "[0,0]", "[0,1]", and "[2,1]"
       * (where order does not matter).
       *
       * Note that it's necessary to convert the Python-like
       * (row,col) tuple notation to `[{row},{col}]` because
       * Sets in this context only make sense for immutable objects
       * testable for equality with ===. But [2,1] === [2,1]
       * is false, whereas "[2,1]" === "[2,1]" is true.
       */
      setCheckedState(new Set());
    } else {
      throw new Error(`Invalid subtaskString ${subtaskString}.`);
    }
  }

  /******* Converting between checkedState and strings *******/
  /** DO NOT MODIFY THIS SECTION */

  /**
   * Returns a string for displaying the given state
   * using the representation for the current subtask.
   *
   * DO NOT MODIFY THIS FUNCTION
   */
  function checkedStateToString(state) {
    // console.log(
    //   `checkedStateToString in subtask ${subtask} is ${JSON.stringify(state)}.`
    // );
    if (state === undefined) {
      return "undefined";
    } else if (subtask === "1a") {
      let rowStrings = state.map(JSON.stringify);
      return "[" + rowStrings.join(",\n ") + "]";
    } else if (subtask === "1b") {
      let keyValStrings = Object.entries(state).map(
        ([num, colIndices]) => `"${num}":${JSON.stringify(colIndices)}`
      );
      return "{" + keyValStrings.join(",\n ") + "}";
    } else {
      // Guaranteed that subtask === '1c'
      // Need to convert Set to array via Array.from in order to use JSON.stringify.
      return JSON.stringify(Array.from(state));
    }
  }

  /**
   * Converts the output of checkedStateToString back to a valid state
   * using the representation for the current subtask.
   *
   * DO NOT MODIFY THIS FUNCTION
   */
  function checkedStateFromString(stateString) {
    if (subtask === "1a") {
      return JSON.parse(stateString);
    } else if (subtask === "1b") {
      return JSON.parse(stateString);
    } else {
      // Guaranteed that subtask === '1c'
      return new Set(JSON.parse(stateString));
    }
  }

  /******************** Mode Predicates ********************/
  /** DO NOT MODIFY THIS SECTION */

  /** Returns `true` if current in exclusive mode, `false` otherwise.
   * DO NOT MODIFY THIS FUNCTION!
   */
  function inInclusiveMode() {
    return mode === "inclusive";
  }

  /** Returns `true` if currently in exclusive mode, `false` otherwise.
   * DO NOT MODIFY THIS FUNCTION!
   */
  function inExclusiveMode() {
    return mode === "exclusive";
  }

  /******************** Event Handlers ********************/

  /**
   * Event handler invoked when texbox input changes.
   * Note that event.target.value does not include the key currently
   * being pressed, because they are changed in different render stages.
   *
   * FLESH OUT THIS FUNCTION, WHICH IS THE SAME FOR ALL TASK 1 SUBTASKS
   */
  function handleInputChange(event) {
    const newSizeString = event.target.value;
    setSizeString(newSizeString);

    if (!isNaN(newSizeString) && parseInt(newSizeString) == newSizeString) {
      const newSize = parseInt(newSizeString);
      if (newSize > 0 && newSize <= MAX_MATRIX_SIZE) {
        setValidityError(""); // Reset validity error if the input is valid
        setSize(newSize);
      } else {
        setValidityError(
          "Invalid size. Please enter a positive integer <= 20."
        );
      }
    } else {
      setValidityError("Invalid input. Please enter a positive integer.");
    }
  }

  /**
   * Event handler invoked when a key is pressed.
   * In this handler, `sizeString` will *not* include the character for this key
   * at its end. But since the 'Enter' key is not concatenated with `sizeString`,
   * `sizeString` does have all relevent characters when the 'Enter' key
   * is pressed.
   *
   * FLESH OUT THIS FUNCTION, WHICH IS THE SAME FOR ALL TASK 1 SUBTASKS
   */
  function handleInputKeyPress(event) {
    if (event.key === "Enter") {
      setMode("inclusive");
      const newSize = parseInt(sizeString);
      setEmptyCheckedState(subtask, newSize);
    }
  }

  /**
   * Event handler invoked when the inclusive/exclusive mode changes.
   * Warning: any call to `setMode` within this handler will *not* take effect
   * until after the app is re-rendered, so `mode` at *any* point in the body
   * of this function refers to mode in effect *before* `setMode` is performed!x
   *
   * FLESH OUT THIS FUNCTION, WHICH IS THE SAME FOR ALL TASK 1 SUBTASKS
   */
  function handleChangeMode(event) {
    const newMode = event.target.value;
    if (mode === "inclusive" && newMode === "exclusive") {
      // Clear the checkboxes when switching from inclusive to exclusive mode
      uncheckAllBoxes();
    }
    setMode(newMode);
  }

  /**
   * Event handler invoked when the subtask 1a/1b/1c state changes.
   * In addition to changing `subtask`, this also sets the checkbox matrix
   * to an empty matrix of the current size in the new representaiton.
   *
   * Warning: any call to `setSubtask` within this handler will *not* take effect
   * until after the app is re-rendered, so `subtask` at *any* point in the body
   * of this function refers to mode in effect *before* `setSubtask` is performed!
   *
   * DO NOT MODIFY THIS FUNCTION!
   */
  function handleChangeSubtask(event) {
    let newSubtask = event.target.value;
    setSubtask(newSubtask);
    // `subtask` hasn't changed yet, so need newSubtask.
    setEmptyCheckedState(newSubtask, size);
  }

  /**
   * Event handler invoked by clicking the `Show/Hide Checkbox State` button
   *
   * DO NOT MODIFY THIS FUNCTION!
   */
  function toggleShowCheckboxState() {
    // console.log('toggleShowCheckboxState()');
    setShowCheckboxState((prevBool) => !prevBool);
  }

  /**
   * Event handler invoked when a checkbox is clicked at `row` and `col`.
   * In all modes, this should toggle the current state of the checkbox.
   * In exclusive mode, it should also uncheck any other checked box
   * in the given row and column (there can be at most one of these in a
   * row and one of these in a column).
   */
  function handleCheckboxOnChangeAt(row, col) {
    //console.log(`in handleCheckboxOnChange(${row}, ${col})`);

    // Determine if box will be checked after the change
    let isBoxCheckedAfterChange = !isBoxCheckedAt(row, col);
    console.log(isBoxCheckedAfterChange);

    // Always toggle clicked box
    toggleBoxAt(row, col);

    // In exclusive mode, if box at (row,col) has just been checked,
    // uncheck any checked box in the same row and column:
    if (inExclusiveMode() && isBoxCheckedAfterChange) {
      if (subtask === "1a") {
        // Iterate through rows and columns to uncheck other checkboxes in the same row and column
        for (let r = 0; r < size; r++) {
          if (r !== row && isBoxCheckedAt(r, col)) {
            uncheckBoxAt(r, col);
          }
        }
        for (let c = 0; c < size; c++) {
          if (c !== col && isBoxCheckedAt(row, c)) {
            uncheckBoxAt(row, c);
          }
        }
      } else if (subtask === "1b") {
        // Handle subtask 1b logic
        setCheckedState((prevState) => {
          const newDict = { ...prevState };
          const currentCols = newDict[row];
          //check row
          currentCols.forEach((c) => {
            if (c !== col) {
              uncheckBoxAt(row, c);
            }
          });

          //check column
          Object.keys(newDict).forEach((r) => {
            if (parseInt(r) !== row) {
              const colsChecked = newDict[parseInt(r)];
              if (colsChecked.includes(col)) {
                colsChecked.forEach((c) => {
                  uncheckBoxAt(parseInt(r), col);
                });
              }
            }
          });
          return newDict;
        });
      } else {
        // Guaranteed that subtask === '1c'
        utils.range(size).forEach((r) => {
          utils.range(size).forEach((c) => {
            if (r === row || c === col) {
              const coordinates = JSON.stringify([r, c]);
              if (checkedState.has(coordinates)) {
                uncheckBoxAt(r, c);
              }
            }
          });
        });
      }
    }
  }

  /******************** Checkbox Functions ********************/

  /**
   * Returns `true` if the checkbox at the given `row` and `col` is checked,
   * and `false` otherwise.
   *
   * FLESH OUT THIS FUNCTION, WHICH DIFFERS FOR EACH SUBTASK
   */
  function isBoxCheckedAt(row, col) {
    //console.log(`checkBoxAt(${row}, ${col}) is called ...`);
    let result;
    if (subtask === "1a") {
      if (checkedState && checkedState[row] && checkedState[row][col] === 1) {
        result = true;
      } else {
        result = false;
      }
    } else if (subtask === "1b") {
      result =
        checkedState && checkedState[row] && checkedState[row].includes(col);
    } else {
      result = checkedState.has(JSON.stringify([row, col]));
    }
    //console.log(`... and returns ${result}`);
    return result;
  }

  /**
   * Ensures that the checkbox at the given `row` and `col` is checked.
   * This will initiate a new render only if the checkbox was previously unchecked.
   * This function should *not* change any checkbox other than the one
   * at the given `row` and `col`.
   */

  function checkBoxAt(row, col) {
    //console.log(`checkBoxAt(${row}, ${col})`);
    if (subtask === "1a") {
      setCheckedState((prevState) => {
        const newState = [...prevState]; // Shallow copy the existing state
        newState[row] = [...prevState[row]]; // Shallow copy the specific row
        newState[row][col] = 1; // Set the checkbox to checked (1)
        return newState;
      });
    } else if (subtask === "1b") {
      setCheckedState((prevState) => {
        const newDict = { ...prevState };
        if (row in newDict) {
          newDict[row] = [...newDict[row]];
          newDict[row].push(col);
        } else {
          //create key, val pair in object
          newDict[row] = [col];
        }
        return newDict;
        // Object.assign(newDict, prevState);
      });
    } else {
      // Guaranteed that subtask === '1c'
      setCheckedState((prev) => {
        const newState = new Set([...prev, JSON.stringify([row, col])]);
        return newState;
      });
    }
  }

  /**
   * Ensures that the checkbox at the given `row` and `col` is unchecked.
   * This will initiate a new render only if the checkbox was previously checked.
   * This function should *not* change any checkbox other than the one
   * at the given `row` and `col`.
   */
  function uncheckBoxAt(row, col) {
    // console.log(`uncheckBoxAt(${row}, ${col})`);
    console.log("!!!!!!");
    console.log("subtask = " + subtask);
    if (subtask === "1a") {
      setCheckedState((prevState) => {
        const newState = [...prevState]; // Shallow copy the existing state
        newState[row] = [...prevState[row]]; // Shallow copy the specific row
        newState[row][col] = 0; // Set the checkbox to unchecked (0)
        return newState;
      });
    } else if (subtask === "1b") {
      setCheckedState((prevState) => {
        const newDict = { ...prevState };
        // Check if the row exists
        if (newDict[row]) {
          const i = newDict[row].indexOf(col);

          // If the checkbox is checked, uncheck it
          if (i !== -1) {
            newDict[row].splice(i, 1);
          }

          // Remove row key if no checked boxes
          if (newDict[row].length === 0) {
            delete newDict[row];
          }
        }

        return newDict;
      });
    } else {
      setCheckedState((prev) => {
        const newState = new Set(
          Array.from(prev).filter((c) => c !== JSON.stringify([row, col]))
        );
        return newState;
      });
    }
  }

  /**
   * Toggles the state of the checkbox at the given `row` and `col`.
   * I.e., if the checkbox is currently unchecked, it will become checked;
   * and if the checkbox is currently checked, it will become unchecked.
   * This function should *not* change any checkbox other than the one
   * at the given `row` and `col`.
   */
  function toggleBoxAt(row, col) {
    if (isBoxCheckedAt(row, col)) {
      console.log("ented toggleBoxAt for unchecking");
      uncheckBoxAt(row, col);
    } else {
      console.log("checkboxat entered");
      checkBoxAt(row, col);
    }
  }

  /**
   * Changes the state of all checkboxes to be checked.
   * This function can is used as the event handler for the `checkAll` button,
   * in which case it ignores the event argumnent for that handler.
   *
   * Although this function *could* be defined the same for all subtasks
   * by calling checkBoxAt for all row & column positions, that would be inefficient.
   * INSTEAD, YOU SHOULD WRITE SEPARATE CODE FOR EACH SUBTASK.
   */
  function checkAllBoxes() {
    //console.log(`checkAllBoxes()`);
    if (subtask === "1a") {
      setCheckedState(
        utils.range(0, size).map((row) => utils.range(0, size).map((col) => 1))
      );
    } else if (subtask === "1b") {
      let newState = Object.fromEntries(
        Array.from({ length: size }, (_, row) => [row, utils.range(0, size)])
      );
      setCheckedState(newState);
    } else {
      // Guaranteed that subtask === '1c'
      utils.range(size).forEach((r) => {
        utils.range(size).forEach((c) => {
          const coordinates = JSON.stringify([r, c]);
          if (!checkedState.has(coordinates)) {
            checkBoxAt(r, c);
          }
        });
      });
    }
  }

  /**
   * Changes the state of all checkboxes to be unchecked.
   * This helper function can used as the event handler for the `uncheckAll` button,
   * in which case it ignores the event argumnent for that handler.
   * It can also be invoked when switching between modes or subtasks.
   *
   * FLESH OUT THIS FUNCTION, WHICH IS THE SAME FOR ALL TASK 1 SUBTASKS
   * IT HAS A ONE-LINE BODY.
   */
  function uncheckAllBoxes() {
    setEmptyCheckedState(subtask, size);
  }

  /**
   * Returns the number of checked checkboxes in the whole matrix.
   *
   * FLESH OUT THIS FUNCTION, WHICH IS THE SAME FOR ALL TASK 1 SUBTASKS.
   * YOU MAY USE rowCount IN THE FUNCTION BODY.
   */

  function totalCount() {
    if (subtask === "1a") {
      if (checkedState && Array.isArray(checkedState)) {
        return utils.sum(checkedState.map((row) => utils.sum(row)));
      }
    } else if (subtask === "1b") {
      return utils.sum(
        Object.values(checkedState).map((array) => array.length)
      );
    } else {
      // Guaranteed that subtask === '1c'
      return Array.from(checkedState).length;
    }
  }
  /**
   * Returns the number of checked checkboxes in row `row`
   *
   * Although this function *could* be defined the same for all subtasks
   * by calling checkBoxAt for all column positions for the given row,
   * that would be inefficient.
   * INSTEAD, YOU SHOULD WRITE SEPARATE CODE FOR EACH SUBTASK.
   */

  function rowCount(row) {
    if (subtask === "1a") {
      if (checkedState && checkedState[row]) {
        return utils.sum(checkedState[row]);
      }
    } else if (subtask === "1b") {
      // if (checkedState && checkedState[row]) {
      //   const colIndices = checkedState[row];
      //   return colIndices.length;
      // }
      // // Return 0 if the row is empty
      // return 0;
      if (checkedState && checkedState[row]) {
        // Use Object.values to get an array of column indices for the specified row
        const colIndices = Object.values(checkedState[row]);
        // Return the length of colIndices, which represents the number of checked checkboxes in the row
        return colIndices.length;
      }
      // Return 0 if the row is empty
      return 0;
    } else {
      // Guaranteed that subtask === '1c'
      return Array.from(checkedState).filter(
        (string) => JSON.parse(string)[0] === row
      ).length;
    }
  }

  /**
   * Returns the number of checked checkboxes in column `col`
   *
   * Although this function *could* be defined the same for all subtasks
   * by calling checkBoxAt for all row positions for the given column,
   * that would be inefficient.
   * INSTEAD, YOU SHOULD WRITE SEPARATE CODE FOR EACH SUBTAS4K.
   */
  function colCount(col) {
    if (subtask === "1a") {
      if (checkedState && Array.isArray(checkedState)) {
        const count = checkedState.filter((row) => row[col] === 1).length;
        return count;
      }
    } else if (subtask === "1b") {
      if (checkedState && Object.keys(checkedState).length > 0) {
        // Use Object.keys to get an array of row indices where the checkbox in the specified column is checked
        const rowIndices = Object.keys(checkedState).filter((row) =>
          checkedState[row].includes(col)
        );
        // Return the number of rows where the checkbox in the specified column is checked
        return rowIndices.length;
      }
      // Return 0 if no rows have the checkbox in the specified column checked
      return 0;
    } else {
      // Guaranteed that subtask === '1c'
      return Array.from(checkedState).filter(
        (string) => JSON.parse(string)[1] === col
      ).length;
    }
  }

  /******************** Component Functions ********************
   * All these functions should be the same for all subtasks
   * Note: they can call helper functions (like totalCount,
   * rowCount, and colCount) whose definition depends on the task.
   *************************************************************/

  /**
   * This component Returns a new JSX TD element holding the given `count`
   * (a number) with background color `bgColor` (a string).
   *
   * FLESH OUT THIS FUNCTION, WHICH IS THE SAME FOR ALL TASK 1 SUBTASKS
   */

  function CountTd({ count, bgColor }) {
    // Replace this stub:
    return <td style={{ backgroundColor: bgColor }}>{count}</td>;
  }

  /**
   * This component returns a new JSX TD element holding the total number
   * of checked checkboxes in the matrix, with a correct background color
   * for the current mode.
   *
   * FLESH OUT THIS FUNCTION, WHICH IS THE SAME FOR ALL TASK 1 SUBTASKS
   */
  function TotalCountTd() {
    if (inExclusiveMode()) {
      const count = totalCount();
      return (
        <CountTd count={count} bgColor={count === size ? "lime" : "red"} />
      );
    } else {
      return <CountTd count={totalCount()} bgColor="magenta" />;
    }
  }

  // function TotalCountTd() {
  //   if (inExclusiveMode()) {
  //     const count = totalCount();
  //     return (
  //       <td style={{ backgroundColor: count === size ? "lime" : "red" }}>
  //         {count}
  //       </td>
  //     );
  //   } else {
  //     return <td style={{ backgroundColor: "magenta" }}>{totalCount()}</td>;
  //   }
  // }

  /**
   * This component returns a new JSX TD element holding the total number
   * of checked checkboxes in row `row` of the matrix, with a correct
   * background color for the current mode.
   *
   * FLESH OUT THIS FUNCTION, WHICH IS THE SAME FOR ALL TASK 1 SUBTASKS
   */

  function RowCountTd({ row }) {
    if (inExclusiveMode()) {
      const count = rowCount(row - 1);
      return (
        <td style={{ backgroundColor: count === 1 ? "lime" : "red" }}>
          {count}
        </td>
      );
    } else {
      return <td style={{ backgroundColor: "orange" }}>{rowCount(row - 1)}</td>;
    }
  }

  /**
   * This component returns a new JSX TD element holding the total number
   * of checked checkboxes in column `col` of the matrix, with a correct
   * background color for the current mode.
   *
   * FLESH OUT THIS FUNCTION, WHICH IS THE SAME FOR ALL TASK 1 SUBTASKS
   */

  function ColCountTd({ col }) {
    if (inExclusiveMode()) {
      const count = colCount(col - 1);
      return (
        <td style={{ backgroundColor: count === 1 ? "lime" : "red" }}>
          {count}
        </td>
      );
    } else {
      return <td style={{ backgroundColor: "yellow" }}>{colCount(col - 1)}</td>;
    }
  }

  /**
   * This component returns a new JSX TD element with a pink background color
   * that holds a checkbox displaying the checkbox state at the given `row`
   * and `col`.
   */
  function CheckboxTd({ row, col }) {
    const isChecked = isBoxCheckedAt(row, col);

    // Event handler for checkbox change
    const handleCheckboxChange = () => {
      // Call handleCheckboxOnChangeAt to toggle the checkbox and handle exclusivity
      handleCheckboxOnChangeAt(row, col);

      // Note: You can also simply call toggleBoxAt(row, col) here instead of handleCheckboxOnChangeAt
    };

    return (
      <td style={{ backgroundColor: "pink" }}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </td>
    );
  }

  /**
   * This component returns a new JSX TR element for the top row of the
   * table. This TR should begin with a JSX TD element holding the number
   * of all checked checkboxes in the matrix, followed by JSX TDs that,
   * for each column, hold the number of checked checkboxes in that column.
   *
   * FLESH OUT THIS FUNCTION, WHICH IS THE SAME FOR ALL TASK 1 SUBTASKS
   */
  function HeaderTr() {
    // Create an array of ColCountTd components for each column
    const colCountCells = utils
      .range(size)
      .map((col) => <ColCountTd col={col + 1} key={col} />);

    // Return the top row of the table
    return (
      <tr>
        <TotalCountTd count={totalCount()} />
        {/* <TotalCountTd count={totalCount()} /> */}
        {colCountCells}
      </tr>
    );
  }

  /**
   * This component returns a JSX TR element for the given non-header `row`
   * in the table. This TR should begin with a JSX TD element holding the
   * count of the number of checked checkboxes in the row, followed by
   * JSX TDsholding the checkboxes for that row.
   *
   * FLESH OUT THIS FUNCTION, WHICH IS THE SAME FOR ALL TASK 1 SUBTASKS
   */
  function NonHeaderTr({ row }) {
    // Replace this stub:
    const checkboxCells = utils
      .range(size)
      .map((col) => <CheckboxTd row={row} col={col} key={col} />);

    // Return the row with checkbox cells
    return (
      <tr>
        <RowCountTd row={row + 1} />
        {checkboxCells}
      </tr>
    );
  }

  /**
   * Returns an array of all the non-header JSX TR elements for the table.
   * (This denotes an array of components, and so can't itself be a component.)
   *
   * FLESH OUT THIS FUNCTION, WHICH IS THE SAME FOR ALL TASK 1 SUBTASKS
   */

  function makeNonHeaderTrs() {
    // Replace this stub:

    const rows = utils.range(size).map((row) => NonHeaderTr({ row }));
    return rows;
  }
  /**************** Returned JSX For the CheckboxMatrixApp *****************
   *
   * CAREFULLY STUDY THE FOLLOWING CODE BUT DO *NOT* MODIFY IT!
   */

  return (
    <div className="container center">
      <h1 className="center title">React JS Checkbox Matrix Web App</h1>
      <div id="controlPanel" className="center">
        <div id="inputDiv" className="center">
          New matrix with size:
          <input
            type="text"
            className="center"
            value={sizeString}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />
          <span id="validityError">{validityError}</span>
        </div>
        <div>
          <span className="choice">
            <input
              type="radio"
              name="mode"
              value="inclusive"
              checked={mode === "inclusive"}
              disabled={size === 0}
              onChange={handleChangeMode}
            />{" "}
            inclusive
          </span>
          <span className="choice">
            <input
              type="radio"
              name="mode"
              value="exclusive"
              checked={mode === "exclusive"}
              disabled={size === 0}
              onChange={handleChangeMode}
            />{" "}
            exclusive
          </span>
          <button
            className="button center"
            disabled={size === 0 || inExclusiveMode()}
            onClick={checkAllBoxes}
          >
            Check All
          </button>
          <button
            className="button center"
            disabled={size === 0}
            onClick={uncheckAllBoxes}
          >
            Uncheck All
          </button>
        </div>
      </div>
      <div id="statePanel">
        <div>
          <span className="choice">
            <input
              type="radio"
              name="subtask"
              value="1a"
              checked={subtask === "1a"}
              onChange={handleChangeSubtask}
            />{" "}
            subtask 1a
          </span>
          <span className="choice">
            <input
              type="radio"
              name="subtask"
              value="1b"
              checked={subtask === "1b"}
              onChange={handleChangeSubtask}
            />{" "}
            subtask 1b
          </span>
          <span className="choice">
            <input
              type="radio"
              name="subtask"
              value="1c"
              checked={subtask === "1c"}
              onChange={handleChangeSubtask}
            />{" "}
            subtask 1c
          </span>
          <button
            className="button center"
            disabled={size === 0}
            onClick={toggleShowCheckboxState}
          >
            {`${showCheckboxState ? "Hide" : "Show"} Checkbox State`}
          </button>
        </div>
        <div>
          {
            /* Show the checkbox state only when size > 0
	     and showCheckboxState is `true` */
            size > 0 && showCheckboxState && checkedStateToString(checkedState)
          }
        </div>
      </div>
      <table>
        <tbody>
          {
            /* React requires TRs to be wrapped in TBODY */
            size > 0 && utils.prepend(<HeaderTr />, makeNonHeaderTrs())
          }
        </tbody>
      </table>
    </div>
  );
}
