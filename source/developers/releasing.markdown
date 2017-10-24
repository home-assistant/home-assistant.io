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

This page describes the steps for publishing a new Home Assistant release. Those steps requires that you don't use forks but work with the repositories themself. The [hass-release](https://github.com/home-assistant/hass-release) script is a helper to do a release. 

### {% linkable_title Release preparation (3 days before release) %}

### {% linkable_title GitHub %}

1. Merge `master` into `dev` to make the PR mergeable.
2. Cut a release branch from `dev`. Example name `release-0-57`.
3. Create a pull request from the release branch to `master` with the upcoming release number as the title.
4. Update `homeassistant/const.py` with the correct version number (remove the `dev` tag) and push that commit to release branch.

### {% linkable_title Website %}

1. Merge `current` into `next`
2. Cut release branch of `next`. For example `release-0-57`.
3. Open a PR from release branch to `current` with the upcoming release number as the title.

## {% linkable_title Release day %}

From creating the release branch till it has been merged, we tag bugfixes with the milestone for the release (create if doesn't exist).

### {% linkable_title GitHub %}

1. Cherry-pick the milestoned PRs that need to get into the release `python3 -m hassrelease milestone_cherry_pick 0.57`
2. Run `python3 -m hassrelease release_notes 0.56` for the release notes.
3. Once the release notes has been generated, issue `python3 -m hassrelease milestone_close 0.56`
4. Merge pull request (DO NOT SQUASH!). Use `Merge pull request`.
5. Go to [releases](https://github.com/home-assistant/home-assistant/releases), click `Draft a new release` and tag a new release on the `master` branch. "Tag version" and "Release title" are the version number (`O.x` for major version, `0.x.y` for minor and bug fix releases). Release description is the text from PR. Press "Publish release" to finish the process.
6. Merge `master` into `dev`.
7. Update `homeassistant/const.py` with the upcoming version number (including the `dev` tag) and push that commit to the `dev` branch.

### {% linkable_title Website %}

1. Create a blog post in the release branch and base it on the text of the PR in the main repository. Add images, additional text, links, etc. if it adds value. Tag each platform/component in a message to documentation.
2. Create missing documentation as stubs.
3. Run `credits_generator`.
4. Update `_config.yml` with a link to the new release blog post and version number (at the bottom of the file).
5. Merge `current` into release branch (`$ git checkout release-0-40 && git merge current`) to make the PR mergeable.
6. Merge pull request (blog post, updated frontpage, and all new documentation) to `current`. DO NOT SQUASH!
7. Merge `current` into `next`.

### {% linkable_title Docker Hub %}

Tags on Docker hub are automatically created when a release has been created on GitHub.

### {% linkable_title Python Package Index %}

Checkout the `master` branch and run `script/release` to publish the new release on [Python Package Index](https://pypi.python.org).

### {% linkable_title Social media %}

1. Use [hootsuite](https://hootsuite.com/dashboard) to publish a link to the release post on social media.

## {% linkable_title Bugfix Release %}

1. Checkout `master` and update it. `git checkout master && git pull --rebase`
2. Create a new release branch from `master`. `git checkout -b release-0-56-2`
3. Cherry-pick the PRs which were milestoned.
4. Update `homeassistant/const.py` with the correct version number (increment `PATCH_VERSION`) and push that commit to release branch.
5. Create a pull request from the release branch to `master` with the upcoming release number as the title.
6. Merge pull request (DO NOT SQUASH!). Use `Merge pull request`.
7. Go to [releases](https://github.com/home-assistant/home-assistant/releases), click `Draft a new release` and tag a new release on the `master` branch. "Tag version" and "Release title" are the version number (`O.x` for major version, `0.x.y` for minor and bug fix releases). Release description is the text from PR. Press "Publish release" to finish the process.
8. [Publish](/developers/releasing/#python-package-index) the new release on PyPI.
