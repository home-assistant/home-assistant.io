---
title: "YAML"
description: "Details about YAML to configure Home Assistant."
---

Home Assistant uses the [YAML](https://yaml.org/) syntax for configuration. YAML might take a while to get used to but is really powerful in allowing you to express complex configurations.

While more and more integrations are configured through the UI, for some, you will add code in your `configuration.yaml` file to specify its settings.

The following example entry assumes that you would like to set up the [notify integration](/integrations/notify) with the [pushbullet platform](/integrations/pushbullet).

```yaml
notify:
  platform: pushbullet
  api_key: "o.1234abcd"
  name: pushbullet
```

- An **integration** provides the core logic for some functionality (like `notify` provides sending notifications).
- A **platform** makes the connection to a specific software or hardware platform (like `pushbullet` works with the service from pushbullet.com).

The basics of YAML syntax are block collections and mappings containing key-value pairs. Each item in a collection starts with a `-` while mappings have the format `key: value`.  This is somewhat similar to a Hash table or more specifically a dictionary in Python. These can be nested as well.  **Beware that if you specify duplicate keys, the last value for a key is used**.

Note that indentation is an important part of specifying relationships using YAML. Things that are indented are nested "inside" things that are one level higher. So in the above example, `platform: pushbullet` is a property of (nested inside) the `notify` integration.

Getting the right indentation can be tricky if you're not using an editor with a fixed width font. Tabs are not allowed to be used for indentation. Convention is to use 2 spaces for each level of indentation.

You can use the online service [YAML Validator](https://codebeautify.org/yaml-validator/) to check if your YAML syntax is correct before loading it into Home Assistant which will save you some time. If you do so, be aware that this is a third-party service and is not maintained by the Home Assistant community.

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
