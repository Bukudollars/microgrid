export const LOAD_PROFILE = Object.freeze([
    {hour: 0, residential: 0.12, commercial: 0.15, industrial: 1.0, community: 0.43},
    {hour: 1, residential: 0.08, commercial: 0.15, industrial: 1.0, community: 0.15},
    {hour: 2, residential: 0.08, commercial: 0.15, industrial: 1.0, community: 0.15},
    {hour: 3, residential: 0.12, commercial: 0.15, industrial: 1.0, community: 0.15},
    {hour: 4, residential: 0.12, commercial: 0.15, industrial: 1.0, community: 0.15},
    {hour: 5, residential: 0.22, commercial: 0.15, industrial: 1.0, community: 0.25},
    {hour: 6, residential: 0.30, commercial: 0.15, industrial: 1.0, community: 0.43},
    {hour: 7, residential: 0.50, commercial: 0.15, industrial: 1.0, community: 0.58},
    {hour: 8, residential: 0.38, commercial: 0.55, industrial: 1.0, community: 0.65},
    {hour: 9, residential: 0.32, commercial: 1.0, industrial: 1.0, community: 0.65},
    {hour: 10, residential: 0.32, commercial: 1.0, industrial: 1.0, community: 0.65},
    {hour: 11, residential: 0.38, commercial: 1.0, industrial: 1.0, community: 0.65},
    {hour: 12, residential: 0.40, commercial: 1.0, industrial: 1.0, community: 0.65},
    {hour: 13, residential: 0.55, commercial: 1.0, industrial: 1.0, community: 0.65},
    {hour: 14, residential: 0.48, commercial: 1.0, industrial: 1.0, community: 0.65},
    {hour: 15, residential: 0.30, commercial: 1.0, industrial: 1.0, community: 0.65},
    {hour: 16, residential: 0.30, commercial: 1.0, industrial: 1.0, community: 0.65},
    {hour: 17, residential: 0.30, commercial: 1.0, industrial: 1.0, community: 0.75},
    {hour: 18, residential: 0.55, commercial: 0.82, industrial: 1.0, community: 0.84},
    {hour: 19, residential: 1.0, commercial: 0.65, industrial: 1.0, community: 1.0},
    {hour: 20, residential: 0.78, commercial: 0.55, industrial: 1.0, community: 1.0},
    {hour: 21, residential: 0.55, commercial: 0.15, industrial: 1.0, community: 1.0},
    {hour: 22, residential: 0.48, commercial: 0.15, industrial: 1.0, community: 1.0},
    {hour: 23, residential: 0.22, commercial: 0.15, industrial: 1.0, community: 0.75},
    
]);

export const LOAD_PROFILE_OPTIONS = Object.freeze(["Commercial", 'Residential', 'Industrial', 'Community']);

export const POWER_FACTOR_MIN = Object.freeze({residential: 0.9, commercial: 0.8, industrial: 0.75, community: 0.85});
export const POWER_FACTOR_MAX = Object.freeze({residential: 1.0, commercial: 0.95, industrial: 0.9, community: 0.95});
export const POWER_FACTOR_VARIATION_PER_MINUTE = Object.freeze({residential: 0.01, commercial: 0.02, industrial: 0.02, community: 0.01});
export const LOAD_VARIATION_MIN = 0.85;
export const LOAD_VARIATION_MAX = 1;
export const LOAD_VARIATION_PER_MINUTE = 0.05;