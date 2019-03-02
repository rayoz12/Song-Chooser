# Presentation Software (Remote Control)
This handles presenting the projections that have been assembled.

## Feature List
- Launches all Anchor links in the page to another window (called the child page).
- Automatically scroll the child window at a set pace.
- Outputs the child window in a Picture in Picture display. Write up available here at my [blog](https://blog.ryanjpereira.com)
- Gets all headings in that page and lists it in clickable links to scroll the child page to that link.
- Has a scroll precentage indicating how far down the page you have scrolled


## Technical Notes
This software makes extensive use of the following libraries:
- JQuery - General DOM reading and event handlers
- html2Canvas - Used in the picture in picture mode to generate a screenshot of the screen.

Please make sure that these 2 scripts are includes with this file in the page.