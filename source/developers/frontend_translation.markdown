---
layout: page
title: "Translate Home Assistant frontend"
description: "How to translate the frontend for Home Assistant."
date: 2017-10-27 13:00
sidebar: true
comments: false
sharing: true
footer: true
ha_release: 0.57
---

We don't accept translations via GitHub anymore so please use our [project site at lokalise.co](https://lokalise.co/project/XXX/).

The translation of the Home Assistant frontend is still WIP. More phrases will be available soon.

#### {% linkable_title How to start %}
[Join the translation team](https://lokalise.co/project/XXX/) and choose your language. If your language is not listed you can request it at [GitHub](https://github.com/home-assistant/home-assistant-polymer/issues/new) or [Discord](https://discord.gg/FGpNm2K).
Note: Languages that differ from the language of the country of origin need a translation for the latter first.  Example: `French as used in Canada` requires a generic `French` translation.

#### {% linkable_title Rules %}
1. Only native speakers should submit translations.
2. English is reference language.
3. Don't translate or change personal names like `Home Assistant` or `Hass.io`.
4. Don't submit the same translation multiple times. Use the voting system and chat (keep it English) for differences of opinion.
5. For translations in languages with country code: Only add translations that differ from the language of the country of origin.

Tip: Use `Multilanguage view` (eye-symbol) and hide those languages you don't need.

#### {% linkable_title For maintainers %}
1. Language tags  have to follow [BCP 47](https://tools.ietf.org/html/bcp47). In most cases that's the [ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and eventually also the [country code](https://en.wikipedia.org/wiki/ISO_3166-1#Officially_assigned_code_elements). Examples: `fr`, `fr-CA`, `zh-Hans`
2. Add native name (capitalize) and country code (if used) in `language::tag`.  Examples: `Français`, `Français (CA)`
