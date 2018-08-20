---
layout: page
title: "Ecovacs Deebot Vacuum"
description: "Instructions on how to setup Ecovacs Deebot vacuums within Home Assistant."
date: 2018-07-27 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ecovacs.png
ha_category: Vacuum
ha_iot_class: "Cloud Push"
ha_release: 0.77
---

The `ecovacs` vacuum platform allows you to monitor and control your Ecovacs Deebot vacuums.

You have first to setup the [Ecovacs component](/components/ecovacs/)

### {% linkable_title Component Lifespans %}

The remaining lifespan of components on your Deebot vacuum will be reported as attributes on the vacuum entity. The value will be a whole number representing the percentage of life remaining.

Here's an example of how to extract the filter's lifespan to its own sensor using a [template sensor](/components/sensor.template/):

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: template
    sensors:
      vacuum_filter:
        friendly_name: "Vacuum Filter Remaining Lifespan"
        unit_of_measurement: '%'
        value_template: "{{ state_attr('vacuum.my_vacuum_id', 'component_filter') }}"
```
{% endraw %}

Or, if you want a simple binary sensor that becomes `On` when the filter needs to be replaced (5% or less):

{% raw %}
```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: template
    sensors:
      vacuum_filter_replace:
        friendly_name: "Vacuum Filter"
        device_class: problem
        value_template: "{{ state_attr('vacuum.my_vacuum_id', 'component_filter') <= 5 }}"
```
{% endraw %}

### {% linkable_title Handling Errors %}

The vacuum entity has an `error` attribute that will contain the _most recent_ error message that came from the vacuum. There is not a comprehensive list of all error messages, so you may need to do some experimentation to determine the error messages that your vacuum can send.

If the vacuum fires a "no error" event, the `error` attribute will change back to `None`. Note, however, that this does not happen for all types of errors.

Alternatively, you can use the `ecovacs_error` event to watch for errors. This event will contain a data payload that looks like:

```json
{
  "entity_id": "vacuum.deebot_m80",
  "error": "an_error_name"
}
```

Finally, if a vacuum becomes unavailable (usually due to being idle and off its charger long enough for it to completely power off,) the vacuum's `status` attribute will change to `offline` until it is turned back on.
