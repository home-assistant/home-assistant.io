---
title: Sensibo
description: Instructions on how to integrate Sensibo A/C controller into Home Assistant.
logo: sensibo.png
ha_category:
  - Climate
ha_release: 0.44
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@andrey-git'
---

Integrates [Sensibo](https://sensibo.com) Air Conditioning controller into Home Assistant.

## Installation

To add the Sensibo integration to your installation, you can either use the integrations screen in the UI or add an entry to your `configuration.yaml`. In both cases you will need an API key for Sensibo.

### Obtain a Sensibo API key

To get your Sensibo API key visit `https://home.sensibo.com/me/api`. You can choose to log in with Sensibo either as your main user or another user.

<div class="note">
If you create the API key using a dedicated user (and not your main user),
then in the Sensibo app log you will be able to distinguish between actions
done in the app and actions done by Home Assistant.
</div>

### Set up the integration via the integrations screen

Navigate to **Configuration** and then **Integrations**. Select the plus sign to add a new integration and select **Sensibo** from the list.

Enter your Sensibo API key in the form and submit. Home Assistant will then try to connect to Sensibo to find your Sensibo devices and add them as entities.

### YAML configuration

Add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensibo:
  api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: Your Sensibo API key. See previous section in this documentation on how to obtain it.
  required: true
  type: string
id:
  description: A unit ID or a list of IDs. If none specified then all units accessible by the `api_key` will be used.
  required: false
  type: string
{% endconfiguration %}

## Full configuration example

```yaml
sensibo:
  - api_key: YOUR_API_KEY
    id:
      - id1
      - id2
  - api_key: YOUR_OTHER_API_KEY
    id:
      - id3
      - id4
```

## Adding a quick switch example

If you want a "Quick Switch" to turn your AC On / Off, you can do that using the following `Switch Template`:

{% raw %}

```yaml
switch:
  - platform: template
    switches:
      ac:
        friendly_name: "AC"
        value_template: "{{ is_state('climate.ac', 'cool') or is_state('climate.ac', 'heat') or is_state('climate.ac', 'dry') or is_state('climate.ac', 'fan_only') }}"
        turn_on:
          service: climate.set_hvac_mode
          data:
            entity_id: climate.ac
            hvac_mode: cool
        turn_off:
          service: climate.set_hvac_mode
          data:
            entity_id: climate.ac
            hvac_mode: off
```

{% endraw %}
