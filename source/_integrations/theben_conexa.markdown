---
title: Theben Conexa Smart Meter Gateway
description: Instructions on how to integrate a Conexa SMGW within Home Assistant.
ha_release: 2026.7
ha_category: Energy
ha_iot_class: Local Polling
ha_quality_scale: bronze
ha_codeowners:
  - '@mdluhosch'
ha_domain: theben_conexa
ha_integration_type: device
related:
  - url: https://www.theben-se.de/conexa/
    title: Official website

---

<!--- Use this template together with the developer documentation, under [Documentation standard](https://developers.home-assistant.io/docs/documenting/standards) and the documentation rules of the [Integration Quality Scale](https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/). -->

The **Theben Conexa** {% term integration %} allows you to connect Home Assistant to the Conexa 3.0 device by [Theben Smart Energy](https://www.theben-se.de/conexa/). A Smart Meter Gateway (SMGW) acts as the secure communication hub for the modern electrical grid. For the end user, the Conexa features a built-in HAN (Home Area Network) interface. This integration taps directly into that local interface, pulling meter readings straight into Home Assistant without relying on the cloud.

## Supported devices

The following device is known to be supported by the integration:

- Conexa 3.0

## Prerequisites

1. To access the HAN interface you need to get the  `IP`, `username`, and `password` from your grid operator.
2. Some grid operators need to enable the HAN interface itself as well.
3. Optional but strongly encouraged: Test connectivity and authentication by accessing the web interface of the SMGW (should be `https://IP/`)
4. Make sure that the device running Home Assistant has network connectivity to the SMGW (same subnet)

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The IP address or hostname of your SMGW. For example, `192.168.1.200` or `conexa.local`. It is defined by your grid operator and not changeable by the end user"
Username:
    description: "The username to access your SMGW. Provided by your grid operator"
Password:
    description: "The password to access your SMGW. Provided by your grid operator"
{% endconfiguration_basic %}

## Supported functionality

The **Theben Conexa** integration provides the following entities.

### Sensors

- **Total Power Consumed**
  - **Description**: The total amount of Power (more precise Energy in Wh) you used from the electricity grid. This should be the same value as your electricity meter shows on its display.
  - **Remarks**: The Conexa SMGW provides a new measurement every 15 minutes.

- **Total Power Supplied**
  - **Description**: The total amount of Power (more precise Energy in Wh) you supplied to the electricity grid.
  - **Remarks**: Only shown if you actually supply power back to the grid. The Conexa SMGW provides a new measurement every 15 minutes.

## Data updates

The **Theben Conexa** integration {% term polling polls %} data from the device every 15 minutes. This is due to a restriction of the current firmware which does not allow to access the "live" meter readings. The SMGW provides a new measurement every 15 minutes based on this scheme: On any given UTC hour `hh` a new value is provided at `hh:00`, `hh:15`, `hh:30`, and `hh:45`. This integration therefore polls a few seconds after these times so that you have always access to the latest data in Home Assistant.

## Troubleshooting

### Can’t set up the device

#### Symptom: “This device can’t be reached”

When trying to set up the integration, the form shows the message “This device can’t be reached”.

#### Description

Most likely your device running Home Assistant is located in a different ipv4 subnet than your SMGW. As the SMGW static IP address can only be changed by your power grid operator you should change the network setting of your Home Assistant device to be able to reach the SMGW.

#### Resolution

To resolve this issue, try the one of following options:

- Option 1 - Change DHCP server settings: If your Home Assistant device gets its network settings from a DHCP server (your router) change the DHCP setting so that it assigns IP addresses in the same subnet your SMGW is located.
- Option 2 - Add another IP address to the Home Assistant device: One network interface can be assigned multiple IP addresses. So for example if your device currently uses `192.168.188.4/24` on device `eth0` but the SMGW has the static IP `192.168.1.200/24` then you can assign for example `192.168.1.4/24` as another IP for `eth0`
- Option 3 - You have a (semi) professional router: If your router is 'smart' then you can set it up to be connected to both subnets and provide a static route between the two. _Hint:_ Most routers / gateways provided by an ISP are not capable of doing this.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

