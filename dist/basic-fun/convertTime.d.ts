/**
 * Converts time between milliseconds, seconds, and minutes.
 * @author Hannah Tschannen
 * @param {number} input - The value to be converted.
 * @param {string} input_unit - The unit of the input value ('ms', 's', or 'min').
 * @param {string} convert_to - The desired conversion type ('ms', 's', or 'min').
 * @returns {number|string} - The converted value, or an error message if the conversion is invalid.
 */
export declare const convertTime: (input: number, input_unit: string, convert_to: string) => number | "Invalid conversion. Please check the input units and conversion type.";
