---
layout: page
title: "Testing your code"
description: "Make sure that your code passes the checks"
date: 2016-07-01 20:00
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant enforces strict [PEP8 style](https://www.python.org/dev/peps/pep-0008/) compliance on all code submitted. Every Pull Request is automatically tested with [Coveralls](https://coveralls.io/github/home-assistant/home-assistant) and [Travis CI](https://travis-ci.org/home-assistant/home-assistant) after it is created.

### {% linkable_title Local testing %}

It's highly recommanded to run `tox` before you create your Pull Request to avoid annoying fixes. Local testing requires `tox` to be installed.

```bash
$ pip3 install tox
```

Start the test of your code with `tox`.

```bash
$ tox
```

This will run unit tests against python 3.4 and 3.5 (if both are available locally), as well as run a set of tests which validate `pep8` and `pylint` style of the code.

You can optionally run tests on only one tox target using the `-e` option to select an environment.

For instance `tox -e lint` will run the linters only, `tox -e py34` will run unit tests only on python 3.4.

### {% linkable_title Prevent Linter Errors %}
 
You can save yourself the hassle of extra commits just to fix style errors by enabling the flake8 git commit hook. It will check your code when you attempt to commit to the repository. It will block the commit if there are any style issues, giving you a chance to fix it.

```bash
$ pip3 install flake8 flake8-docstrings
$ flake8 --install-hook
```

The flake8-docstrings extension will check docstrings according to [PEP257](https://www.python.org/dev/peps/pep-0257/) when running flake8.

### {% linkable_title Notes on PyLint and PEP8 validation %}

In case a PyLint warning cannot be avoided, add a comment to disable the PyLint check for that line. This can be done using the format `# pylint: disable=YOUR-ERROR-NAME`. Example of an unavoidable PyLint warning is if you do not use the passed in datetime if you're listening for time change.

