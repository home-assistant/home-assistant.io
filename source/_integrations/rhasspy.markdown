---
title: Rhasspy
description: Instructions on setting up Rhasspy within Home Assistant.
ha_category:
  - Voice
ha_iot_class: Local Push
ha_release: '2022.8'
ha_config_flow: true
ha_codeowners:
  - '@balloob'
  - '@synesthesiam'
ha_domain: rhasspy
ha_integration_type: integration
---

The Rhasspy integration allows you to use your [Rhasspy voice assistant](https://rhasspy.readthedocs.io) with your Home Assistant installation. Rhasspy is an open source, fully offline set of voice assistant services for many human languages.

{% include integrations/config_flow.md %}

Rhasspy comes in two flavors. If you want to just try out, you can connect a microphone and speaker to the machine running Home Assistant and install Rhasspy Junior as an add-on. Once installed, you can say any of [these pre-defined sentences](https://github.com/rhasspy/rhasspy-junior#domains).

{% my supervisor_addon badge addon="47701997_rhasspy_junior" repository_url="https://github.com/rhasspy/hassio-addons" %}

For advanced users that have experience with Rhasspy and want to learn more. The full version of Rhasspy allows tweaking every single possible setting and requires you to do so before you can use it. It can also be installed as an add-on:

{% my supervisor_addon badge addon="47701997_rhasspy" repository_url="https://github.com/rhasspy/hassio-addons" %}
