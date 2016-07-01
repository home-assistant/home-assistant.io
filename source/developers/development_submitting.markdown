---
layout: page
title: "Submit your work"
description: "Submit your work as Pull Request for Home Assistant."
date: 2016-07-01 20:00
sidebar: true
comments: false
sharing: true
footer: true
---

Improvements, fixes, and new features to Home Assistant should be submitted one feature at a time using GitHub [Pull Requests](https://help.github.com/articles/using-pull-requests).

 1. From your fork, create a new branch to hold your changes
    `git checkout -b some-feature`
 2. Make the changes you want, create a [new platform](/developers/add_new_platform/), develop a [new component](/developers/creating_components/), or fix [issues](https://github.com/home-assistant/home-assistant/issues).
 3. [Test your changes](/developers/development_testing/) and check for style violations
 4. Commit the changes if all [musts](/developers/development_checklist/) are covered.
    `git add .`
    `git commit -m "Added some-feature"`
 5. Consider to add tests to ensure that the code works.
 6. Push your committed changes back to your fork on GitHub
    `git push origin HEAD`
 7. Follow [these steps](https://help.github.com/articles/creating-a-pull-request/) to create your pull request.
 8. Check for comments and suggestions on your Pull Request and keep an eye on the [CI output](https://travis-ci.org/home-assistant/home-assistant/).

