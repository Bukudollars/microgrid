export const CHARGE_STATE_MAX = 0.7;
export const CHARGE_STATE_MIN = 0.3;
export const MODULE_TYPES = Object.freeze([
    Object.freeze({type: "Grid Stability", power: 250, energy: 144}),
    Object.freeze({type: "Grid Stability", power: 500, energy: 288}),
    Object.freeze({type: "Energy Time Shift", power: 250, energy: 288}),
    Object.freeze({type: "Energy Time Shift", power: 250, energy: 1010}),
    Object.freeze({type: "Energy Time Shift", power: 1000, energy: 1152}),                                           
]);