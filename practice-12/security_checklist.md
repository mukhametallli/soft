# Security Checklist
| Check | Code-based implementation | Low-code design / Appsmith template |
|---|---|---|
| Input validation | Validate date, future time, numeric duration, 0 < duration <= 120. | Validate widget values in JS Object before evaluation. |
| Injection / query safety | No SQL queries or dynamic code execution. | No database query is configured; do not concatenate user input into SQL. |
| XSS / output handling | Result uses `textContent`, not `innerHTML`. | Bind plain text to a Text widget; avoid rendering untrusted HTML. |
| Authentication / permissions | Demo has no login; not production-ready. | Restrict app access; grant least privilege to users and datasource accounts. |
| Secrets | No secrets or API keys. | Do not place credentials in client-side JS Objects. |
| Data exposure | Fictional booking data only. | Review public sharing and datasource permissions. |
| Dependencies / SCA | No external runtime dependencies in standalone HTML. | Review platform and plugin updates. |
| Runtime / DAST | Manually test invalid and boundary inputs. | Test widget validation, access rules, and public-sharing behavior. |
| Data integrity | Booking list is read-only. | No create/update/delete action is configured. |
| AI-generated changes | Review code and rerun eight tests. | Review expressions and permissions before publishing. |

**Limitations:** Classroom prototype, not security-certified. No authenticated runtime, backend, or formal DAST/SCA scan has been performed.
