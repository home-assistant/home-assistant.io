---
layout: page
title: "Releasing"
description: "Steps involved publishing a new Home Assistant release."
date: 2016-07-13 17:00
sidebar: true
comments: false
sharing: true
footer: true
---

This page describes the steps for publishing a new Home Assistant release. Those steps requires that you don't use forks but work with the repositories themself. 

### {% linkable_title GitHub (3 days before release) %}

1. Merge `master` into `dev` to make the PR mergeable.
2. Cut a release branch from `dev`. Example name `release-0-49`.
3. Create a pull request from the release branch to `master` with the upcoming release number as the title. PR message contains intro, highlighting major changes, and an overview of all changes tagging each author. Use [hass-release](https://github.com/home-assistant/hass-release) to collect the details.
4. Update `homeassistant/const.py` with the correct version number (remove the `dev` tag) and push that commit to release branch.
5. From now until the release branch has been merged, we tag bugfixes with the milestone for the release (create if doesn't exist).
4. Update `homeassistant/const.py` with the upcoming version number (including the `dev` tag) and push that commit to the `dev` branch.

### {% linkable_title Website (3 days before release) %}

1. Merge `current` into `next`
2. Cut release branch of `next`. For example `release-0-49`.
3. Open a PR from release branch to `current` with the upcoming release number as the title.

### {% linkable_title GitHub %}

1. Merge pull request (DO NOT SQUASH!).
2. Go to [releases](https://github.com/home-assistant/home-assistant/releases) and tag a new release on the `master` branch. "Tag version" and "Release title" are the version number (`O.x` for major version, `0.x.y` for minor and bug fix releases). Release description is the text from PR. Press "Publish release" to finish the process.
3. Merge `master` into `dev`.

### {% linkable_title Website %}

1. Create a blog post in the release branch and base it on the text of the PR in the main repository. Add images, additional text, links, etc. if it adds value. Tag each platform/component in a message to documentation.
2. Create missing documentation as stubs.
3. Update `config.yml` with link to the new release blog post and version number (at the bottom of the file).
4. Merge `current` into release branch (`$ git checkout release-0-40 && git merge current`) to make the PR mergeable.
5. Merge pull request (blog post, updated frontpage, and all new documentation) to `current`. DO NOT SQUASH!
6. Run `credits_generator`.
7. Merge `current` into `next`.

### {% linkable_title Docker Hub %}

Tags on Docker hub are automatically created when a release has been created on GitHub.

### {% linkable_title Python Package Index %}

Checkout the `master` branch and run `script/release` to publish the new release on [Python Package Index](https://pypi.python.org).

### {% linkable_title Social media %}

1. Use [hootsuite] to publish a link to the release post on social media.

[hootsuite]: https://hootsuite.com/dashboard
