# misvarvi

misvarvi, Estonian for "What color?", is a command-line tool that finds
the closest color in [color-name-list](https://github.com/meodai/color-names)
to the color that was passed in, using the [CIEDE2000](http://en.wikipedia.org/wiki/Color_difference#CIEDE2000)
color difference algorithm. It was inspired by [cherangi](https://github.com/shariati/cherangi/)
but was designed for command-line use, so it emits a well-formed JSON
object instead of a debug object, and was also switched to use the CIEDE2000
algorithm instead of the CIE94 algorithm, as it's more accurate.

## Usage

Invoke misvarvi as you would any standard Node script. CSS HSL and CSS
RGB are also accepted, among a few other less useful forms. (See the
[chromatism docs](https://github.com/toish/chromatism#colour-modes) for
all valid forms.)

```bash
node misvarvi/index.js '#AE3440'
```

It will return a JSON object, which you can then parse using something like
[jq](https://stedolan.github.io/jq/).

```json
{"delta":1.4980639388194081,"status":4,"hex":"#a73940","name":"Jules"}
```

The JSON object will always have the following values:

* **delta**: the CIEDE2000 DeltaE between the input color and the returned match. `null` if no match was found.
* **status**: see below
* **hex**: the exact RGB hex color of the matched color
* **name**: the name of the matched color

Status will be one of the following numbers:

* **-1**: No match found.
* **1**: Exact match.
* **2**: Difference between match and input is not perceptible by humans.
* **4**: Difference between match and input is perceptible upon close observation.
* **8**: Difference between match and input is perceptible at a glance.
* **16**: Difference between match and input is very apparent, but they are more similar than different.
* **32**: Colors are different, but no better match was found.

They are bitflags because cherangi used bitflags, not because they will
ever be returned OR'd together. They could've easily been 0, 1, 2, 3, 4, 5, and 6,
but I already have scripts designed for cherangi and didn't want to change
them.
