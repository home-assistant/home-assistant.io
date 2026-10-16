## Function signature

The signature is a technical summary of this template function. It shows the name of the function, the values (called parameters) it accepts, and what type of data each parameter expects (for example, a piece of text or a number).

Function parameters that have a `=` with a value after them are optional. If you leave them out, the default value shown is used automatically. Function parameters without a default are required.

If a parameter shows `_SENTINEL`, it has no default value. If you leave it out and the function can't produce a result, the template raises an error. `_SENTINEL` is only a placeholder in the signature: don't type it in your template. To get this behavior, leave the parameter out.

{% details "How to read a signature" %}

Here is the signature of the `round` filter as an example:

```text
round(
    value: Any,
    precision: int = 0,
    method: str = "common",
    default: Any = _SENTINEL,
) -> float | int | Any
```

- `round` is the name of the function.
- Between the parentheses are the parameters. Each one has a name, followed by a colon and the type of value it expects.
- `= 0` and `= "common"` are default values. You can leave these parameters out.
- `->` shows the type of value the function returns.
- Inside a signature, `|` means "or". This function returns a decimal number, a whole number, or the value you passed as `default`.

`round` is a filter, so the first parameter, `value`, is the value before the `|`. For example, {% raw %}`{{ 3.14159 | round(2) }}`{% endraw %} returns `3.14`.

The types you'll see most often:

- `str`: text, such as `"hello"`
- `int`: a whole number, such as `5`
- `float`: a decimal number, such as `3.14`
- `bool`: `true` or `false`
- `list`: a list of values, such as `[1, 2, 3]`. `list[str]` is a list of texts.
- `dict`: a set of keys and values, such as `{"name": "Kitchen"}`
- `datetime` and `timedelta`: a date and time, and a duration. For details, refer to [Dates and times](/docs/templating/dates-and-times/).
- `None`: no value
- `Any`: any type of value

Some signatures use special forms:

- `*args` means you can pass any number of values, separated by commas. For example, `average(1, 2, 3)`.
- `value | name(...)` means the function is a filter. The value before the `|` is passed to the filter as its first parameter. Some filter signatures, like the `round` example, show this value as the first parameter between the parentheses instead.

{% enddetails %}
