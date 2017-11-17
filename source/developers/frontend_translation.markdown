---
layout: page
title: "Frontend Translation"
description: "How to translate the frontend for Home Assistant."
date: 2017-10-27 13:00
sidebar: true
comments: false
sharing: true
footer: true
ha_release: 0.57
---

## {% linkable_title How to start %}
[Join the translation team](https://lokalise.co/signup/3420425759f6d6d241f598.13594006/all/) and choose your language. Even if your language is completely translated, extra proofreading is a big help! Please feel free to review the existing translations, and vote for alternatives that might be more appropriate.

First time users may find it helpful to switch between multilanguage and single language view using the <img src='/images/frontend/lokalise-multilanguage-view-button.png' alt="Multilanguage view" style="width: 17px; border: none;"/> button. For more information about the translation workflow, please see the [Lokalise translation workflow documents](https://docs.lokalise.co/category/iOzEuQPS53-for-team-leads-and-translators).

<p class='note'>
The translation of the Home Assistant frontend is still a work in progress. More phrases will be available for translation soon.
</p>

## {% linkable_title Rules %}
1. Only native speakers should submit translations.
2. Stick to [Material Design guidelines](https://material.io/guidelines/style/writing.html).
3. Don't translate or change proper nouns like `Home Assistant`, `Hass.io` or `Hue`.
4. For a region specific translation, keys that will be the same as the base translation should be filled with `[VOID]`. These will be replaced during our translation build process.
5. Translations under the `state_badge` keys will be used for the notification badge display. These translations should be short enough to fit in the badge label without overflowing. This can be tested in the Home Assistant UI either by editing the label text with your browsers development tools, or by using the States <img src='/images/screenshots/developer-tool-states-icon.png' alt='' class="no-shadow" height="38" /> developer tool in the Home Assistant UI. In the UI, enter a new entity ID (`device_tracker.test`), and enter the text you want to test in state.
6. If text will be duplicated across different translation keys, make use of the Lokalise key reference feature where possible. The base translation provides examples of this underneath the `states` translations. Please see the [Lokalise key referencing](https://docs.lokalise.co/article/KO5SZWLLsy-key-referencing) documentation for more details.

## {% linkable_title Adding a new language %}
If your language is not listed you can request it at [GitHub](https://github.com/home-assistant/home-assistant-polymer/issues/new). Please provide both the English name and the native name for your language. For example:
```
English Name: German
Native Name: Deutsch
```

<p class='note'>
Region specific translations (`en-US`, `fr-CA`) will only be included if translations for that region need to differ from the base language translation.
</p>

### {% linkable_title Maintainer steps to add a new language %}
1. Language tags  have to follow [BCP 47](https://tools.ietf.org/html/bcp47). A list of most language tags can be found here: [IANA sutbtag registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry). Examples: `fr`, `fr-CA`, `zh-Hans`. Only include the country code if country specific overrides are being included, and the base language is already translated.
2. Add the language tag and native name in `src/translations/translationMetadata.json`.  Examples: "Français", "Français (CA)"
3. Add the new language in Lokalize.
Note: Sometimes you have to change the tag in Lokalise (Language -> Language settings -> custom ISO code).
