---
title: "YAML syntax"
description: "Details about the YAML syntax used to configure Home Assistant."
related:
  - docs: /docs/configuration/
    title: configuration.yaml file
  - docs: /docs/configuration/secrets/
    title: Storing private data in separate file
  - docs: /docs/automation/yaml/
    title: Automation.yaml
  - docs: /docs/configuration/troubleshooting/
    title: Troubleshooting the configuration files
  - docs: /docs/configuration/#validating-the-configuration
    title: Validating the configuration
  - url: https://developers.home-assistant.io/docs/documenting/yaml-style-guide/
    title: YAML Style Guide for Home Assistant developers
---

Home Assistant uses the [YAML](https://yaml.org/) syntax for configuration. While most integrations can be configured through the UI, some integrations require you to edit your [`configuration.yaml`](/docs/configuration/) file to specify its settings.

## YAML Style Guide

This page gives a high-level introduction to the YAML syntax used in Home Assistant. For a more detailed description and more examples, refer to the [YAML Style Guide for Home Assistant developers](https://developers.home-assistant.io/docs/documenting/yaml-style-guide/).

## A first example

The following YAML example entry assumes that you would like to set up the [notify integration](/integrations/notify) with the [pushbullet platform](/integrations/pushbullet).

```yaml
notify:
  platform: pushbullet
  api_key: "o.1234abcd"
  name: pushbullet
```

- An **integration** provides the core logic for some functionality (like `notify` provides sending notifications).
- A **platform** makes the connection to a specific software or hardware platform (like `pushbullet` works with the service from pushbullet.com).

The basics of YAML syntax are block collections and mappings containing key-value pairs. Each item in a collection starts with a `-` while mappings have the format `key: value`. This is somewhat similar to a Hash table or more specifically a dictionary in Python. These can be nested as well. **Beware that if you specify duplicate keys, the last value for a key is used**.

## Indentation in YAML

In YAML, indentation is important for specifying relationships. Indented lines are nested inside lines that are one level higher. In the above example, `platform: pushbullet` is a property of (nested inside) the `notify` integration.

Getting the right indentation can be tricky if you're not using an editor with a fixed-width font. Tabs are not allowed to be used for indentation. The convention is to use 2 spaces for each level of indentation.

## Comments

Strings of text following a `#` are comments. They are ignored by the system. Comments explain in plain language what a particular code block is supposed to do. For future-you or someone else looking at the file.

### Example with comment and nesting

The next example shows an [input_select](/integrations/input_select) integration that uses a block collection for the values of options.
The other properties (like `name:`) are specified using mappings. Note that the second line just has `threat:` with no value on the same line. Here, `threat` is the name of the input_select. The values for it are everything nested below it.

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

### Example of nested mapping

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

On {% term "Home Assistant Core" %}  installations, you can include values from your system's environment variables with `!env_var`.
Note that this will only work for {% term "Home Assistant Core" %}  installations, in a scenario where it is possible to specify these.
Regular Home Assistant users are recommended to use `!include` statements instead.

```yaml
example:
  password: !env_var PASSWORD
```

#### Default value

If an environment variable is not set, you can fall back to a default value.

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

## Common issues

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

## Validating YAML syntax

With all these indents and rules, it is easy to make a mistake. The best way to check if your YAML syntax is correct (validate) depends on the editor you use. We can't list them all here.

- If you edit the files directly in Home Assistant, refer to the section: [Validating the configuration](/docs/configuration/#validating-the-configuration)
