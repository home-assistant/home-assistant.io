---
title: "Reset Wi-Fi"
action: opengarage.reset_wifi
domain: opengarage
description: "Resets the device to access-point mode for Wi-Fi configuration."
---

Use this action to reset the device to Wi-Fi access-point mode. This allows you to reconfigure Wi-Fi without losing settings and log data.

{% warning %}
The device goes offline immediately and stays offline until [Wi-Fi configuration](https://opengarage.github.io/OpenGarage-Firmware/1.2.5/manual/#step-1-power-up-and-ap-mode) is completed.
{% endwarning %}

## Good to know

- This action is only intended to be performed directly from {% my developer_services title="**Settings** > **Tools** > **Actions**" %}.
- Only administrators can run this action.

{% include actions/stuck.md %}

{% include actions/related.md %}
