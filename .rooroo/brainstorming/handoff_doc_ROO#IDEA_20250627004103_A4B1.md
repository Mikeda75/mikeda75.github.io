# Handoff Document: CWE Production Dashboard Navigation & Program Flow

## 1. Executive Decision Summary

**Recommendation:** Formally adopt and document the existing stateful, wizard-style navigation flow.

**Decision Factors:** The current linear navigation model is highly effective for the application's purpose. It guides the user through a multi-step data processing and generation task, minimizing confusion and ensuring process integrity. The flow is logical, predictable, and directly implemented in the existing `index.html`.

**Expected Outcome:** A clear, maintainable, and well-documented navigation blueprint that serves as the single source of truth for the application's user journey. This document will streamline future development and ensure consistency.

## 2. Problem Statement & Goal Alignment

**Problem:** The application's user flow, while functional, lacked a formal design document that could be used for strategic planning, developer onboarding, and ensuring future changes don't break the user journey.

**Goal:** To analyze the existing implementation in `index.html`, document the user flow, and create a comprehensive navigation narrative. This will define the transitions between all views and establish a clear, official program flow for the CWE Production Dashboard.

## 3. Evaluation Framework

The navigation design is evaluated against the following principles:

*   **Clarity & Simplicity:** Is the user's path through the application easy to understand?
*   **Process Integrity:** Does the flow prevent users from skipping critical steps (e.g., reviewing data before generating outputs)?
*   **Statefulness:** Does the application correctly manage the visibility of views and controls based on the user's current step in the process?
*   **Efficiency:** Can users accomplish their primary goals (generating schedules, stickers, etc.) with minimal friction?

The current linear, wizard-like flow scores high on all these criteria for its intended purpose.

## 4. Explored Solution Blueprints

### Blueprint 1: The Stateful Wizard (Recommended)

*   **Concept:** A linear, sequential navigation model where the user is guided from one step to the next. The application's state (managed via JavaScript) dictates which view is visible and which actions are available. This is the current implementation.
*   **Pros:**
    *   Extremely clear user journey.
    *   High degree of control over the process.
    *   Reduces the cognitive load on the user.
    *   Already implemented and proven effective.
*   **Cons:**
    *   Can feel restrictive if a user needs to jump between non-sequential steps.
*   **Impact/Effort Score:**
    *   **Impact:** High (Provides a clear and robust user experience).
    *   **Effort:** None (It is already implemented).
*   **Risk Analysis:** Low risk. The primary risk is that future feature additions might make the linear flow cumbersome. This can be mitigated by re-evaluating the navigation model if the application's scope expands significantly.

## 5. The Recommended Blueprint (Detailed Handoff)

This section details the implemented "Stateful Wizard" navigation flow.

### A. Detailed Implementation Strategy: The User Journey

The user journey is a sequence of well-defined screens. The transition between them is controlled by specific user actions.

1.  **Initiation:** The user opens the dashboard from Google Sheets.
2.  **Loading:** The `#loading-overlay` is displayed while data is fetched from the backend (`Code.gs`).
3.  **Data Review:** The application presents the **Data Review Screen** ([`#review-container`](index.html:415)). The user verifies the parsed data.
4.  **Confirmation:** The user clicks "Confirm and Generate Schedule".
5.  **Main Hub:** The application transitions to the **Main Schedule View** ([`#output`](index.html:431)), which acts as the central hub. The main navigation bar ([`#output-controls`](index.html:394)) becomes visible.
6.  **Output Generation (User Choice):** From the main hub, the user can navigate to several sub-views:
    *   **Generate Stickers:** Takes the user to the **Sticker Configuration Screen** ([`#sticker-settings-container`](index.html:435)). After configuration, they proceed to the **Sticker Sheet Preview** ([`#sticker-sheet-container`](index.html:479)).
    *   **Generate Tracking Sheet:** Takes the user directly to the **Tracking Sheet Preview** ([`#tracking-sheet-container`](index.html:480)).
    *   **View Casting Layout:** Takes the user to the interactive **Casting Layout Visualization** ([`#casting-layout-container`](index.html:481)).
7.  **Return to Hub:** From any sub-view (Stickers, Tracking, Layout), the user can click "Back to Schedule" to return to the **Main Schedule View**.

### B. Key Components & Features (Views)

The navigation is managed by toggling the `display` property of these key container `div`s:

*   `#loading-overlay`: Initial data fetching indicator.
*   `#review-container`: Data verification screen.
*   `#output`: Main schedule view and central hub.
*   `#sticker-settings-container`: Configuration form for stickers.
*   `#sticker-sheet-container`: Preview for generated stickers.
*   `#tracking-sheet-container`: Preview for the tracking sheet.
*   `#casting-layout-container`: Interactive canvas for visualizing casting layouts.

### C. Technical & Resource Considerations

*   **Architecture:** Single-Page Application (SPA) contained within a single `index.html` file.
*   **View Management:** Views are toggled by manipulating the `display` CSS property via JavaScript. There is no complex routing library.
*   **State Management:** The application state (parsed data, UI state) is held in the global `appState` and `layoutState` JavaScript objects.
*   **Dependencies:** The frontend communicates with the Google Sheet backend via the `google.script.run` API.

### D. Test & Validation Plan

To validate the navigation flow, perform the following checks:

1.  **Full Flow Test:** Start the application and click through every possible path, from initial review to generating each output type.
2.  **Button State Verification:** Ensure buttons are enabled/disabled correctly based on the application's state (e.g., "Print Schedule" is disabled until a schedule is generated).
3.  **Back Button Functionality:** Verify that the "Back to Schedule" and "Back to Review" buttons correctly return the user to the expected view and restore the UI to the correct state.
4.  **View Exclusivity:** Confirm that only one main view container is visible at any given time.

### E. Agent Tasking Brief

**For:** `rooroo-developer`

**Goal:** Your task is to add a new feature to the CWE Production Dashboard. Refer to this Handoff Document to understand the existing navigation flow and component IDs.

**Example Task:** Implement a "Download as CSV" button in the main navigation bar ([`#output-controls`](index.html:394)). This button should only be visible when the **Main Schedule View** ([`#output`](index.html:431)) is active. You will need to add the button to `index.html` and create a new JavaScript function to handle the CSV generation and download. Ensure the new button follows the existing UI patterns.

## 6. Open Questions & Future Scope

*   **Breadcrumbs:** For improved user orientation, could a simple breadcrumb trail (e.g., "Review > Schedule > Sticker Preview") be beneficial?
*   **Non-Linear Navigation:** If the tool evolves to include more independent modules, the strict linear flow may need to be revisited in favor of a more flexible navigation model (e.g., a persistent sidebar).
*   **URL State:** The application does not use URL hashes to manage state. This means the application's state is lost on reload. While acceptable for a modal dialog, this could be a consideration for a standalone web app version.