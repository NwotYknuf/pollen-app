import { HourlyData } from "./hourly-data";
import { Units } from "./units";

export interface PollenResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    hourly_units: Units;
    hourly: HourlyData;
}