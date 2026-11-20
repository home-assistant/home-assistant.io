---
description: Instructions on how to integrate Moulinex Cookeo multicookers with Home Assistant.
ha_release: 2026.12
ha_domain: moulinex
---

The **Moulinex** {% term integration %} lets you follow your connected [Moulinex](https://www.moulinex.com) Cookeo multicooker from Home Assistant. You can see what the appliance is doing, which program is running, and how far the preheating or the pressure release has progressed.

The integration connects to the cloud service of the appliance's mobile app with your account, and the appliance pushes its state as it changes. The same appliances are sold under the Tefal and Krups brands in some countries, and those accounts work too.

With your Cookeo in Home Assistant, you can get a notification when your meal has been kept warm for a while, turn on the range hood while the appliance releases its pressure, or show the cooking state on a kitchen dashboard.

## Supported devices

The following devices are known to be supported:

- Cookeo Touch WiFi
- Cookeo Touch Pro WiFi
- Cookeo Touch Mini WiFi
- Cookeo Infinity

Other Cookeo models that connect to Wi-Fi and are added to your account in the app, such as the Cookeo Wi-Fi 8-in-1, 9-in-1, and 10-in-1, are expected to work but have not been tested. The same goes for the connected Companion, which uses the same cloud service.

## Unsupported devices

- Cookeo models that only connect to the app over Bluetooth, such as the Cookeo Connect.

## Prerequisites

Your appliance must be connected to Wi-Fi and added to your account in the mobile app of its brand. You need the email address and the password of that account.

{% include integrations/config_flow.md %}

Home Assistant can also discover the appliance on your network and suggest the integration. You still log in with your account to finish the setup.

{% configuration_basic %}
Region:
  description: "The brand and country you selected when you created the account, for example **Moulinex (France)**. An account only works with its own region."
Email:
  description: "The email address of the account you use in the app of your appliance."
Password:
  description: "The password of that account. Home Assistant only uses it to log in and does not store it."
{% endconfiguration_basic %}

After setup, Home Assistant creates one {% term device %} for each compatible appliance of your account.

## Supported functionality

### Sensors

Each appliance provides the following sensors:

- **State**: What the appliance is doing, such as preheating, cooking, releasing the pressure, or keeping the food warm. It is idle when the appliance is on and nothing is running. This is the main sensor of the device, so it carries the name of the appliance.
- **Program**: The program that is selected or running, such as **High pressure** or **Browning**. It is unknown when no program is selected.
- **Progress**: The progress of the preheating and of the pressure release, as a percentage. It is unknown during the rest of the program.

## Examples

Here are a few ways to use your Cookeo in automations. Replace `sensor.cookeo` with the state sensor of your appliance.

### Notify when the meal has been kept warm for a while

When the cooking is finished, the Cookeo keeps the food warm. This automation sends a notification to your phone when that has lasted 30 minutes, so the meal is not forgotten.

```yaml
automation:
  - alias: "Notify when the Cookeo has kept the meal warm for 30 minutes"
    triggers:
      - trigger: state
        entity_id: sensor.cookeo
        to: "keep_warm"
        for:
          minutes: 30
    actions:
      - action: notify.mobile_app_phone
        data:
          message: "The Cookeo has been keeping your meal warm for 30 minutes."
```

### Turn on the range hood during the pressure release

At the end of a pressure cooking, the Cookeo releases a lot of steam. This automation turns on the range hood when the pressure release starts, and turns it off again when it is over.

```yaml
automation:
  - alias: "Run the range hood while the Cookeo releases its pressure"
    triggers:
      - trigger: state
        entity_id: sensor.cookeo
        to: "depressurization"
    actions:
      - action: fan.turn_on
        target:
          entity_id: fan.range_hood
      - wait_for_trigger:
          - trigger: state
            entity_id: sensor.cookeo
            from: "depressurization"
      - action: fan.turn_off
        target:
          entity_id: fan.range_hood
```

## Data updates

The appliance pushes its state to Home Assistant as soon as it changes, so there is no {% term polling %}. When Home Assistant starts, or when the appliance comes back online, the integration asks the appliance for its current state.

## Known limitations

- The integration only reports what the appliance is doing. You cannot start, stop, or configure a program from Home Assistant.
- The sensors are unavailable while the appliance is turned off or not connected to Wi-Fi.
- The appliance reports its progress in steps of about 5%, so the **Progress** sensor can stay on the same value for a few minutes at the beginning of the preheating.

## Troubleshooting

### The sensors show as unavailable

The appliance is turned off, unplugged, or out of reach of your Wi-Fi. The sensors come back a few seconds after the appliance is back online. It can take up to 30 seconds for Home Assistant to notice that an appliance was unplugged.

### The email or password is refused

Check that you selected the region of your account. An account created for one brand and country is not known in another region, even when the email and the password are correct.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
