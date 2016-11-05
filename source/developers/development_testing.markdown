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

Home Assistant enforces strict [PEP8 style](https://www.python.org/dev/peps/pep-0008/) compliance on all code submitted. We automatically test every pull request with [Coveralls](https://coveralls.io/github/home-assistant/home-assistant) and [Travis CI](https://travis-ci.org/home-assistant/home-assistant).

### {% linkable_title Local testing %}

**Important:** Run tox before you create your pull request to avoid annoying fixes. Local testing requires installing tox.

```bash
$ pip3 install tox
```

Start your code test with `tox`.

```bash
$ tox
```

This will run unit tests against Python 3.4 and 3.5 (if both are available locally), as well as tests that validate `pep8` and `pylint` style.

#### {% linkable_title Testing Tips %}

You can run tests on only one tox target -- just use `-e` to select an environment. For example, `tox -e lint` runs the linters only, and `tox -e py34` runs unit tests only on Python 3.4.

tox uses virtual environments under the hood to create isolated testing environments. The tox virtual environments will get out-of-date when requirements change, causing test errors. Run `tox -r` to create new tox virtual environments.

During development on a specific file, speed up your workflow by running tests and linting only for the file that you're working on. To run individual files:

```bash
$ flake8 homeassistant/core.py
$ pylint homeassistant/core.py
$ pydocstyle homeassistant/core.py
$ py.test tests/test_core.py
```

You can also run linting tests against all changed files, as reported by `git diff upstream/dev --name-only`, using the `lint` script:

```bash
$ script/lint --changed
```

### {% linkable_title Preventing Linter Errors %}
 
Save yourself the hassle of extra commits just to fix style errors by enabling the Flake8 git commit hook. Flake8 will check your code when you try to commit to the repository and block the commit if there are any style errors, which gives you a chance to fix them!

```bash
$ pip3 install flake8 flake8-docstrings
$ flake8 --install-hook=git
```

The `flake8-docstrings` extension will check docstrings according to [PEP257](https://www.python.org/dev/peps/pep-0257/) when running Flake8.

### {% linkable_title Notes on PyLint and PEP8 validation %}

If you can't avoid a PyLint warning, add a comment to disable the PyLint check for that line with `# pylint: disable=YOUR-ERROR-NAME`. An example of an unavoidable PyLint warning is not using the passed-in datetime if you're listening for a time change.
