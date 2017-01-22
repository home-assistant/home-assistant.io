---
layout: page
title: "Set up Development Environment"
description: "Set up your environment to start developing for Home Assistant."
date: 2014-12-21 13:32
sidebar: true
comments: false
sharing: true
footer: true
---

You'll need to set up a development environment if you want to develop a new feature or component for Home Assistant. Read on to learn how to set up.

### {% linkable_title Setup Local Repository %}

Visit the [Home Assistant repository](https://github.com/home-assistant/home-assistant) and click **Fork**.
Once forked, setup your local copy of the source using the commands:
```bash
$ git clone https://github.com/YOUR_GIT_USERNAME/home-assistant.git
$ cd home-assistant
$ git remote add upstream https://github.com/home-assistant/home-assistant.git
```

### {% linkable_title Prepare Your Environment %}

#### {% linkable_title Core dependencies %} 

Install the core dependencies.
```bash
$ sudo apt-get install python3-pip python3-dev libssl-dev
```
<p class='note'>
Different distributions have different package installation mechanisms and sometimes packages names as well. For example Centos would use: `sudo yum install epel-release python34 python34-devel mysql-devel`
</p>

#### {% linkable_title Frontend dependencies (optional) %} 

In order to run or develop the [Frontend](https://home-assistant.io/developers/frontend/) you will need node.js. The preferred method of installing node is [nvm](https://github.com/creationix/nvm). Install nvm using the instructions in the [README](https://github.com/creationix/nvm#install-script), and install node.js by running the following command:
```bash
$ nvm install node
```

#### {% linkable_title Setting up virtual environment (optional) %} 

If you plan on providing isolation to your environment using [`venv`](https://docs.python.org/3.4/library/venv.html). You'll need to install the python3-venv package:
```bash
$ sudo apt-get install python3-venv
```
Within the `home-assistant` directory, create and activate your virtual environment using the commands:
```bash
$ pyvenv venv
$ source venv/bin/activate
```

### {% linkable_title Setup and Run %}

* On Mac OS X and Linux (remember to activate your virtual environment before running setup, if you are using one):
```bash
$ cd home-assistant
$ script/setup
```

* On Windows, you can use `python setup.py develop` instead of the setup script.

* Run `hass` to invoke your local installation of the backend server or `hass --open-ui` to start the server and serve the web interface on http://localhost:8123

### {% linkable_title Logging %}

By default logging in home-assistant is tuned for operating in
production (set to INFO by default, with some modules set to even less
verbose logging levels).

You can use the [logger](/components/logger/) component to adjust
logging to DEBUG to see even more details about what is going on.

### {% linkable_title Developing on Windows %}

If you are using Windows as a development platform, make sure that you have the correct Microsoft Visual C++ build tools installed. Check the [Windows Compilers](https://wiki.python.org/moin/WindowsCompilers) section on the [Python website](https://www.python.org/) for details. Validation using `tox` will fail if this is not done correctly.

Also, make sure to install or upgrade the `setuptools` Python package. It contains compatibility improvements and adds automatic use of compilers:

```bash
$ pip install --upgrade setuptools
```
