---
title: Daikin Onecta
description: Instructions for integrating Daikin Onecta devices into Home Assistant.
ha_release: 2026.11
ha_category:
  - Climate
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jwillemsen'
ha_domain: daikin_onecta
ha_integration_type: device
ha_platforms:
  - climate
---

The **Daikin Onecta** {% term integration %} lets you monitor and control compatible Daikin heating and cooling devices through the [Daikin Onecta](https://www.daikin.eu/en_us/product-group/control-systems/onecta.html) cloud service.

Devices are discovered from the Onecta account. The climate entities available for a device depend on the climate-control management points and capabilities that Daikin reports for it.

## Prerequisites

- A Daikin device connected to the Onecta service.
- A Daikin Onecta account with access to that device.
- An OAuth client created in the [Daikin Developer Portal](https://developer.cloud.daikineurope.com/docs/b0dffcaa-7b51-428a-bdff-a7c8a64195c0/getting_started).

When creating the OAuth client, add this redirect URI:

```text
https://my.home-assistant.io/redirect/oauth
```

If you have disabled [My Home Assistant](/integrations/my/), use `<HOME_ASSISTANT_URL>/auth/external/callback` instead. Replace `<HOME_ASSISTANT_URL>` with the external URL of your Home Assistant instance.

Record the client ID and client secret, then add them as [application credentials](/integrations/application_credentials/#manual-setup) for **Daikin Onecta** in Home Assistant.

{% include integrations/config_flow.md %}

## Supported devices

Daikin supports third-party ONECTA Cloud API access only for units that can connect to the ONECTA app. These units are sold in the EMEA region. The integration creates climate entities only when the device reports compatible climate-control management points and capabilities.

Daikin lists the following gateway families as supporting third-party ONECTA Cloud API access:

- Air-to-air heat pumps: `BRP069A4x`, `BRP069B4x`, `BRP069C4x`, `BRP069C5x`, `BRP069A8x`, `BRP069B8x`, and `BRP069C8x`. The `BRP069C4x` family also supports air purifiers.
- Altherma air-to-water heat pumps: `BRP069A6x` and `BRP069A7x`.
- Altherma boilers: `DRGATEWAYAA`.

Daikin lists Daikin Home Controls (`EKRACPUR1PA`) and Daikin HomeHub (`EKRHH`) as not supporting third-party ONECTA Cloud API control. If your unit does not yet have a LAN or WLAN gateway, refer to Daikin's [supported gateways](https://developer.cloud.daikineurope.com/docs/84e709f1-9d33-47e1-a93c-7f5cb8b8f12b/supported_gateways) and [compatible units](https://www.daikin.eu/en_us/product-group/control-systems/onecta/connectable-units.html) guides. Newer Daikin units may have a gateway built in.

## Configuration options

To change these options, go to **Settings** > **Devices & services**, select **Daikin Onecta**, then select **Configure**.

{% configuration_basic %}
Expose HomeKit compatible fan speed aliases:
  description: Enables HomeKit-compatible names for fixed fan speeds when your device supports them. Disabled by default.
{% endconfiguration_basic %}

## Supported functionality

Depending on the capabilities reported by the device, the integration can provide:

- Climate control: HVAC mode, target temperature, fan mode, swing mode, and preset mode.

## Daikin Onecta automation examples

### Automation: Set the morning temperature

You can use the climate entity in automations, for example, to set a comfortable temperature each morning.

1. Go to **Settings** > **Automations & scenes**, select **Create automation**, then select **Create new automation**.
2. Add a **Time** trigger for the time you want the temperature to change.
3. Add a **Set thermostat target temperature** action and select your Daikin Onecta climate entity.
4. Select **Save**.

{% include docs/paste_yaml_tip.md %}

{% details "YAML example for setting a morning temperature" %}

{% example %}
automation: |
  alias: "Set Daikin temperature in the morning"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.living_room_room_temperature
      data:
        temperature: 21
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} the Daikin Onecta cloud service every 10 minutes from 07:00 to 22:00 and every 30 minutes overnight. After a setting change, Home Assistant temporarily defers background polling for 30 seconds to preserve the confirmed local state and reduce cloud API requests.

## Troubleshooting

{% details "Authentication or setup fails" %}

### Symptom

The integration cannot be configured.

#### Description

The OAuth client credentials may not match the Daikin Developer Portal configuration. Existing authorization can also expire or be revoked.

#### Resolution

1. Verify that the client ID and client secret in Home Assistant match the OAuth client in the Daikin Developer Portal.
2. Confirm that the redirect URI is `https://my.home-assistant.io/redirect/oauth`, or `<HOME_ASSISTANT_URL>/auth/external/callback` when My Home Assistant is disabled.

{% enddetails %}

{% details "Expected entities are missing" %}

### Symptom

One or more expected climate entities are not created.

#### Description

Home Assistant creates climate entities only for functions that Daikin reports for the device.

#### Resolution

1. Confirm that the device is online and visible in the Onecta app.
2. If a supported climate function is still missing, report the device model and the missing function.

{% enddetails %}

{% details "Devices are unavailable" %}

### Symptom

Daikin Onecta entities are unavailable.

#### Description

The integration is cloud-based. Entities become unavailable when Daikin Onecta, the device connection, or your internet connection is unavailable.

#### Resolution

1. Confirm that the device is online and visible in the Onecta app.
2. Check your internet connection and try again after Daikin Onecta is available.

{% enddetails %}

## Removing the integration

{% include integrations/remove_device_service.md %}
