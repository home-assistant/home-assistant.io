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

This page describes the steps for publishing a new Home Assistant release.

### {% linkable_title GitHub %}

1. Create a pull request from `dev` to `master` with the upcoming release number as the title.
2. Merge `master` into `dev` to make the PR mergeable. PR message contains intro, highlighting major changes, and an overview of all changes tagging each author.
3. Update `homeassistant/const.py` with the correct version number (remove the `dev` tag) and push that commit.
4. Merge pull request (DO NOT SQUASH!).
5. Then, after merged, push another update to `dev` of `homeassistant/const.py` that includes the next version with the `dev` tag. Add a meaningful commit message like "Version bump to X". This commit acts as a marker for the next release.
6. Go to [releases](https://github.com/home-assistant/home-assistant/releases) and tag a new release on the `master` branch. "Tag version" and "Release title" are the version number (`O.x` for major version, `0.x.y` for minor and bug fix releases). Release description is the text from PR. Press "Publish release" to finish the process.

### {% linkable_title Website %}

1. Create a blog post in `next` and base it on the text of the PR in the main repository. Add images, additional text, links, etc. if it adds value. Tag each platform/component in a message to documentation.
2. Create missing documentation as stumbs in `next`.
3. Update `config.yml` with link to the new release blog post and version number (at the bottom of the file).
4. Create a pull request from `next` to `current` with the upcoming release number as the title.
5. Merge `current` into `next` (`$ git checkout next && git merge current`) to make the PR mergeable.
6. Merge pull request (blog post, updated frontpage, and all new documentation) to `current`.

### {% linkable_title Docker Hub %}

Create a new [tag](https://hub.docker.com/r/homeassistant/home-assistant/tags/) at https://hub.docker.com for the release.

### {% linkable_title Python Package Index %}

Checkout the `master` branch and run `script/release` to publish the new release on [Python Package Index](https://pypi.python.org).

### {% linkable_title Social media %}

1. Create a [tweet](https://twitter.com/home_assistant) announcing blog post linking to release notes.
2. Publish a link to the tweet/release blog post for the [Google+ Community](https://plus.google.com/b/110560654828510104551/communities/106562234893511202708).

