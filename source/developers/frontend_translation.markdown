---
layout: page
title: "Translate Home Assistant frontend"
description: "How to translate the frontend for Home Assistant."
date: 2017-10-27 01:00
sidebar: true
comments: false
sharing: true
footer: true
ha_release: 0.57
---

This will guide you to translate the Home Assistant frontend to your language. Currently there are only a few translatable phrases - more will be added soon.
Translations are defined in the [translations](https://github.com/home-assistant/home-assistant-polymer/tree/master/translations) folder of [home-assistant-polymer repository](https://github.com/home-assistant/home-assistant-polymer) at GitHub. The files are JSON formatted and named after their language tags.

Example:
```
translations/en.json
translations/en-US.json
translations/de.json
```

Language subtags will inherit from their parent, so `en-US.json` should only contain the entries that will be different from `en.json`. All language tags inherit from `en.json` as the master translation and fallback for incomplete translations.
You can get the correct tag and native name from the [list of ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes). If necessary also add the corresponding [country code](https://en.wikipedia.org/wiki/ISO_3166-1#Officially_assigned_code_elements).

Example for French (`fr.json`):
```
{
  "language": {
    "fr": "français"
  },
  ...
}
```
Example for French as used in Canada (`fr-CA.json`):
```
{
  "language": {
    "fr-CA": "français (CA)"
  },
  ...
}
```

### {% linkable_title Special characters %}
The most common ones you may need are `\'` for `'` and `\n` for `new line`. Check this [table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Using_special_characters_in_strings) for more special characters. PS: You don't have to HTML escape your characters.

### {% linkable_title Submit a Translation %}
In the following PR is used for pull request at GitHub

#### {% linkable_title Before you submit %}
1. Check if your language already exists in translations(https://github.com/home-assistant/home-assistant-polymer/tree/master/translations).
2. Check if there is already an open PR for your language which you can review.

#### {% linkable_title Rules for translating %}
1. Don't discuss in already merged PRs if a translation is good or bad. Instead open an [issue](https://github.com/home-assistant/home-assistant-polymer/issues) or new PR for discussion or improvements.
2. Don't add phrases that don't exist in `en.json`.
3. Translated phrases have to start with capital letter.
4. Make a note in your PR's description if you translated a phrase with an other word that fits (in your opinion) better. For example instead of translating `States` you have chosen the word for `Overview`
