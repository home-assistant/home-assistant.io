---
layout: page
title: "YAML"
description: "Details about YAML to configure Home Assistant."
date: 2015-03-23 12:50
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant uses the [YAML](http://yaml.org/) syntax for configuration. YAML might take a while to get used to but is really powerful in allowing you to express complex configurations.

For each component that you want to use in Home Assistant, you add code in your `configuration.yaml` file to specify its settings.
The following example entry specifies that you want to use the [notify component](/components/notify) with the [pushbullet platform](/components/notify.pushbullet).


```yaml
notify:
  platform: pushbullet
  api_key: "o.1234abcd"
  name: pushbullet
```

- A **component** provides the core logic for some functionality (like `notify` provides sending notifications). 
- A **platform** makes the connection to a specific software or hardware platform (like `pushbullet` works with the service from pushbullet.com).

The basics of YAML syntax are block collections and mappings containing key-value pairs. Each item in a collection starts with a `-` while mappings have the format `key: value`. If you specify duplicate keys, the last value for a key is used.

Note that indentation is an important part of specifying relationships using YAML. Things that are indented are nested "inside" things that are one level higher. So in the above example, `platform: pushbullet` is a property of (nested inside) the `notify` component.
Getting the right indentation can be tricky if you're not using an editor with a fixed width font. Tabs are not allowed to be used for indentation. Convention is to use 2 spaces for each level of indentation.
You can use [YAMLLint](http://www.yamllint.com/) to check if your YAML-syntax is correct before loading it into Home Assistant which will save you some time. 
*Please pay attention on not putting in private data, as it is a 3rd-party website not maintained by Home Assistant.*

Lines that start with **#** are comments and are ignored by the system.

The next example shows an [input_select](/components/input_select) component that uses a block collection for the options values.
The other properties (like name) are specified using mappings. Note that the second line just has `threat:` with no value on the same line. Here threat is the name of the input_select and the values for it are everything nested below it.

```yaml
input_select:
  threat:
    name: Threat level
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
    state_topic: sensor/topic
  - platform: mqtt
    state_topic: sensor2/topic
```

### [Next step: Setting up the basics &raquo;](/getting-started/basic/)
