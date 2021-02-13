---
title: Nanoleaf
description: Instructions how to integrate Nanoleaf Light Panels into Home Assistant.
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: 0.67
ha_domain: nanoleaf
ha_platforms:
  - light
---

### Configuration Sample

The `nanoleaf` platform allows you to control [Nanoleaf Light Panels](https://nanoleaf.me) from Home Assistant. Note that for full control of nanoleaf devices, particularly effects, make sure they are set up as `- platform: nanoleaf` not as a homekit device.

The preferred way to set up this platform is by enabling the [discovery component](/integrations/discovery/). Make sure to press and hold the *ON* button for 5 seconds (the LED will start flashing) on your Nanoleaf Lights while Home Assistant is starting.

To configure the Nanoleaf lights manually, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: nanoleaf
    host: 192.168.1.10
    token: xxxxxxxxxxxxxxxxxxxxx
    name: bedroom_triangles
```

{% configuration %}
host:
  description: IP address or host-name of the device, e.g., 192.168.1.10.
  required: true
  type: string
token:
  description: The *auth* token that you get via *POST* to */api/v1/new*
  required: true
  type: string
name:
  description: Name of the component, make this unique if you have multiple Light Panels
  required: false
  type: string
  default: Nanoleaf
{% endconfiguration %}

### Getting The Auth Token

1. Make sure that your Nanoleaf Light Panel is fully patched (as of the time of writing the latest version was 3.0.8 for Aurora and 1.2.0 for Canvas)
2. Hold down the *ON* button on the Panel for 5 seconds; the LED will start flashing
3. Issue a *POST* request to the API endpoint, e.g., via `$ curl -i -X POST http://192.168.1.155:16021/api/v1/new`
4. The output should include the auth token like *{"auth_token":"xxxxxxxxxxxxxxxxxxxxx"}*, copy the resulting token into your configuration

If you get a 403 Forbidden message, you probably did not press the *ON* button long enough. The time-frame to get a valid token is only 30 seconds, so you have to be quick to issue the curl request.

### Getting useful values for automations

First set up some effects with the Nanoleaf app, and have them installed on the device.

Once installed, go to "Developer Tools" and find the state of the device, eg `light.bedroom_triangles`. You should end up with something like this:

```yaml
# Example nanoleaf state:
min_mireds: 154
max_mireds: 833
effect_list:
  - Beatdrop
  - Bedtime
  - Blaze
  - Cocoa Beach
  - Cotton Candy
  - Date Night
  - Hip Hop
  - Hot Sauce
  - Jungle
  - Lightscape
  - Morning Sky
  - Northern Lights
  - Pop Rocks
  - Prism
  - Starlight
  - Sundown
  - Waterfall
  - Vibrant Sunrise
brightness: 155
effect: Bedtime
friendly_name: Triangles
icon: 'mdi:triangle-outline'
supported_features: 55
```

Now you can call the `light.turn_on` service with the data:
```yaml
# Example data to activate a nanoleaf effect:
entity_id: light.trianglestest
effect: Starlight
```

Or in a script for example:
```yaml
# Example alarm script
alias: Alarm Sequence
sequence:
  - service: light.turn_on
    data:
      effect: Vibrant Sunrise
    entity_id: light.triangles
mode: single
```
