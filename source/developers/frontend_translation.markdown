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

This will guide you how to translate the Home Assistant frontend to another language. Currently there are only a few translatable phrases - more will be added soon.

Translations are defined in the [translations](https://github.com/home-assistant/home-assistant-polymer/tree/master/translations) folder of [home-assistant-polymer repository](https://github.com/home-assistant/home-assistant-polymer) at GitHub. The files are JSON formatted and named after their language tags.

Examples:
```
translations/de.json
translations/en.json
translations/en-US.json
translations/zh-Hans.json
translations/zh-Hans-SG.json
```

Language subtags will inherit from their parent, so `en-US.json` should only contain the entries that will be different from `en.json`. All language tags inherit from `en.json` as master translation and fallback for incomplete translations.

Language tags follow [BCP47](https://tools.ietf.org/html/bcp47). In most cases you only need the [ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and eventually also the [country code](https://en.wikipedia.org/wiki/ISO_3166-1#Officially_assigned_code_elements). Also add language tag, native language name (has to start with capital letter) and country code (if used) inside the file.

Example for French (`fr.json`):
```
{
  "language": {
    "fr": "Français"
  },
  ...
}
```
Example for French as used in Canada (`fr-CA.json`):
```
{
  "language": {
    "fr-CA": "Français (CA)"
  },
  ...
}
```

### {% linkable_title Special characters %}
Use `\\` for backslash (`\`) and `\"` for double quotes (`"`). Don't escape forward slashes (`/`) or HTML encode characters.

### {% linkable_title Submit a translation %}
In the following PR is used for pull request at GitHub.

#### {% linkable_title Before you submit a translation %}
1. Check if your language tag already exists in translations(https://github.com/home-assistant/home-assistant-polymer/tree/master/translations).
2. Check if there is already an [open PR](https://github.com/home-assistant/home-assistant-polymer/pulls) for your language tag which you can review or discuss.
3. Only submit translations with language and country code (`fr-CA.json`) if there there is already an corresponding translation with language code only (`fr.json`)

#### {% linkable_title Rules for translating %}
1. Don't discuss in already merged PRs if a translated phrase is appropriate or not. Instead open an [issue](https://github.com/home-assistant/home-assistant-polymer/issues) or new PR for discussion or improvements.
2. Don't submit incomplete translations (also don't include untranslated or unchanged phrases) or add phrases that don't exist in `en.json`.
3. Use the text in value for your translation - not the key. Example: For `"states": "Overview"` translate `Overview`.
4. Translated phrases have to start with capital letter. (Currently there is no conclusion if every word in a non-sentence has to start with capital letter)
