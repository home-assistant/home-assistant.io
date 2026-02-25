---
title: Aladdin Connect
description: Instructions on how to integrate Genie Aladdin Connect garage door openers with Home Assistant for monitoring and control.
ha_category:
  - Cover
ha_release: 0.75
ha_iot_class: Cloud Polling
ha_domain: aladdin_connect
ha_platforms:
  - cover
  - sensor
ha_integration_type: hub
ha_codeowners:
  - '@swcloudgenie'
ha_config_flow: true
ha_dhcp: true
---

The **Aladdin Connect** {% term integration %} lets you open, close, and check the status of Genie Aladdin Connect garage doors through Home Assistant. It also reports the battery level of your opener's backup battery.

With this integration, you could get a notification when the garage door has been left open, or have it close automatically at a set time each night.

## Supported devices

Any garage door opener that works with the **AladdinConnect** app should work with this integration. Aladdin Connect devices on your network can also be discovered automatically using <abbr title="Dynamic Host Configuration Protocol">DHCP</abbr> discovery.

## Prerequisites

You need the following before you start:

1. An active [Home Assistant Cloud](https://www.nabucasa.com/) subscription, since the integration authenticates through it.
2. Install the **AladdinConnect** app on your phone and create an account.
3. Add your garage door opener to the app and confirm you can open and close it.

{% include integrations/config_flow.md %}

During setup, you will be redirected to sign in with your Aladdin Connect account. After you authorize Home Assistant, your garage doors will be added automatically. There are no additional parameters to configure.

## Supported functionality

### Entities

The **Aladdin Connect** integration provides the following entities.

#### Covers

- **Garage door**
  - **Description**: Your garage door. You can open and close it, and it reports its current status: open, opening, closed, or closing.
  - **Device class**: Garage

#### Sensors

- **Battery level**
  - **Description**: The battery level of your opener's backup battery, as a percentage. Useful for knowing when the battery needs replacing.
  - **Entity category**: Diagnostic
  - **Remarks**: Disabled by default. To use this sensor, enable it manually from the entity's settings.


## Examples

### Send a notification when the garage door is left open

If someone leaves the garage door open for more than 10 minutes, this automation sends a notification to your phone.

{% details "Example YAML configuration" %}

{% raw %}

```yaml
alias: "Notify when garage left open"
description: >
  Send a notification if the garage door stays open
  for more than 10 minutes.
triggers:
  - trigger: state
    entity_id: cover.garage_door
    to: "open"
    for:
      minutes: 10
actions:
  - action: notify.mobile_app_your_phone
    data:
      title: "Garage door open"
      message: "The garage door has been open for 10 minutes."
```

{% endraw %}
{% enddetails %}

### Close the garage door at night

This automation closes the garage door automatically at 10 PM if it happens to be open.

{% details "Example YAML configuration" %}

{% raw %}

```yaml
alias: "Close garage door at night"
description: >
  Close the garage door at 10 PM if it is still open.
triggers:
  - trigger: time
    at: "22:00:00"
conditions:
  - condition: state
    entity_id: cover.garage_door
    state: "open"
actions:
  - action: cover.close_cover
    target:
      entity_id: cover.garage_door
```

{% endraw %}
{% enddetails %}

## Data updates

Door status and battery level are updated by {% term polling %} the Aladdin Connect cloud service every 15 seconds. All communication goes through the cloud API. There is no local or push-based option.

## Known limitations

- Only doors that are owned by your Aladdin Connect account are available. Doors that your account has been granted shared access to are not supported.
- There is no position control. You can open or close the door, but you cannot stop it at a specific position.
- All communication goes through the cloud. There is no local or LAN-based control, so the integration stops working if your internet connection drops.
- A Home Assistant Cloud subscription is required for authentication.
 

## Troubleshooting

### Setup fails with "cloud not enabled"

This error means Home Assistant Cloud is not active. Go to {% my cloud title="**Settings** > **Home Assistant Cloud**" %} and verify you have an active [Home Assistant Cloud](https://www.nabucasa.com/) subscription.

### OAuth sign-in fails or times out

Check your internet connection and try again. If it keeps happening, open the **AladdinConnect** app on your phone and sign out and back in to confirm your credentials still work.

### Doors are not showing up after setup

Only doors you own appear in Home Assistant. Shared doors are not supported. Open the **AladdinConnect** app and check that the missing door is listed under your own account, not under a shared section.

### Device becomes unavailable

The garage door entity shows as unavailable when it cannot reach the Aladdin Connect cloud service. Check your internet connection first. Then open the **AladdinConnect** app and see if you can still control the door from there. If the app also cannot connect, the Aladdin Connect service may be down.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
