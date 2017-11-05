---
layout: page
title: "IKEA Trådfri (Tradfri)"
description: "Access and control your ZigBee-based IKEA Trådfri (Tradfri) devices."
date: 2017-04-12 22.04
sidebar: true
featured: true
comments: false
sharing: true
footer: true
logo: ikea.svg
ha_category: Hub
ha_iot_class: "Local Polling"
ha_release: 0.43
---

The `tradfri` component supports for the IKEA Trådfri (Tradfri) gateway. The gateway can control lights connected to it and Home Assistant will automatically discover its presence on your network, if `discovery:` is present in your `configuration.yaml` file.

You will be prompted to configure the gateway through the Home Assistant interface. Enter the security key when prompted and click configure.

<p class='note'>
If you see an "Unable to connect" message, restart the gateway and try again. Don't forget to assign a permanent IP to your Trådfri gateway.
</p>

You can add the following to your `configuration.yaml` file if you are not using the [`discovery:`](/components/discovery/) component:

```yaml
# Example configuration.yaml entry
tradfri:
  host: IP_ADDRESS
```

Configuration variables:

 - **host** (*Required*): The IP address or hostname of your Trådfri gateway.
 - **allow_tradfri_groups** (*Optional*): Set this to `false` to stop Home Assistant from importing the groups defined on the Trådfri bridge. Defaults to `true`.

<p class='note'>
Do not use the `api_key` variable. The key is only needed once at initial setup.
</p>
