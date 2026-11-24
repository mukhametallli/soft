// Appsmith JS Object: AvailabilityLogic
// Widgets: DatePickerStart, SelectDuration, SwitchBlocked.
// Text binding: {{AvailabilityLogic.result.message}}
// Button onClick: {{AvailabilityLogic.checkAvailability()}}
// Template only: not a published Appsmith application.

export default {
  bookings: [
    { id: "B001", start: "2026-11-25T09:00", end: "2026-11-25T10:00" },
    { id: "B002", start: "2026-11-25T11:00", end: "2026-11-25T12:00" },
    { id: "B003", start: "2026-11-25T14:00", end: "2026-11-25T15:00" }
  ],
  result: { available: null, reasonCode: "NOT_CHECKED", message: "Choose a start time and duration." },
  checkAvailability() {
    const start = DatePickerStart.selectedDate;
    const duration = Number(SelectDuration.selectedOptionValue);
    const blocked = SwitchBlocked.isSwitchedOn;
    const startDate = new Date(start);
    const now = new Date();
    if (!start || Number.isNaN(startDate.getTime())) {
      this.result = { available: false, reasonCode: "INVALID_START", message: "Please enter a valid start date and time." };
    } else if (startDate <= now) {
      this.result = { available: false, reasonCode: "PAST_START", message: "Start time must be in the future." };
    } else if (!Number.isFinite(duration) || duration <= 0 || duration > 120) {
      this.result = { available: false, reasonCode: "INVALID_DURATION", message: "Duration must be greater than 0 and no more than 120 minutes." };
    } else if (blocked) {
      this.result = { available: false, reasonCode: "ROOM_BLOCKED", message: "This room is currently blocked." };
    } else {
      const endDate = new Date(startDate.getTime() + duration * 60000);
      const conflict = this.bookings.some(b => startDate < new Date(b.end) && endDate > new Date(b.start));
      this.result = conflict
        ? { available: false, reasonCode: "BOOKING_CONFLICT", message: "The selected time overlaps an existing booking." }
        : { available: true, reasonCode: "AVAILABLE", message: "The room is available for the selected time." };
    }
    return this.result;
  }
};
