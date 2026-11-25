---
title: Bambu Lab
description: Instructions on how to follow your Bambu Lab 3D printer in Home Assistant, over your local network.
ha_release: 2027.1
ha_categories:
  - computers_network.printers
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - "@joostlek"
  - "@piitaya"
ha_domain: bambu_lab
ha_integration_type: device
ha_platforms:
  - sensor
ha_quality_scale: bronze
related:
  - docs: /docs/automation/
    title: Automations
  - url: https://bambulab.com
    title: Bambu Lab
---

The **Bambu Lab** {% term integration %} lets you follow your [Bambu Lab](https://bambulab.com) 3D printer in Home Assistant. You can see what the printer is doing, how far along the print is, when it will finish, and the temperatures of the bed and the chamber.

The integration talks directly to the printer over your local network. It does not use the Bambu Lab cloud, and the printer sends its updates to Home Assistant as soon as something changes. For example, you can get a notification on your phone the moment a print finishes, or when the printer pauses a print and needs your attention.

## Supported devices

The integration works with Bambu Lab 3D printers that are connected to your local network. These models are known to the integration:

- A1
- A1 mini
- A2L
- H2C
- H2D
- H2D Pro
- H2S
- H3C
- P1P
- P1S
- P2S
- X1 Carbon
- X1E
- X2D

## Prerequisites

To set up the integration, you need three things from your printer. You can find all of them on the screen of the printer.

1. Make sure the printer is connected to the same network as Home Assistant.
2. Write down the IP address of the printer.
3. Write down the serial number of the printer.
4. Write down the LAN access code of the printer.

The printer does not have to be in LAN only mode.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your printer. For example, `192.168.1.50`. You can find it on the screen of your printer, or in your router."
Serial number:
  description: "The serial number of your printer. You can find it on the screen of your printer. It is not case sensitive."
Access code:
  description: "The LAN access code of your printer. You can find it on the screen of your printer."
{% endconfiguration_basic %}

Before Home Assistant sends the access code, it checks that the device at the address you entered is a Bambu Lab printer with the serial number you entered.

## Supported functionality

The **Bambu Lab** integration adds your printer as a device, with the following entities.

### Sensors

- **Print status**
  - **Description**: What the printer is doing.
  - **Options**: Idle, Initializing, Slicing, Preparing, Printing, Paused, Finished, Failed
  - **Available for printers**: all
- **Print progress**
  - **Description**: How far along the current print is, in percent.
  - **Available for printers**: all
- **Print finish**
  - **Description**: The date and time the current print is expected to finish.
  - **Available for printers**: all
  - **Remarks**: Calculated from the remaining time the printer reports. Only has a value while the printer is preparing, printing, or paused. To keep the value steady, it only changes when the estimate moves by two minutes or more.
- **Current layer**
  - **Description**: The layer the printer is printing.
  - **Available for printers**: all
- **Total layers**
  - **Description**: The number of layers of the current print.
  - **Available for printers**: all
- **Bed temperature**
  - **Description**: The temperature of the bed.
  - **Available for printers**: all
- **Chamber temperature**
  - **Description**: The temperature inside the chamber of the printer.
  - **Available for printers**: Printers that measure the temperature of their chamber. The A1, A1 mini, A2L, P1P, and P1S do not have this sensor.

## Bambu Lab automation examples

Because the printer tells Home Assistant right away when its status changes, you can act on it the moment something happens. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Get a notification when a print finishes

Get a message on your phone when your print is done, so you can take it off the bed.

- **Trigger**: State of **Print status** changes to **Finished**
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification when a print finishes" %}

{% example %}
automation: |
  alias: "Notify when the print finishes"
  triggers:
    - trigger: state
      entity_id: sensor.p1s_print_status
      to: finished
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Your print is done.
{% endexample %}

{% enddetails %}

### Automation: Get a notification when a print pauses

A printer can pause a print by itself, for example when it runs out of filament. Get a message on your phone, so you can check on the printer.

- **Trigger**: State of **Print status** changes to **Paused**
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification when a print pauses" %}

{% example %}
automation: |
  alias: "Notify when the print pauses"
  triggers:
    - trigger: state
      entity_id: sensor.p1s_print_status
      to: paused
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Your print is paused. Check on your printer.
{% endexample %}

{% enddetails %}

## Data updates

The integration keeps a connection open to the printer, and the printer pushes its status to Home Assistant whenever something changes. There is no {% term polling %}.

When the connection to the printer is lost, for example because the printer is turned off, the entities become unavailable. The integration keeps trying to connect again, and the entities come back as soon as the printer is reachable.

## Known limitations

- The integration follows what the printer is doing. It cannot control the printer yet, like pausing a print or switching the light.
- The integration does not show the camera of the printer yet.
- Home Assistant does not find printers on your network by itself yet. You enter the IP address and serial number yourself.
- If the access code of the printer changes, the integration can no longer connect. Remove the printer from Home Assistant, and add it again with the new access code.
- If the IP address of the printer changes, the integration can no longer connect. To prevent this, give the printer a fixed IP address in your router. Otherwise, remove the printer from Home Assistant, and add it again with the new address.

## Troubleshooting

{% details "The printer can't be reached" %}

### Symptom: "Failed to connect"

When you try to set up the integration, the form shows the message "Failed to connect".

#### Description

Home Assistant cannot reach the printer at the address you entered.

#### Resolution

1. Make sure the printer is turned on and connected to your network.
2. Check the IP address on the screen of the printer, and make sure it matches what you entered.
3. Make sure Home Assistant and the printer are on the same network, or that your network allows connections from Home Assistant to the printer on port 8883.

{% enddetails %}

{% details "The access code is not accepted" %}

### Symptom: "Invalid authentication"

When you try to set up the integration, the form shows the message "Invalid authentication".

#### Description

The printer rejected the access code.

#### Resolution

1. Check the LAN access code on the screen of the printer.
2. Enter the code again.

{% enddetails %}

{% details "The serial number doesn't match" %}

### Symptom: "The printer at this address has a different serial number"

When you try to set up the integration, the form shows the message "The printer at this address has a different serial number. Check the host and the serial number."

#### Description

There is a Bambu Lab printer at the address you entered, but it is a different printer than the serial number you entered. This can happen when you have more than one printer, or when the printer got a new IP address.

#### Resolution

1. On the screen of the printer you want to add, check its IP address and serial number.
2. Enter both again.

{% enddetails %}

{% details "The device at the address is not a Bambu Lab printer" %}

### Symptom: "The device at this address did not identify itself as a Bambu Lab printer"

When you try to set up the integration, the form shows the message "The device at this address did not identify itself as a Bambu Lab printer. Check the host."

#### Description

Something answered at the address you entered, but it is not a Bambu Lab printer. The integration only sends the access code to a device that proves it is a Bambu Lab printer.

#### Resolution

1. Check the IP address on the screen of the printer.
2. Enter the address again.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
