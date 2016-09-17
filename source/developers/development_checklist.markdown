---
layout: page
title: "Checklist"
description: "Overview of the requirements for an improvment for Home Assistant."
date: 2016-07-01 20:00
sidebar: true
comments: false
sharing: true
footer: true
---


After you finish your work:

 - Check that all dependencies are included via the `REQUIREMENTS` variable in your platform/component and only imported inside functions that use them.
 - Add any new dependencies to `requirements_all.txt` if needed. Use `script/gen_requirements_all.py`.
 - Update the `.coveragerc` file to exclude your platform if there are no tests available or your new code uses a 3rd party library for communication with the device/service/sensor.
 - Provide some documentation for [home-assistant.io](https://home-assistant.io/). It's OK to just add a docstring with configuration details (sample entry for `configuration.yaml` file and alike) to the file header as a start. Visit the [website documentation](/developers/website/) for further information on contributing to [home-assistant.io](https://github.com/home-assistant/home-assistant.github.io).

