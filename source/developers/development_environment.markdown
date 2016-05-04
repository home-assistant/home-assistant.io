---
layout: page
title: "Setup Development"
description: "Everything to get you started developing for Home Assistant."
date: 2014-12-21 13:32
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant is built from the ground up to be easily-extensible by other developers using components. It uses [Python 3](https://www.python.org/) for the backend and [Polymer (Web components)](https://www.polymer-project.org/) for the frontend.

Home Assistant is open-source and MIT licensed. The source can be found here:

 - [home-assistant](https://github.com/home-assistant/home-assistant) - Python server backend
 - [home-assistant-js](https://github.com/home-assistant/home-assistant-js) - JavaScript backend powering the client
 - [home-assistant-polymer](https://github.com/home-assistant/home-assistant-polymer) - Polymer UI

### {% linkable_title Starting development %}

You will need to set up a development environment if you want to start developing a new feature or component for Home Assistant. Please follow these steps to get setup.
Visit the [the Home Assistant repository](https://github.com/home-assistant/home-assistant) first and click fork in the top right.

We suggest that you setup a [virtual environment](https://docs.python.org/3.4/library/venv.html) aka `venv` before running the setup script.

```bash
$ git clone https://github.com/YOUR_GIT_USERNAME/home-assistant.git
$ cd home-assistant
$ git remote add upstream https://github.com/home-assistant/home-assistant.git
$ script/setup
```

### {% linkable_title Testing your work %}

Testing your work requires `tox` to be installed:

```bash
$ pip3 install tox
```

After following these steps, running `hass` will invoke your local installation.

### {% linkable_title Prevent Linter Errors %}

Home Assistant enforces strict [PEP8 style](https://www.python.org/dev/peps/pep-0008/) compliance on all code submitted. You can save yourself the hassle of extra commits just to fix style errors by enabling the flake8 git commit hook. It will check your code when you attempt to commit to the repo. It will block the commit if there are any style issues, giving you a chance to fix it.

```bash
$ pip install flake8 flake8-docstrings
$ flake8 --install-hook
```

The flake8-docstrings extension will check docstrings according to [PEP257](https://www.python.org/dev/peps/pep-0257/) when running flake8.

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

### {% linkable_title Catching up with Reality %}

If you're taking a while developing your feature request and would like to catch up with what's in the current Home Assistant dev branch, you can use git rebase to do so. This will pull the latest Home Assistant changes locally, rewind your commits, bring in the latest changes from Home Assistant and then replay all of your commits on top.

```bash
# Run this from your feature branch
$ git fetch upstream dev # to pull the latest changes into a local dev branch
$ git rebase upstream/dev # to put those changes into your feature branch before your changes
```

### {% linkable_title Squashing your commits %}

Your feature is done, it looks great and the tests are all passing. What now? Squash your commits, and create a pull request. Squashing your commits makes for a more readable git commit history. It's an interactive process that is best explained by Matt Stauffer in [this video](https://www.youtube.com/watch?v=7IfkL8swmFw).


### {% linkable_title Further reading %}

- [Home Assistant Architecture](/developers/architecture/)
- [Frontend development](/developers/frontend/)
- [Creating a custom component](/developers/creating_components/)
- [Adding support for a new platform](/developers/add_new_platform/)
- [Rest API](/developers/api/)
- [Server-sent events](/developers/server_sent_events/)
- [Website](/developers/website/)
