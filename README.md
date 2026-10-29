# OEMS Maximum Use Concentration (MUC) Calculator

Calculates the maximum use concentration as APF × OEL, using the OSHA 29 CFR 1910.134 Table 1 APF for the selected respirator, and caps it at the IDLH when one is entered. Based on the "MUC Calculator" Google Sheet.

Plain HTML, CSS, and JavaScript with no build step. To deploy on Vercel, import the repo and leave the framework preset as "Other".

- `index.html`: the page
- `calc.js`: the calculation logic and the Table 1 APF list
- `app.js`: connects the form to the calculation
- `style.css`: the styles (from the OEMS Required APF Calculator, plus the results units column)
- `disclaimer.css`, `disclaimer.js`: the first-visit disclaimer gate (agreement is saved in localStorage as `oems_disclaimer_v1`)
- `tests/check.js`: test cases, run with `node tests/check.js`
