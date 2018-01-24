---
layout: page
title: "Style guidelines"
description: "Details about styling your code."
date: 2017-04-28 20:00
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant enforces strict [PEP8 style](https://www.python.org/dev/peps/pep-0008/) and [PEP 257 (Docstring Conventions)](https://www.python.org/dev/peps/pep-0257/) compliance on all code submitted. We automatically test every pull request as part of the linting process with [Coveralls](https://coveralls.io/github/home-assistant/home-assistant) and [Travis CI](https://travis-ci.org/home-assistant/home-assistant).

Summary of the most relevant points:

- Line length is limited to 79 characters (see below).
- Use 4 spaces per indentation level. We don't use tabs.
- Comments should be full sentences and end with a period.
- [Imports](https://www.python.org/dev/peps/pep-0008/#imports) should be ordered.
- Constants and the content of lists and dictionaries should be in alphabetical order.
- Avoid trailing whitespace but surround binary operators with a single space.
- Line separator should be set to `LF`.

The maximum line length comes directly from the [PEP8 style guide](https://www.python.org/dev/peps/pep-0008/#maximum-line-length), and is also used by the Python standard library. All code must pass these linting checks, and no exceptions will be made. There have already been numerous requests to increase the maximum line length, but after evaluating the options, the Home Assistant maintainers have decided to stay at 79 characters. This decision is final.

Those points may require that you adjust your IDE or editor settings.

## {% linkable_title Our recommendations %}

For some cases [PEPs](https://www.python.org/dev/peps/) don't make a statement. This section covers our recommendations about the code style. Those points were collected from the exisiting code and based on what contributors and developers were using the most. This is basically a majority decision, thus you may not agree with it. But we would like to encourage you follow those recommendations to keep the code unified. 

### {% linkable_title Quotes %}

Use single quotes `'` for single word and `"` for multiple words or sentences.

```python
ATTR_WATERLEVEL = 'level'
CONF_ATTRIBUTION = "Data provided by the WUnderground weather service"
SENSOR_TYPES = {
    'alerts': ['Alerts', None],
}
```

### {% linkable_title File headers %}

The docstring in the file header should contain a link to the documentation to make it easy to find further information, especially about the configuration or details which are not mentioned in the code. 

```python
"""
Support for MQTT lights.

For more details about this platform, please refer to the documentation at
https://home-assistant.io/components/light.mqtt/
"""
```

### {% linkable_title Requirements %}

Please place [Platform requirements](/developers/code_review_platform/#1-requirements) right after the imports. 

```python
[...]
from homeassistant.helpers.entity import Entity

REQUIREMENTS = ['xmltodict==0.11.0']
```

### {% linkable_title Log messages %}

There is no need to add the platform or component name to the log messages. This will be added automatically. Like `syslog` messages there shouldn't be any period at the end. Try to avoid brackets and additional quotes around the output to make it easier for users to parse the log. A widely style is shown below but you are free to compose the messages as you like.

```python
_LOGGER.error("No route to device: %s", self._resource)
```

```bash
2017-05-01 14:28:07 ERROR [homeassistant.components.sensor.arest] No route to device: 192.168.0.18
```

Don't print out wrong API keys, tokens, usernames, or passwords.

