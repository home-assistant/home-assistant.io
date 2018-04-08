---
layout: page
title: "Miscellaneous Async"
description: "A collection of miscellaneous topics about async that didn't fit on the other pages."
date: 2016-10-17 21:49
sidebar: true
comments: false
sharing: true
footer: true
---

## {% linkable_title What about ‘async’ and ‘await’ syntax? %}
Python 3.5 introduced new syntax to formalize the asynchronous pattern. This is however not compatible with Python 3.4. The minimum required Python version for Home Assistant is based on the Python version shipped with Debian stable, which is currently 3.5.3.

For more information, Brett Cannon wrote [an excellent breakdown][brett] on 'async' and 'await' syntax and how asynchronous programming works.

## {% linkable_title Acknowledgements %}

Huge thanks to [Ben Bangert][ben] for starting the conversion of the core to async, guiding other contributors while taking their first steps with async programming and peer reviewing this documentation.

[brett]: http://www.snarky.ca/how-the-heck-does-async-await-work-in-python-3-5
[ben]: https://github.com/bbangert/
