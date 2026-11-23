---
title: Tile BLE
description: Instructions on how to track your Tile Bluetooth trackers locally with Home Assistant.
ha_release: 2026.12
ha_categories:
  - presence_location.trackers
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - "@joostlek"
ha_domain: tile_ble
ha_integration_type: device
ha_platforms:
  - device_tracker
  - diagnostics
ha_quality_scale: bronze
related:
  - docs: /integrations/tile/
    title: Tile
  - docs: /integrations/bluetooth/
    title: Bluetooth
---

The **Tile BLE** {% term integration %} lets you use your [Tile](https://www.tile.com) Bluetooth trackers directly with Home Assistant over Bluetooth. After setup, it tracks whether a Tile is in range locally, without relying on the Tile cloud.

Use case: Put a Tile on your keys or in your bag, and let Home Assistant remind you when you leave without them.

This integration is separate from the cloud-based [Tile](/integrations/tile/) integration. You can use either of them, or both.

## Prerequisites

1. Set up the [Bluetooth](/integrations/bluetooth/) integration with a Bluetooth adapter or a [Bluetooth proxy](/integrations/bluetooth/#remote-adapters-bluetooth-proxies) that can make active connections.
2. In the Tile app, add your Tile to your Tile account, if you haven't already.
3. Make sure the Tile is close to your Bluetooth adapter or proxy.

{% include integrations/config_flow.md %}

Home Assistant doesn't discover Tiles automatically, because Tiles owned by your neighbors and visitors are often in range too. Instead, you log in to your Tile account during setup, and pick one of your own Tiles.

{% configuration_basic %}
Email:
  description: "The email address of your Tile account. Home Assistant uses your account to get the names of your Tiles and their keys. Your credentials are not stored."
Password:
  description: "The password of your Tile account."
Device:
  description: "The Tile you want to set up. Your Tiles are listed by name. A Tile listed by its Bluetooth address could not be matched to your account yet. If you pick one, Home Assistant connects to it to find out which Tile it is."
{% endconfiguration_basic %}

Before the Tile is added, Home Assistant connects to it once to check that the key from your account works. Only the key of the Tile you set up is stored.

To add more Tiles, repeat these steps for each Tile.

## Supported functionality

The **Tile BLE** integration provides the following entities for each Tile.

### Device trackers

- **Tile** (the entity has the name of your Tile)
  - **Description**: Shows **Home** while Home Assistant receives the Tile's Bluetooth advertisements, and **Away** once it stops receiving them.

## Tile BLE automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: Get a reminder when you leave without your keys

When you leave home but your keys are still in range, send a notification to your phone.

- **Trigger**: State changed
  - **Entity**: Alex
  - **From**: Home
- **Condition**: State
  - **Entity**: Keys (`device_tracker.keys`)
  - **State**: Home
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a reminder when you leave without your keys" %}

{% example %}
automation: |
  alias: "Remind me when I leave without my keys"
  triggers:
    - trigger: state
      entity_id: person.alex
      from: home
  conditions:
    - condition: state
      entity_id: device_tracker.keys
      state: home
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Your keys are still at home.
{% endexample %}

{% enddetails %}

## Data updates

The **Tile BLE** integration listens to the Bluetooth advertisements a Tile sends out. It doesn't connect to the Tile for this, so it doesn't drain the battery of the Tile. Home Assistant only connects to the Tile during setup.

## Known limitations

- Home Assistant can only see a Tile within Bluetooth range of one of your Bluetooth adapters or proxies. **Away** means the Tile is out of range, not that it is in a specific place. To see where a Tile is when you are out, use the [Tile](/integrations/tile/) integration.
- Setting up a Tile needs an active Bluetooth connection, which not every Bluetooth adapter or proxy can make. See the [Bluetooth](/integrations/bluetooth/) integration for which adapters can make active connections.
- You can only set up Tiles that are in your own Tile account.
- Each Tile is set up as its own integration entry.

## Troubleshooting

{% details "My Tile isn't listed during setup" %}

### Symptom: "No devices found on the network"

When you try to set up the integration, the setup stops with the message "No devices found on the network".

#### Description

Home Assistant has not received Bluetooth advertisements from any Tile that isn't set up yet.

#### Resolution

1. Make sure the Bluetooth integration is set up and working.
2. Move the Tile closer to your Bluetooth adapter or proxy, and try again.

{% enddetails %}

{% details "No Tiles in the Tile account" %}

### Symptom: "No Tiles were found in this Tile account"

After you log in, the setup stops with the message "No Tiles were found in this Tile account".

#### Description

Your Tile account has no Tiles that Home Assistant can get a key for.

#### Resolution

1. Make sure you logged in with the account that owns the Tile.
2. In the Tile app, check that the Tile is listed in your account.

{% enddetails %}

{% details "The Tile is not in my account" %}

### Symptom: "This Tile is not in your Tile account"

After you pick a Tile, the form shows the message "This Tile is not in your Tile account. Pick another Tile."

#### Description

The Tile you picked belongs to someone else, like a neighbor or a visitor.

#### Resolution

Pick another Tile from the list. Tiles listed by name are matched to your account already.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
