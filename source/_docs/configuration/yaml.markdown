---
title: "YAML"
description: "Details about YAML to configure Home Assistant."
---

Home Assistant can be configured in two ways:

1. Through `configuration.yaml` and other [YAML](https://yaml.org/) files.
2. Through the web user interface (UI), which stores the configuration in JSON files in the `.storage` folder.

Traditionally, all configuration was managed in YAML files, but as explained in the 2020 blog post ["The future of YAML"](https://www.home-assistant.io/blog/2020/04/14/the-future-of-yaml/), there's been a shift towards allowing more and more configuration to be done in the UI. For many integrations, you can still choose to use YAML if you like, but some things can only be configured in the web UI and some things only in YAML. Refer to the documentation for the specific integration for details.

Here's a quick example showing how you could use YAML to set up the [Notify integration](/integrations/notify) to use the [Text-to-Speech (TTS) platform](/integrations/tts), and also configure the TTS platform to use the [Google Translate platform](https://www.home-assistant.io/integrations/google_translate/):

```yaml
tts:
  - platform: google_translate
    service_name: google_say

notify:
  - platform: tts
    name: in_the_living_room
    tts_service: tts.google_say
    media_player: media_player.living_room
```

- An **integration** provides the core logic for some functionality (like `notify` provides the logic for sending notifications, and `tts` provides the core logic for text-to-speech).
- A **platform** is a specific form of integration which connects to a software or hardware platform. A platform can be abstract, like the `tts` platform which connects to *some* text-to-speech service, or specific, like the `google_translate` platform which connects to the Google Translate web service.

The basics of YAML syntax are block collections and mappings containing key-value pairs. Each item in a collection starts with a `-` while mappings have the format `key: value`.  This is somewhat similar to a Hash table or more specifically a dictionary in Python. These can be nested as well.  **Beware that if you specify duplicate keys, the last value for a key is used**.

Note that indentation is an important part of specifying relationships using YAML. Things that are indented are nested "inside" things that are one level higher. So in the above example, `platform: pushbullet` is a property of (nested inside) the `notify` integration.

Getting the right indentation can be tricky if you're not using an editor with a fixed width font. Tabs are not allowed to be used for indentation. Convention is to use 2 spaces for each level of indentation.

You can use the online service [YAMLLint](http://www.yamllint.com/) to check if your YAML syntax is correct before loading it into Home Assistant which will save you some time. If you do so, be aware that this is a third-party service and is not maintained by the Home Assistant community.

<div class='note'>

Please pay attention to not storing private data (passwords, API keys, etc.) directly in your `configuration.yaml` file. Private data can be stored in either a [separate file](/docs/configuration/secrets/) or in [environmental variables](/docs/configuration/yaml/#using-environment-variables), which circumvents this security problem.

</div>

Strings of text following a `#` are comments and are ignored by the system.

The next example shows an [input_select](/integrations/input_select) integration that uses a block collection for the values of options.
The other properties (like `name:`) are specified using mappings. Note that the second line just has `threat:` with no value on the same line. Here threat is the name of the input_select and the values for it are everything nested below it.

```yaml
input_select:
  threat:
    name: "Threat level"
    # A collection is used for options
    options:
      - 0
      - 1
      - 2
      - 3
    initial: 0
```

The following example shows nesting a collection of mappings in a mapping. In Home Assistant, this would create two sensors that each use the MQTT platform but have different values for their `state_topic` (one of the properties used for MQTT sensors).

```yaml
sensor:
  - platform: mqtt
    state_topic: "sensor/topic"
  - platform: mqtt
    state_topic: "sensor2/topic"
```

## Including values

### Environment variables

On Home Assistant Core installations, you can include values from your system's environment variables with `!env_var`.
Note that this will only work for Home Assistant Core installations, in a scenario where it is possible to specify these.
Regular Home Assistant users are recommended to use `!include` statements instead.

```yaml
example:
  password: !env_var PASSWORD
```

#### Default value

If an environment variable is not set, you can fallback to a default value.

```yaml
example:
  password: !env_var PASSWORD default_password
```

### Including entire files

To improve readability, you can source out certain domains from your main configuration file with the `!include`-syntax.

```yaml
light: !include lights.yaml
```

More information about this feature can also be found at [splitting configuration](/docs/configuration/splitting_configuration/).

## Common Issues

### found character '\t'

If you see the following message:

```txt
found character '\t' that cannot start any token
```

This means that you've mistakenly entered a tab character, instead of spaces.

### Upper and lower case

Home Assistant is case sensitive, a state of `'on'` is not the same as `'On'` or `'ON'`. Similarly an entity of `group.Doors` is not the same as `group.doors`.

If you're having trouble, check the case that Home Assistant is reporting in the dev-state menu, under *Developer tools*.

### Booleans

YAML treats `Y`, `true`, `Yes`, `ON` all as `true` and `n`, `FALSE`, `No`, `off` as `false`. This means that if you want to set the state of an entity to `on` you *must* quote it as `'on'` otherwise it will be translated as setting the state to true. The same applies to `off`.

Not quoting the value may generate an error such as:

```txt
not a valid value for dictionary value @ data
```
