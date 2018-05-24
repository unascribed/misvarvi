# misvarvi

misvarvi, Estonian for "What color?", is a command-line tool that finds
the closest color in [color-name-list](https://github.com/meodai/color-names)
to the color that was passed in, using the [CIEDE2000](http://en.wikipedia.org/wiki/Color_difference#CIEDE2000)
color difference algorithm. It was inspired by [cherangi](https://github.com/shariati/cherangi/)
but was designed for command-line use, so it emits a well-formed JSON
object instead of a debug object, and was also switched to use the CIEDE2000
algorithm instead of the CIE94 algorithm, as it's more accurate.
