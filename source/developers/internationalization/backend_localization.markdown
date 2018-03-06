---
layout: page
title: "Backend Localization"
description: "Translating platforms in Home Assistant"
date: 2018-03-01 18:00
sidebar: true
comments: false
sharing: true
footer: true
ha_release: 0.64
---

## {% linkable_title Translation Strings %}
Platform translation strings are stored as JSON in the [home-assistant](https://github.com/home-assistant/home-assistant) repository. These files must be located adjacent to the component/platform they belong to. They are named `strings.<component/platform name>.json`, unless the component being translated exists in its own directory, in which case the file is simply named `strings.json` in that directory. This file will contain the different strings that will be translatable. Currently only states are supported by the frontend.

After the pull request with the strings file is merged into the `dev` branch, the strings will be automatically uploaded to Lokalise, where contributors can submit translations. The translated strings in Lokalise will be periodically pulled in to the home-assistant repository.

## {% linkable_title States Localization %}
The first step when localizing platform states is to ensure that the states defined in the actual platform code are defined in `snake_case`. The states should not contain capital letters or spaces. Next, the strings file needs to be created. The states should exist under the `state` key, and map the backend state keys to their English translations. [The season sensor localization](https://github.com/home-assistant/home-assistant/pull/12453/commits/bb2f328ce10c3867990e34a88da64e2f8dc7a5c4) is a good example.
