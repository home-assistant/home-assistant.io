---
description: Instructions on how to track bike, scooter and car share stations that publish General Bikeshare Feed Specification (GBFS) data.
ha_release: 2026.12
ha_domain: gbfs
---

The **General Bikeshare Feed Specification (GBFS)** {% term integration %} shows how many vehicles and free docks are at the bike, scooter and car share stations you care about. It works with any system that publishes a [GBFS](https://gbfs.org/) feed, the open standard used by about 1,300 shared mobility systems around the world.

Use it to see whether there's a bike at the station outside your door before you leave, or to get a notification when the e-bikes at your usual station run out.

## Prerequisites

You need the URL of the system's GBFS auto-discovery file, usually ending in `gbfs.json`. To find it:

- Check the operator's developer or open data page.
- Look the system up in MobilityData's [list of GBFS systems](https://github.com/MobilityData/gbfs/blob/master/systems.csv). The **Auto-Discovery URL** column has the URL.

Most systems need no account or API key.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "The system's GBFS auto-discovery URL, usually ending in `gbfs.json`."
{% endconfiguration_basic %}

## Adding stations

Each system can track as many stations as you like. To add a station:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **General Bikeshare Feed Specification (GBFS)** integration.
2. Next to the system, select **Add station**.
3. Select the station. The stations closest to your home are listed first, with their distance.

Each station becomes a device with its own sensors.

## Supported functionality

### Sensors

Each station has these sensors:

| Sensor | Description |
|---|---|
| **Vehicles available** | All vehicles available to rent at the station. |
| **Docks available** | Free docks to return a vehicle to. Not created for virtual stations without docks. |

If the system publishes its vehicle types, each station also gets a sensor for each kind of vehicle the system rents:

| Sensor | Counts |
|---|---|
| **Classic bikes** | Bikes without a motor |
| **E-bikes** | Bikes with an electric motor |
| **Cargo bikes** | Cargo bikes, with or without a motor |
| **Scooters** | Standing and seated kick scooters |
| **Mopeds** | Mopeds |
| **Cars** | Cars |
| **Other vehicles** | Vehicles the system lists as another type |

A station's sensors become unavailable when the station is removed from the feed or the operator reports it as not installed.

## Data updates

The integration {% term polling polls %} the system every 60 seconds. The GBFS standard requires operators to publish data that is at most 5 minutes old.

## Examples

### Notify me when the e-bikes run out

```yaml
automation:
  - alias: "No e-bikes at my station"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.main_st_1st_ave_e_bikes
        below: 1
    actions:
      - action: notify.mobile_app_my_phone
        data:
          message: "There are no e-bikes left at Main St & 1st Ave."
```

## Known limitations

- Only stations are supported. Free-floating vehicles that aren't parked at a station aren't tracked yet, and systems with no stations can't be added.
- Systems whose feeds need an API key aren't supported yet.

## Troubleshooting

### The URL is rejected as not a valid GBFS feed

Make sure you entered the auto-discovery URL (`gbfs.json`), not the URL of one of the files it lists, such as `station_status.json`.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
