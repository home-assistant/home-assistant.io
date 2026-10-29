---
description: How to set up the Volumio media player integration
ha_release: 0.41
ha_domain: volumio
---

The **Volumio** {% term integration %} allows you to control a [Volumio](https://volumio.org/) media player from Home Assistant.

{% include integrations/config_flow.md %}

{% note %}
Volumio versions 2.799 and below do not have a unique id when manually configured, so you will not be able to rename your {% term entity %} or add your device to an area. If discovery does not work for you, it is advised to upgrade Volumio before configuring.
{% endnote %}
