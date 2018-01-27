---
layout: page
title: "RESTful Light"
description: "Instructions how to integrate REST lights into Home Assistant."
date: 2017-10-23 13:53
sidebar: true
comments: false
sharing: true
footer: true
logo: restful.png
ha_category: Light
ha_release: 0.63
ha_iot_class: "Local Polling"
---


The `rest` light platform allows you to control a given endpoint that supports a [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer). The light can get the state via GET and set the state via POST on a given REST resource.

To enable this light, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: rest
    resource: http://IP_ADDRESS/ENDPOINT
```

Configuration variables:

{% configuration %}
  resource:
    description: 'The resource or endpoint that contains the value.'
    required: true
    type: string
  name:
    description: 'Name of the REST light.'
    required: false
    type: string
  method:
    description: 'HTTP method to use (`post` or `put`). Defaults to `post`.'
    required: false
    type: string
  username:
    description: 'The username for accessing the REST endpoint.'
    required: false
    type: string
  password:
    description: 'The password for accessing the REST endpoint.'
    required: false
    type: string
  body_on:
    description: 'The body of the POST request that commands the light to become enabled. Default is {% raw %}`{\"is_on\": true}`{% endraw %}. This value can be a [template](/topics/templating/).'
    required: false
    type: string
  body_off:
    description: 'The body of the POST request that commands the light to become disabled. Default is {% raw %}`{\"is_on\": false}`{% endraw %}. This value can also be a [template](/topics/templating/).'
    required: false
    type: string
  body_brightness:
    description: 'The body of the POST request that commands the light to set brightness. Default is {% raw %}`{\"brightness\": %d}`{% endraw %}. `%d` will be replaced with the brightness value. This value can also be a [template](/topics/templating/).'
    required: false
    type: string
  body_color_temp:
    description: 'The body of the POST request that commands the light to set color_temp. Default is {% raw %}`{\"color_temp\": %d}`{% endraw %}. `%d` will be replaced with the color_temp value. This value can also be a [template](/topics/templating/).'
    required: false
    type: string
  body_effect:
    description: 'The body of the POST request that commands the light to set effect. Default is {% raw %}`{\"effect\": %s}`{% endraw %}. `%s` will be replaced with the effect value. This value can also be a [template](/topics/templating/).'
    required: false
    type: string
  body_rgb_color:
    description: 'The body of the POST request that commands the light to set rgb_color. Default is {% raw %}`{\"rgb_color\": [%d, %d, %d]}`{% endraw %}. `%d` will be replaced with the red, green and blue values. This value can also be a [template](/topics/templating/).'
    required: false
    type: string
  body_transition:
    description: 'The body of the POST request that commands the light to set transition. Default is {% raw %}`{\"transition\": %d}`{% endraw %}. `%d` will be replaced with the transition value. This value can also be a [template](/topics/templating/).'
    required: false
    type: string
  is_on_template:
    description: 'A [template](/docs/configuration/templating/#processing-incoming-data) that determines the state of the light from the value returned by the GET
     request on the resource URL. This template should compute to a boolean. If the value is valid JSON, it will be available in the template as the variable `value_json`. Default is {% raw %}`{{value_json.is_on}}`{% endraw %}.'
    required: false
    type: string
  brightness_template:
    description: 'A [template](/docs/configuration/templating/#processing-incoming-data) that determines the brightness of the light from the value returned by the GET request on the resource URL. This template should compute to an integer. If the value is valid JSON, it will be available in the template as the variable `value_json`. Default is {% raw %}`{{value_json.brightness}}`{% endraw %}.'
    required: false
    type: string
  color_temp_template:
    description: 'A [template](/docs/configuration/templating/#processing-incoming-data) that determines the color_temp of the light from the value returned by the GET request on the resource URL. This template should compute to an integer. If the value is valid JSON, it will be available in the template as the variable `value_json`. Default is {% raw %}`{{value_json.color_temp}}`{% endraw %}.'
    required: false
    type: string
  effect_template:
    description: 'A [template](/docs/configuration/templating/#processing-incoming-data) that determines the effect of the light from the value returned by the GET request on the resource URL. This template should compute to an string. If the value is valid JSON, it will be available in the template as the variable `value_json`. Default is {% raw %}`{{value_json.effect}}`{% endraw %}.'
    required: false
    type: string
  rgb_color_template:
    description: 'A [template](/docs/configuration/templating/#processing-incoming-data) that determines the rgb_color of the light from the value returned by the GET request on the resource URL. This template should compute to an array of three integers, representing red, green and blue. If the value is valid JSON, it will be available in the template as the variable `value_json`. Default is {% raw %}`{{value_json.rgb_color}}`{% endraw %}.'
    required: false
    type: string
  name_template:
    description: 'A [template](/docs/configuration/templating/#processing-incoming-data) that determines the name of the light from the value returned by the GET request on the resource URL. This template should compute to a string. If the value is valid JSON, it will be available in the template as the variable `value_json`. Default is {% raw %}`{{value_json.name}}`{% endraw %}.'
    required: false
    type: string
  supported_features_template:
    description: 'A [template](/docs/configuration/templating/#processing-incoming-data) that determines the supported features of the light from the value returned by the GET request on the resource URL. This template should compute to an array of strings. If the value is valid JSON, it will be available in the template as the variable `value_json`. Default is {% raw %}`{{value_json.supported_features}}`{% endraw %}.'
    required: false
    type: string
  effect_list_template:
    description: 'A [template](/docs/configuration/templating/#processing-incoming-data) that determines the effect list of the light from the value returned by the GET request on the resource URL. This template should compute to an array of strings. If the value is valid JSON, it will be available in the template as the variable `value_json`. Default is {% raw %}`{{value_json.effect_list}}`{% endraw %}.'
    required: false
    type: string
  supported_features:
    description: 'A list of features that the light supports. This is retrieved from the light itself where possible, but may be specified in cases where the light does not provide this information through its interface (acceptable entries are `brightness`, `color_temp`, `effect`, `rgb_color` and `transition`. Note if the light is able to provide this information itself (and `supported_features_template` is correctly configured), then anything set manually here will be overridden'
    required: false
    type: list
{% endconfiguration %}

<p class='note warning'>
Make sure that the URL matches exactly your endpoint or resource.
</p>
