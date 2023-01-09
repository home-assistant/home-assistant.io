---
title: 2E Lighting
description: Instructions on adding a 2E Lighting system to Home Assistant.
ha_release: '0.0.1'
logo: 2e-logo.png
ha_category:
  - Light
  - Binary sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@AjJordy'
ha_domain: 2elighting
ha_mqtt: true
ha_platforms:
  - light
  - binary_sensor
ha_integration_type: integration
---

The 2E Lighting integration allows you to control and monitor lights from your local 2E Lighting modules.

## Prerequisites

Before setting up, you should assign a static IP address/DHCP reservation on your router to your Module. You need a MQTT broker running and configure the module to connect to this MQTT broker.

## Configuration

Adding {{ name }} to your Home Assistant instance can be done via the user
interface, by using this My button:

{% my config_flow_start badge domain=domain %}

{% if include.discovery or page.ha_dhcp or page.ha_homekit or page.ha_ssdp or page.ha_zeroconf or page.ha_mqtt %}
{{ name }} can be auto-discovered by Home Assistant. If an instance was found,
it will be shown as _"Discovered"_, which you can select to set it up right
away.
{% endif %}

{% details "Manual configuration steps" %}
If there wasn't any discovered automatically, don't worry! You can set up a
manual integration entry:


- Browse to your Home Assistant instance.
- In the sidebar click on _**{% my config icon %}**_.
- From the configuration menu select: _**{% my integrations %}**_.
{% if page.ha_integration_type == 'helper' %}
- In top of the screen click the tab: _**{% my helpers %}**_.
- In the bottom right, click on the
  _**{% my config_flow_start icon domain=domain title="Create helper" %}**_ button.
{% else %}
- In the bottom right, click on the
  _**{% my config_flow_start icon domain=domain %}**_ button.
{% endif %}
- From the list, search and select _**"MQTT"**_.
- Insert `IP Broker` and `port: 1883`
- In prefix discovery use `2elighting`
- In Birth message use `2elighting/status`
- In Will message use `2elighting/status`
- Click in Send button

{% enddetails %}


