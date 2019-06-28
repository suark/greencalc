# Green Calc

In a Galaxy far, far away on a planet called Sam lives a species called Sung that is very
different from humans. They only have 3 fingers instead of 5. As a result, they use different
numerical system than inhabitants of planet Earth. Sungs only recognize shades of green
and are very keen on seeing your solution for a base 6 calculator implemented using React
Native technology.

### Breakdown

1: "They only have 3 fingers instead of 5"
2: "only recognize shades of green"
3: "base 6 calculator"

### Analysis:

1. Assumption: The user has 3 literal fingers, so no thumb.
2. Assumption: All colors used must be some recongnizable shade of green.
3. Assumption: Numbers are entered in base6 and always viewed in base6.

In order to combine my assumptions and the requirements, I'm going to do this in the following way:
- All colors will be shades of green
- Numbers will appear only in heximal form
- I'll assume the user holds their three fingers over the screen and presses all the buttons in the left column with left finger, middle column - middle finger, and right column - right finger
- I didn't allow for fractional math because it was harder and I didn't think it was needed in the scope of this project, so any time a number results in a fraction, the fractional part is simply truncated away
- It will handle negative Numbers
- Will handle order of operations, left to right BEDMAS

### To Use:

1. `npm install`
2. `react-native run-ios or` `react-native run-android`

### To Test:

1. `npm run jest`
