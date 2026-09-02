---
title: Gaposa
description: Instructions on how to integrate Gaposa motorized blinds and shades into Home Assistant.
ha_category:
  - Cover
ha_release: 2026.8
ha_domain: gaposa
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@mwatson2'
ha_platforms:
  - cover
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Gaposa** {% term integration %} lets you open, close, and stop [Gaposa](https://www.gaposa.it/eng) motorized blinds and shades from Home Assistant. Every motor on your Gaposa account becomes a [cover entity](/integrations/cover/) you can include in automations, scripts, and dashboards.

The integration talks to the Gaposa cloud service through the same account you use with the [RollApp mobile application](https://www.gaposa.it/eng/news/rollapp/). All commands and status updates go through the cloud, so your LinkIt hub needs an active internet connection.

## Supported devices

- The [Gaposa LinkIt hub](https://www.gaposa.it/eng/prod/?residential/electronics/control-units/home-automation/linkit) is required to bridge between Home Assistant and your motors.
- Any Gaposa roller-shade motor that you have already paired with your LinkIt hub through the RollApp mobile application. Use the mobile app to enroll new motors, assign them names, and organize them into rooms. The Home Assistant integration picks up whatever the app reports on your account.

## Prerequisites

Before setting up the integration:

1. Install the [Gaposa RollApp mobile application](https://www.gaposa.it/eng/news/rollapp/) and create a Gaposa cloud account.
2. Enroll your [Gaposa LinkIt hub](https://www.gaposa.it/eng/prod/?residential/electronics/control-units/home-automation/linkit) in the mobile app and pair each motor you want to control.
3. Request a Gaposa cloud API key from [Gaposa support](https://www.gaposa.it/eng). The API key is tied to your account and is used to authenticate Home Assistant with the cloud service.
4. Have your RollApp username and password ready.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The Gaposa cloud API key tied to your account."
Username:
  description: "The email address for your Gaposa RollApp account."
Password:
  description: "The password for your Gaposa RollApp account."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one device per motor. Each device hosts a single cover entity with the `shade` device class.

### Cover

- **Open**, **Close**, and **Stop** commands are sent to the motor through the Gaposa cloud.
- The cover reports **Open** when the motor last ran to the fully-open position, **Closed** when it last ran to the fully-closed position, and an intermediate state after a stop.
- While a motion command is in flight, the cover briefly reports **Opening** or **Closing** so your dashboards and automations can react to the move. Because the Gaposa cloud does not push real-time motor progress, the motion window is a 60-second approximation that starts from when Home Assistant sent the command.

The integration does not support position presets or partial-open commands — the Gaposa cloud API only exposes up, down, and stop.

## Examples

### Close the shades at sunset

```yaml
- alias: "Close the shades at sunset"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room
```

### Open the bedroom shade on weekday mornings

```yaml
- alias: "Open the bedroom shade on weekday mornings"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.bedroom
```

## Data updates

The integration {% term polling polls %} the Gaposa cloud every 10 minutes during normal operation. If a poll fails because of a network error, a request timeout, or a temporary cloud outage, the interval shortens to one minute until a subsequent poll succeeds, then returns to 10 minutes.

Because Gaposa does not push state changes, you may see a short delay between a shade moving and Home Assistant reflecting the new state. Commands you send from Home Assistant take effect immediately and update the entity state straight away; the next scheduled refresh confirms the motor reached its target.

## Known limitations

- The integration is cloud-polled, not cloud-pushed. Updates made to shades through the RollApp, a physical remote, or wall switches may take up to 10 minutes to show up in Home Assistant.
- Motor position is not reported. Only a three-state model of `open`, `closed`, or somewhere in between after a stop.
- Adding, renaming, or removing motors in the RollApp mobile application requires reloading the integration in Home Assistant before the changes appear. Removed motors stay in Home Assistant as unavailable entities until you delete them manually.

## Troubleshooting

### I can't set up the integration

#### Symptom

Home Assistant reports **Invalid authentication** or **Failed to connect** during the setup dialog.

#### Description

Home Assistant could not sign in to your Gaposa account using the credentials you entered. Either the API key, the username, or the password is wrong, or the Gaposa cloud is temporarily unreachable.

#### Resolution

1. Open the RollApp mobile application and confirm that you can sign in with the same username and password, and that you can open and close at least one shade from the app.
2. Double-check your Gaposa cloud API key. The key is case-sensitive and tied to the account you signed into the app with.
3. If the RollApp is also unable to reach the Gaposa cloud, wait a few minutes and try again — the cloud may be under maintenance.

### My shades show up but commands do nothing

#### Symptom

The cover entities exist in Home Assistant and you can select **Open** or **Close**, but the physical shades don't move.

#### Description

The LinkIt hub is likely offline, even though the Gaposa cloud still remembers the motors associated with your account.

#### Resolution

1. Check that the LinkIt hub is powered on and connected to your internet router.
2. In the RollApp mobile application, try to control the same shade. If the app can't reach the hub either, follow the troubleshooting steps in the RollApp documentation.
3. Once the hub is back online, the next scheduled refresh (at most 10 minutes) will reconcile Home Assistant with the shade state.

### The shade state is wrong after someone used a physical remote

#### Symptom

Someone opened or closed a shade using the Gaposa wall switch or handheld remote, and Home Assistant still reports the old state.

#### Description

Gaposa's cloud does not push real-time motor events to the integration, so out-of-band changes are only visible on the next polling cycle.

#### Resolution

Wait for the next coordinator refresh (up to 10 minutes), or reload the integration from {% my integrations title="**Settings** > **Devices & services**" %} to force an immediate refresh.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
