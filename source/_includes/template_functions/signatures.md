## Function signature

The signature is a technical summary of this template function. It shows the name of the function, the values (called parameters) it accepts, and what type of data each parameter expects (for example, a piece of text or a number).

Function parameters that have a `=` with a value after them are optional. If you leave them out, the default value shown is used automatically. Function parameters without a default are required.

If a parameter shows `_SENTINEL`, it has no default value. If you leave it out and the function can't produce a result, the template raises an error. `_SENTINEL` is only a placeholder in the signature: don't type it in your template. To get this behavior, leave the parameter out.
