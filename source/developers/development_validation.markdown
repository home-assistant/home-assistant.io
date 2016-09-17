---
layout: page
title: "Validate the input"
description: "Validation of entries in configuration.yaml"
date: 2016-08-11 20:00
sidebar: true
comments: false
sharing: true
footer: true
---

The `configuration.yaml` file contains the configuration options for components and platforms. To ensure that the given configuration provided by the user is valid we use [voluptuous](https://pypi.python.org/pypi/voluptuous) to check it. Certain entries are optional or could be required for the setup of a platform or a component. Others must be of a definied type or out of an already defined list.

The goal of testing the configuration is to assure that users have a great experience due to notifications if something is wrong with a platform or component setup before Home Assistant is running.

Beside the [voluptuous](https://pypi.python.org/pypi/voluptuous) default types are a bunch of custom types available. To get a full overview take a look at the [config_validation.py](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/helpers/config_validation.py) helper.

- Types: `string`, `byte`, and `boolean`
- Entity ID: `entity_id` and `entity_ids`
- Numbers: `small_float` and `positive_int`
- Time: `time`, `time_zone`
- Misc: `template`, `slug`, `temperature_unit`, `latitude`, `longitude`, `isfile`, `sun_event`, `ensure_list`, `port`, `url`,  and `icon`
 
To validate plaforms using [MQTT](/components/mqtt/) there are `valid_subscribe_topic` and `valid_publish_topic` present.

Some things to keep in mind:

- Use the constants which are definded in `const.py`.
- Import `PLATFORM_SCHEMA` from parent component and extend it.
- Preferred order is `required` first, then `optional`.

### {% linkable_title Snippets %} 

This section contains a couple of snippets for the validation we use.

### {% linkable_title Default name %} 

It's common to set a default for a sensor if the user is not providing a name to use.

```python
DEFAULT_NAME = 'Sensor name'

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    ...
    vol.Optional(CONF_NAME, default=DEFAULT_NAME): cv.string,
```

### {% linkable_title Limit the values %} 

In certain cases you want to limit the user's input to a couple of options.

```python
DEFAULT_METHOD = 'GET'

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    ...
    vol.Optional(CONF_METHOD, default=DEFAULT_METHOD): vol.In(['POST', 'GET']),
```

### {% linkable_title Port %} 

As all port numbers are coming out of the range 1 till 65535. 

```python
DEFAULT_PORT = 993

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    ...
    vol.Optional(CONF_PORT, default=DEFAULT_PORT): cv.port,
```

### {% linkable_title Lists %} 

If a sensor has a pre-defined list of available options it should be tested if the configuration entry matches it.

```python
SENSOR_TYPES = {
    'article_cache': ('Article Cache', 'MB'),
    'average_download_rate': ('Average Speed', 'MB/s'),
}

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    ...
    vol.Optional(CONF_MONITORED_VARIABLES, default=[]):
        vol.All(ensure_list, [vol.In(SENSOR_TYPES)]),
```


