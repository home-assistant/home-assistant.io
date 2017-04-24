---
layout: page
title: "RESTful Switch"
description: "Instructions how to integrate REST switches into Home Assistant."
date: 2015-09-14 19:10
sidebar: true
comments: false
sharing: true
footer: true
logo: restful.png
ha_category: Switch
ha_release: 0.7.6
---


The `rest` switch platform allows you to control a given endpoint that supports a [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer). The switch can get the state via GET and set the state via POST on a given REST resource.

To enable this switch, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: rest
    resource: http://IP_ADDRESS/ENDPOINT
```

Configuration variables:

- **resource** (*Required*): The resource or endpoint that contains the value.
- **name** (*Optional*): Name of the REST switch.
- **body_on** (*Optional*): The body of the POST request that commands the switch to become enabled. Default is "ON". This value can be a [template](/topics/templating/), which is useful if the POST request needs to depend on the state of the system. For example, to enable remote-temperature-sensor tracking on a radio thermostat, one has to send the current value of the remote temperature sensor. On can achieve this using the template `'{"rem_temp":{{states.sensor.bedroom_temp.state}}}'`.
- **body_off** (*Optional*): The body of the POST request that commands the switch to become disabled. Default is "OFF". This value can also be a template.
- **is_on_template** (*Optional*): A [template](/topics/templating/) that determines the state of the switch from the value returned by the GET request on the resource url. This template should compute to a boolean (True or False). Default is equivalent to `'{% raw %}{{ value.json == body_on }}{% endraw %}'`. This means that by default, the state of the switch is on if and only if the response to the GET request matches `body_on`.


<p class='note warning'>
Make sure that the URL matches exactly your endpoint or resource.
</p>

