---
layout: page
title: "Setup Development Environment"
description: "Setup your environment to start developing for Home Assistant."
date: 2014-12-21 13:32
sidebar: true
comments: false
sharing: true
footer: true
---

You'll need to set up a development environment if you want to develop a new feature or component for Home Assistant. Read on to learn how to set up.

1. Visit the [the Home Assistant repository](https://github.com/home-assistant/home-assistant) and click "fork."

  * Consider setting up a virtual environment using [`venv`](https://docs.python.org/3.4/library/venv.html) before running the setup script.

  ```bash
  $ git clone https://github.com/YOUR_GIT_USERNAME/home-assistant.git
  $ cd home-assistant
  $ git remote add upstream https://github.com/home-assistant/home-assistant.git
  $ script/setup
  ```
  * On Windows, you can use `python setup.py develop` instead of the setup script.

2. Run `hass` to invoke your local installation.

### Developing on Windows 
If you are using Windows as a development platform, make sure that you have the correct Microsoft Visual C++ build tools installed. Check the [Windows Compilers](https://wiki.python.org/moin/WindowsCompilers) section on the [Python website](https://www.python.org/) for details. Validation using `tox` will fail if this is not done correctly. 

Also, make sure to install or upgrade the `Setuptools` Python package -- it contains compatibility improvements and adds automatic use of compilers: 
  ```bash
  pip install --upgrade setuptools
  ```

