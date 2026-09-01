---
title: Disneyland Paris
description: Instructions on how to integrate Disneyland Paris service within Home Assistant.
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_release: 2026.4
ha_category:
  - Sensor
ha_codeowners:
  - '@glenndehaan'
ha_domain: disneyland_paris
ha_platforms:
  - sensor
ha_integration_type: service
---

The **Disneyland Paris** {% term integration %} allows you to monitor [Disneyland Paris](https://disneylandparis.com) park info and attraction wait times.

## Use cases

- Monitor park opening and closing times.
- Monitor attraction wait times.

{% include integrations/config_flow.md %}

## Supported functionality

The integration will fetch data from the Disneyland Paris service.
Below is a complete overview of the entities this integration provides.

### Sensors

#### Disneyland

- Park opening time
- Park closing time
- it's a small world standby wait time
- Adventure Isle standby wait time
- Alice's Curious Labyrinth standby wait time
- Autopia standby wait time
- Big Thunder Mountain standby wait time
- Blanche-Neige et les Sept Nains standby wait time
- Buzz <!-- textlint-disable -->Lightyear<!-- textlint-enable --> Laser Blast standby wait time
- Casey Jr. – le Petit Train du Cirque standby wait time
- Disneyland Railroad Discoveryland Station standby wait time
- Disneyland Railroad Fantasyland Station standby wait time
- Disneyland Railroad Frontierland Depot standby wait time
- Disneyland Railroad Main Street Station standby wait time
- Dumbo the Flying Elephant standby wait time
- Frontierland Playground standby wait time
- Indiana Jones and the Temple of Peril standby wait time
- La Cabane des Robinson standby wait time
- La Galerie de la Belle au Bois Dormant standby wait time
- La Tanière du Dragon standby wait time
- Le Carrousel de Lancelot standby wait time
- Le Passage Enchanté d'Aladdin standby wait time
- Le Pays des Contes de Fées standby wait time
- Les Mystères du Nautilus standby wait time
- Les Voyages de Pinocchio standby wait time
- Mad Hatter's Tea Cups standby wait time
- Main Street Vehicles standby wait time
- Orbitron standby wait time
- Peter Pan's Flight standby wait time
- Phantom Manor standby wait time
- Pirate Galleon standby wait time
- Pirates' Beach standby wait time
- Pirates of the Caribbean standby wait time
- Rustler Roundup Shootin' Gallery standby wait time
- Star Tours: The Adventures Continue standby wait time
- Star Wars Hyperspace Mountain standby wait time
- Thunder Mesa Riverboat Landing standby wait time

#### Disney Adventure World

- Park opening time
- Park closing time
- Avengers Assemble: Flight Force standby wait time
- Cars Quatre Roues Rallye standby wait time
- Cars ROAD TRIP standby wait time
- Crush's Coaster standby wait time
- Frozen Ever After standby wait time
- Les Tapis Volants - Flying Carpets Over Agrabah standby wait time
- Raiponce Tangled Spin standby wait time
- Ratatouille : L’Aventure Totalement Toquée de Rémy standby wait time
- RC Racer standby wait time
- Slinky Dog Zigzag Spin standby wait time
- Spider-Man W.E.B. Adventure standby wait time
- The Twilight Zone Tower of Terror standby wait time
- Toy Soldiers Parachute Drop standby wait time

## Data updates

This integration uses cloud {% term polling %}, meaning it checks for changes to all entities by regularly communicating with the Disneyland Paris service.

The integration will retrieve data from the device every 5 minutes.

## Examples

The following examples show how to use the Disneyland Paris integration in Home Assistant automations.
These examples are just a starting point, and you can use them as inspiration to create your own automations.

### Park opening notification

The following example sends a notification in the morning with the opening times of both parks.

{% raw %}

```yaml
automation:
  - alias: "Disneyland Paris Opening Times Notification"
    triggers:
      - trigger: time
        at: "08:00:00"

    actions:
      - action: notify.send_message
        data:
          message: >
            Disneyland Park opens at {{ as_timestamp(states('sensor.disneyland_paris_disneyland_opening_time')) | timestamp_custom('%H:%M') }}.
            Disney Adventure World opens at {{ as_timestamp(states('sensor.disney_adventure_world_opening_time')) | timestamp_custom('%H:%M') }}.
```

{% endraw %}

## Known limitations

The Disneyland Paris integration currently has no known limitations.

## Troubleshooting

The Disneyland Paris integration relies on an active internet connection to update entities.
If you encounter issues, verify that your network connection is stable.
Additionally, the Disneyland Paris service itself may experience downtime, whether unexpected or due to scheduled maintenance.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
