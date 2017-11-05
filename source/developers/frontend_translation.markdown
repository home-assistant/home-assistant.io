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

The translation of the Home Assistant frontend is still a work in progress. More phrases will be available soon.

#### {% linkable_title How to start %}
[Join the translation team](https://lokalise.co/signup/3420425759f6d6d241f598.13594006/all/) and choose your language. If your language is not listed you can request it at [GitHub](https://github.com/home-assistant/home-assistant-polymer/issues/new). Please provide both the English name and the native name for your language. Example: German / Deutsch.
Note: Languages that differ from the language of the country of origin need a translation for the latter first.  Example: `French as used in Canada` requires a generic `French` translation.

Even if your language is completely translated, extra proofreading is a big help! Please feel free to review the existing translations, and vote for alternatives that might be more appropriate.

For more information about the translation workflow, please see the [Lokalise translation workflow documents](https://docs.lokalise.co/category/iOzEuQPS53-for-team-leads-and-translators).

#### {% linkable_title Rules %}
1. Only native speakers should submit translations.
2. English is reference language.
3. Stick to [Material Desing guidelines](https://material.io/guidelines/style/writing.html).
4. Don't translate or change proper nouns like `Home Assistant`, `Hass.io` or `Hue`.

Tip: Use `Multilanguage view` (eye-symbol) and hide those languages you don't need.

#### {% linkable_title For maintainers %}
1. Language tags  have to follow [BCP 47](https://tools.ietf.org/html/bcp47). A list of most language tags can be found here: [IANA sutbtag registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry). Examples: `fr`, `fr-CA`, `zh-Hans`. Only include the country code if country specific overrides are being included, and the base language is already translated.
2. Add the language tag and native name in `src/translations/translationMetadata.json`.  Examples: "Français", "Français (CA)"
3. Add the new language in Lokalize.
Note: Sometimes you have to change the tag in Lokalise (Language -> Language settings -> custom ISO code).
