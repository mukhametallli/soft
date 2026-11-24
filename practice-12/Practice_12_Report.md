# Software Engineering — Practice Work #12
## Comparison of Code-Based and Low-Code Solutions
### Smart Campus Room Availability Checker

**Student:** Anel Mukhametali  
**Student ID:** 25B031405  
**Class day/time:** Tuesday 16:00–18:50  
**AI tool:** ChatGPT, GPT-6

## 1. Project Overview
The project compares two approaches to checking whether one fictional campus room is available for a requested future time interval. The system uses fixed fictional bookings and returns an availability boolean, a reason code, and a visible message. It does not create bookings or use personal data, login, payment, or a production database.

## 2. Shared User Story and Acceptance Criteria
**User story:** As a student, I want to select a future start time and duration so that I can see whether the fictional campus room is available and understand the reason when it is not.

Inputs: start time, duration, blocked flag, and fixed fictional bookings. Outputs: availability boolean, reason code, and visible message. Booking intervals are half-open [start, end), so adjacent intervals do not overlap.

| ID | Acceptance criterion | Verification |
|---|---|---|
| AC1 | Start time must be in the future. | Past/future start-time tests |
| AC2 | Duration must be greater than zero and at most 120 minutes. | 0, 120, and 121-minute tests |
| AC3 | Overlapping bookings are unavailable. | Interval-overlap test |
| AC4 | Blocked room is unavailable. | Blocked flag test |
| AC5 | Display a clear decision without changing existing bookings. | Result and before/after data comparison |
| AC6 | Invalid input receives understandable feedback. | Invalid start, past start, invalid duration |

## 3. Implementations

### 3.1 Code-Based
A standalone responsive HTML/CSS/JavaScript application is supplied as `smart_campus_checker.html`. It validates future start time and duration, checks room-blocked status, detects overlaps, and displays a clear result. It uses `textContent` for output rendering and has no external runtime dependencies.

Run by opening `smart_campus_checker.html` in a modern browser. Fixed fictional bookings are 09:00–10:00, 11:00–12:00, and 14:00–15:00 on 25 November 2026.

### 3.2 Low-Code
An Appsmith JS Object template is supplied as `appsmith_low_code_jsobject.js`. Intended controls are a DatePicker, duration Select, blocked-room Switch, Button, and Text result widget. The same booking data and decision rules are used.

**Important limitation:** this file is a configuration template only. It has not been imported into a live Appsmith workspace, published, or tested in the Appsmith runtime. It must not be represented as a completed live deployment.

## 4. Eight-Case Test Table
The following outcomes are rule-level results evaluated against the fixed clock 24 November 2026, 08:00. They are reproducible logic-level checks, not screenshots or evidence of a published browser/Appsmith runtime.

| Test | Scenario | Expected | Observed (rule-level) | Result |
|---|---|---|---|---|
| T1 | Valid free interval | Available | Available | PASS |
| T2 | Overlap existing booking | Unavailable | Unavailable | PASS |
| T3 | Blocked room | Unavailable | Unavailable | PASS |
| T4 | Duration equals zero | Validation error | Validation error | PASS |
| T5 | Duration equals 121 minutes | Validation error | Validation error | PASS |
| T6 | Past start time (07:00, before fixed clock 08:00) | Validation error | Validation error | PASS |
| T7 | Adjacent non-overlapping interval | Available | Available | PASS |
| T8 | Booking data unchanged after checks | Unchanged (read-only) | Unchanged (read-only; no write operation exists) | PASS |

## 5. Comparison Matrix

| Criterion | Code-based | Low-code (Appsmith template) |
|---|---|---|
| Functional tests | 8/8 rule-level scenarios pass with the fixed clock and corrected past-time fixture. | 8/8 logic scenarios are represented by the shared rule template; Appsmith runtime is not yet verified. |
| Build and repair time | Not measured; record actual elapsed minutes during build. | Not measured; record actual elapsed minutes after configuring Appsmith. |
| Customization | High: direct control over HTML, CSS, JavaScript, validation, and responsive layout. | Medium: fast visual composition; custom behavior is added through JS Object expressions. |
| Security controls | Validation and safe text output are visible in source; no auth/backend; no dependencies. | Platform permissions and datasource controls are available but must be configured and reviewed; no live review performed. |
| Versioning / portability | Plain files can be committed to Git and hosted as static HTML. | Appsmith app export/import is platform-dependent; JS Object can be versioned, but full portability needs export verification. |
| Ongoing cost | No paid runtime dependency for the static demo; hosting/domain costs may apply. | Community self-hosting may avoid license fees but requires infrastructure/maintenance; verify current cloud pricing and limits. |

## 6. Security Review
- **Input validation:** reject missing/invalid start time, past time, non-numeric duration, duration <= 0, and duration > 120.
- **Injection:** no SQL/database query or dynamic code execution is used in the code-based demo. Do not concatenate user input into SQL if a datasource is added later.
- **XSS:** code-based result uses `textContent` rather than `innerHTML`. Low-code result should be bound as plain text.
- **Permissions and least privilege:** the demo has no authentication. A real Appsmith deployment must restrict app access and datasource permissions.
- **Secrets:** no API keys or credentials are included. Never put secrets in client-side expressions.
- **Data exposure:** only fictional bookings are used. Review public sharing and datasource access before deployment.
- **SCA/DAST:** no third-party runtime dependencies are used in the static demo. No formal SCA or DAST scan has been performed; manual runtime checks remain necessary.
- **Data integrity:** booking data is read-only and no booking mutation operation exists.

This is a classroom prototype, not a security-certified production system.

## 7. AI-Use Reflection
ChatGPT (GPT-6) was used to structure the requirements, draft the JavaScript rule engine, prepare the Appsmith JS Object template, and generate the test matrix. The generated logic was checked against AC1–AC6 and the eight scenarios. The half-open interval rule ensures adjacent bookings are accepted. AI output was treated as a draft rather than proof of deployment. The standalone HTML and rule-level test results are provided as reproducible artifacts. The Appsmith template has not been imported, published, or tested in its live runtime; actual platform screenshots and timings must be added after execution.

## 8. Recommendation
For this small deterministic checker, the code-based approach is the stronger completed prototype because it provides direct customization, transparent source code, and straightforward Git versioning without a platform dependency. Low-code is a reasonable option when rapid visual assembly and platform-managed access controls are priorities, but the Appsmith implementation must first be imported and runtime-tested. This recommendation is based on the supplied implementation artifacts and design characteristics; build/repair time and live low-code results have not been measured.

## 9. Submission Evidence and Remaining Actions
1. Open the HTML demo and capture screenshots showing the interface, Available result, overlap result, blocked-room result, and validation errors.
2. Import the Appsmith JS Object, create the widgets described in README.md, run the same eight tests, and capture real screenshots.
3. Measure setup, implementation, debugging, and testing time separately for each approach; do not invent timings.
4. Publish the code-based demo and Appsmith app if available; insert the actual live URLs.
5. Submission email shown in the assignment: b.azimkhanov@kbtu.kz. Subject format: **AI-Driven Software Engineering Practice #13, Anel Mukhametali, 25B031405**.
