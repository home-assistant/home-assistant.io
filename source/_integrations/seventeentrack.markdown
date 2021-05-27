---
title: 17TRACK
description: How to integrate 17track.net data within Home Assistant
ha_category:
  - Postal Service
ha_release: 0.83
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@bachya'
  - '@engrbm87'
ha_domain: seventeentrack
ha_platforms:
  - sensor
---

The Seventeentrack integration allows users to get package data tied to their [17track.net](https://www.17track.net/en) account. A sesnor is created for each status type received from the Summary data retruned by the api. Each sensor will include the list of packages with their details in the attribute `Packages`. 

An `all_packages` sensor is created that holds all packages in its `Packages` attribute. Below you will find an example showing how to create template sensor for individual package to monitor its status and other attributes.

<div class='note warning'>

Although the 17track.net website states that account passwords cannot be longer than 16 characters, users can technically set long-than-16-character passwords. These passwords **will not** work with the used API. Therefore, please ensure that your 17track.net password does not exceed 16 characters.

</div>

## Configuration

{% include integrations/config_flow.md %}

## Integration Sensors

 Currently the summary data returns the following package types:

- Delivered: Number of packages delievered
- Expired: Number of packages expired
- In Transit: Number of packages in transit
- Not Found: Number of packages not found
- Ready to be picked up: Number of packages ready to be picked up
- Returned: Number of packages returned
- Undelivered: Number of packages undelievered

## Services

### Service `add_package`

Adds a new package to your 17Track account. 

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `tracking_number`    | no | The trakcing number of the package
| `friendly_name` | yes | set friendly name for the added package

## Examples

### Individual package template sensor

Use the following configuration to create a template sensor for an individual package. The below assumes you are using the default name for the integration.

{% raw %}

```yaml
template:
  - sensor:
      - name: "My package"
        state: "{{ state_attr('sensor.seventeentrack_all_packages', 'packages')['<tracking_number>'].status }}"
        attributes:
          info_text: "{{ state_attr('sensor.seventeentrack_all_packages', 'packages')['<tracking_number>'].info_text }}"
          origin_country: "{{ state_attr('sensor.seventeentrack_all_packages', 'packages')['<tracking_number>'].origin_country }}"

```

{% endraw %}

### Lovelace summary card

Use the following templated Markdown card to list all packages in transit along their status:

{% raw %}

```yaml
type: markdown
title: Packages in transit
content: >-
  {% for package in
  states.sensor.seventeentrack_packages_in_transit.attributes.packages %}

  **{{ package.friendly_name }}:** {{ package.info_text }}

  {% endfor %}
```

{% endraw %}
