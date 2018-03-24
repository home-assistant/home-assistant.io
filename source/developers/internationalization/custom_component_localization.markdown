---
layout: page
title: "Custom Component Localization"
description: "Translating custom components in Home Assistant"
date: 2018-03-01 18:00
sidebar: true
comments: false
sharing: true
footer: true
ha_release: 0.64
---

## {% linkable_title Translation Strings %}
Unlike localized strings merged in the home-assistant repository, custom components cannot take advantage of Lokalise for user submitted translations. However, custom component authors can still include translation with their components. These will be read from the `.translations` directory, adjacent to the component source file. They are named `<component/platform name>.<language_code>.json`, unless the custom component exists in its own directory, in which case the file is simply named `<language_code>.json` in the `.translations` directory.

These files follow the same formatting as [backend translation string files](/developers/internationalization/backend_localization/), but a copy will exist for each translated language.

The language codes follow the [BCP47](https://tools.ietf.org/html/bcp47) format. The [frontend translation files](https://github.com/home-assistant/home-assistant-polymer/tree/master/translations) can also be referred to if you are unsure of the correct language code to use.

The frontend will serve these files after Home Assistant is restarted.
