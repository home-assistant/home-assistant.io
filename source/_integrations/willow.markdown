---

title: Willow
description: Integrate Willow plant monitoring sensors into Home Assistant.
ha_category:

* Sensor
  ha_release: "2026.XX"
  ha_iot_class: Cloud Polling
  ha_config_flow: true
  ha_domain: willow
  ha_codeowners:
* "@PlantWithWillow"

---

The Willow integration allows you to monitor the health of your indoor plants in Home Assistant using Willow sensors.

Willow sensors periodically collect environmental and soil measurements and upload them to the Willow cloud platform. Home Assistant retrieves this information from the Willow cloud service, allowing you to visualize plant conditions and create automations based on sensor readings.

## Prerequisites

Before setting up the integration, you will need:

* A Willow account
* At least one Willow sensor paired with your account
* An active internet connection

## Supported devices

The integration supports:

* Willow Sensor

## Supported entities

Each Willow sensor creates the following entities in Home Assistant:

| Entity       | Description                            |
| ------------ | -------------------------------------- |
| Temperature  | Ambient temperature around the plant   |
| Humidity     | Ambient relative humidity              |
| Moisture     | Soil moisture level                    |
| Illuminance  | Light exposure in lux                  |
| Battery Life | Sensor battery percentage              |
| Last Reading | Timestamp of the latest sensor reading |

## Configuration

To add Willow to your Home Assistant instance:

1. In Home Assistant, go to **Settings** > **Devices & Services**.
2. Select **Add Integration**.
3. Search for **Willow**.
4. Follow the OAuth authentication flow and sign in to your Willow account.
5. Grant Home Assistant access to your Willow devices.
6. Complete the setup process.

After authentication completes, Home Assistant will automatically discover and create entities for all Willow sensors associated with your account.

## Data updates

Willow uses cloud polling to retrieve the latest sensor readings.

Sensor data is refreshed approximately every **15 minutes**.

## Automations

Willow entities can be used in automations and scripts like any other Home Assistant sensor.

Example automation trigger:

```yaml
trigger:
  - platform: numeric_state
    entity_id: sensor.ficus_moisture
    below: 30
```

This can be used to send a notification when a plant requires watering.

## Limitations

* A cloud connection is required for operation.
* Historical sensor data stored in the Willow platform is not exposed through this integration.
* If a Willow sensor goes offline, Home Assistant retains the last successfully retrieved values until new data becomes available.

## Troubleshooting

### Reauthentication required

If Home Assistant can no longer access your Willow account, a reauthentication flow may be required.

Navigate to:

**Settings** > **Devices & Services** > **Willow**

and follow the prompts to reconnect your account.

### Missing sensor data

If sensors stop updating:

1. Verify the sensor is connected in the Willow application.
2. Confirm the sensor has sufficient battery.
3. Check that your Willow account can access the device.
4. Reload the integration from the Devices & Services page.
