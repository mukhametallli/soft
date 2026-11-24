# Shared Requirements & Acceptance Criteria
**System:** Smart Campus Room Availability Checker  
**Scope:** One fictional campus room; fixed fictional bookings; no login, payment, personal data, production database, or real booking creation.

**User story:** As a student, I want to select a future start time and duration so that I can see whether the fictional campus room is available and understand the reason when it is not.

| ID | Acceptance criterion | Verification |
|---|---|---|
| AC1 | Start time must be in the future. | Past and future start-time tests |
| AC2 | Duration must be greater than zero and at most 120 minutes. | 0, 120, and 121-minute tests |
| AC3 | Overlapping bookings are unavailable. | Interval-overlap test |
| AC4 | Blocked room is unavailable. | Blocked flag test |
| AC5 | Display a clear decision without changing existing bookings. | Result and before/after data comparison |
| AC6 | Invalid input receives understandable feedback. | Invalid start, past start, invalid duration |

Inputs: start time, duration, blocked flag, fixed fictional bookings. Outputs: availability boolean, reason code, visible message. Intervals are half-open `[start, end)`; adjacent bookings do not overlap.
