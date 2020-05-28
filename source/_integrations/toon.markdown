---
title: Toon
description: Instructions on how to integrate Toon within Home Assistant.
ha_category:
  - Climate
  - Binary Sensor
  - Energy
  - Sensor
ha_release: 0.56
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: toon
---

The `toon` integration platform can be used to control your Toon thermostat. This integration adds a climate device for your Toon thermostat, sensors for power and gas consumption, sensors for solar production and several binary sensors for things like boiler burner on/off, hot tap water and boiler health status.

For the `toon` integration to work, you'll need an active Toon subscription with Eneco and a Toon API developer account.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- [Climate](#climate)
- Sensor

## Setting up a developer account

In order to be able to use this component, you'll need to sign up for a free Toon API developer account.

1. Visit the [Toon API developers website](https://developer.toon.eu/), and [sign in](https://developer.toon.eu/user/login). [Create an account](https://developer.toon.eu/user/register) if you don’t have one already.
2. Open the "[My Apps](https://developer.toon.eu/user/me/apps)" page and click on "Add a new App" button on the top right.
3. The "Add App" page shows a form with two fields:
   - **App Name**: Can be anything you like, for example, "Home Assistant" will just do.
   - **Callback URL**: Fill in `localhost` in this field.
4. Click on "Create App" to complete the creation process.
5. Open the "[My Apps](https://developer.toon.eu/user/me/apps)" page again and click on the app that you've just created.
6. You need the codes now shown: "Consumer Key" and "Consumer Secret".
7. Add the Toon integration to your `configuration.yaml` and restart Home Assistant. Then, go to `Configuration > Integrations` and select `CONFIGURE` next to Toon and follow the setup instructions.

## Configuration

To use your Toon in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
toon:
  client_id: YOUR_CONSUMER_KEY
  client_secret: YOUR_CONSUMER_SECRET
```

{% configuration %}
client_id:
  description: Toon API Consumer Key.
  required: true
  type: string
client_secret:
  description: Toon API Consumer Secret.
  required: true
  type: string
scan_interval:
  description: The rate in seconds at which Toon should be polled for new data.
  required: false
  type: integer
  default: 300
{% endconfiguration %}

## Climate

The `toon` climate platform allows you to interact with your Toon thermostat.

Home Assistant support the four Toon presets: `Comfort`, `Home`, `Away` and `Sleep`.
It also supports setting the temperature manually.

## Services

### Service `update`

Updates ententies from Toon with fresh queried data.

| Service data attribute | Optional | Description                                 |
| ---------------------- | -------- | ------------------------------------------- |
| `display`              | Yes      | The display you wish to fetch updates from. |
