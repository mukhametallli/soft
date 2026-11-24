// Smart Campus Room Availability Checker
// Shared deterministic rule engine for code-based and low-code versions.
const BOOKINGS = [
  { id: "B001", start: "2026-11-25T09:00", end: "2026-11-25T10:00" },
  { id: "B002", start: "2026-11-25T11:00", end: "2026-11-25T12:00" },
  { id: "B003", start: "2026-11-25T14:00", end: "2026-11-25T15:00" }
];
function checkAvailability({ start, duration, blocked = false, bookings = BOOKINGS, now = new Date() }) {
  const startDate = new Date(start);
  const minutes = Number(duration);
  if (!start || Number.isNaN(startDate.getTime()))
    return { available: false, reasonCode: "INVALID_START", message: "Please enter a valid start date and time." };
  if (startDate.getTime() <= now.getTime())
    return { available: false, reasonCode: "PAST_START", message: "Start time must be in the future." };
  if (!Number.isFinite(minutes) || minutes <= 0 || minutes > 120)
    return { available: false, reasonCode: "INVALID_DURATION", message: "Duration must be greater than 0 and no more than 120 minutes." };
  if (blocked)
    return { available: false, reasonCode: "ROOM_BLOCKED", message: "This room is currently blocked." };
  const endDate = new Date(startDate.getTime() + minutes * 60000);
  const overlap = bookings.some(b => startDate < new Date(b.end) && endDate > new Date(b.start));
  if (overlap)
    return { available: false, reasonCode: "BOOKING_CONFLICT", message: "The selected time overlaps an existing booking." };
  return { available: true, reasonCode: "AVAILABLE", message: "The room is available for the selected time." };
}
if (typeof module !== "undefined") module.exports = { checkAvailability, BOOKINGS };
