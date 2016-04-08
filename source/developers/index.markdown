---
layout: page
title: "Setup Development"
description: "Everything to get you started developing for Home Assistant."
date: 2014-12-21 13:32
sidebar: false
comments: false
sharing: true
footer: true
---

Home Assistant is built from the ground up to be easily-extensible by other developers using components. It uses [Python 3](https://www.python.org/) for the backend and [Polymer (Web components)](https://www.polymer-project.org/) for the frontend.

Home Assistant is open-source and MIT licensed. The source can be found here:

 - [home-assistant](https://github.com/balloob/home-assistant) - Python server backend
 - [home-assistant-js](https://github.com/balloob/home-assistant-js) - JavaScript backend powering the client
 - [home-assistant-polymer](https://github.com/balloob/home-assistant-polymer) - Polymer UI

### {% linkable_title Starting development %}

You will need to set up a development environment if you want to start developing a new feature or component for Home Assistant. Please follow these steps to get setup.  
Visit the [the Home Assistant repository](https://github.com/balloob/home-assistant) first and click fork in the top right.

We suggest that you setup a [virtual environment](https://docs.python.org/3.4/library/venv.html) aka `venv` before running the setup script.

```bash
$ git clone https://github.com/YOUR_GIT_USERNAME/home-assistant.git
$ cd home-assistant
$ git remote add upstream https://github.com/balloob/home-assistant.git
$ script/setup
```

Testing your work requires `tox` to be installed:

```bash
$ pip3 install tox
```

After following these steps, running `hass` will invoke your local installation.

### {% linkable_title Submitting improvements %}

Improvements to Home Assistant should be submitted one feature at a time using GitHub [pull requests](https://help.github.com/articles/using-pull-requests).

 1. From your fork, create a new branch to hold your changes
    `git checkout -b some-feature`
 2. Make the changes you want
 3. Test your changes and check for style violations
    `tox`
 4. Commit the changes
    `git add .`
    `git commit -m "Added some-feature"`
 5. Push your committed changes back to your fork on GitHub
    `git push origin HEAD`
 6. Follow [these steps](https://help.github.com/articles/creating-a-pull-request/) to create your pull request.


### {% linkable_title Further reading %}

- [Home Assistant Architecture](/developers/architecture/)
- [Frontend development](/developers/frontend/)
- [Creating a custom component](/developers/creating_components/)
- [Adding support for a new platform](/developers/add_new_platform/)
- [Rest API](/developers/api/)
- [Server-sent events](/developers/server_sent_events/)
- [Website](/developers/website/)

