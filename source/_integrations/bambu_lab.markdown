---
title: Bambu Lab
description: Instructions on how to integrate Bambu Lab 3D printers with Home Assistant.
ha_release: 2026.12
ha_categories:
  - computers_network.printers
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - "@joostlek"
ha_domain: bambu_lab
ha_integration_type: device
ha_platforms:
  - sensor
ha_quality_scale: bronze
related:
  - url: https://bambulab.com
    title: Bambu Lab
---

The **Bambu Lab** {% term integration %} lets you follow your [Bambu Lab](https://bambulab.com) 3D printer in Home Assistant. It connects to the printer over your local network and does not use the Bambu Lab cloud.

Use it to see how far along a print is from your dashboard, or to get a notification when a print finishes, pauses, or fails.

## Supported devices

The integration recognizes the following Bambu Lab printers:

- A1 and A1 mini
- A2L
- H2C, H2D, H2D Pro, and H2S
- H3C
- P1P and P1S
- P2S
- X1 Carbon and X1E
- X2D

Other Bambu Lab printers that have an access code for local connections may work as well. Home Assistant then shows them with the model name the printer reports.

{% note %}
The integration is built from the community documentation of how the printers communicate. If your printer does not work as described on this page, [report an issue](https://github.com/home-assistant/core/issues).
{% endnote %}

## Prerequisites

Before you start, you need the following from your printer:

- The IP address of the printer. Give the printer a fixed IP address in your router, so Home Assistant can still find it after your network restarts.
- The serial number of the printer. This is not the name of the printer.
- The access code of the printer.

You can find all three on the screen of your printer.

Your printer does not have to be in LAN only mode. Home Assistant can follow the printer while it stays connected to the Bambu Lab cloud and the Bambu Handy app.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The IP address or hostname of your printer. For example, `192.168.1.50`."
Serial number:
    description: "The serial number of your printer. Home Assistant uses it to make sure that it connects to the right printer."
Access code:
    description: "The access code of your printer, which it shows on its screen."
{% endconfiguration_basic %}

## Supported functionality

The **Bambu Lab** integration provides the following entities.

### Sensors

- **Print status**
  - **Description**: What the printer is doing with its print job: Idle, Initializing, Slicing, Preparing, Printing, Paused, Finished, Failed, or Offline.
  - **Available for printers**: all
- **Print progress**
  - **Description**: How far along the print job is, as a percentage.
  - **Available for printers**: all
- **Remaining time**
  - **Description**: The time the printer expects to need to finish the print job.
  - **Available for printers**: all
- **Current layer**
  - **Description**: The layer the printer is printing.
  - **Available for printers**: all
- **Total layers**
  - **Description**: The number of layers in the print job.
  - **Available for printers**: all
- **Nozzle temperature**
  - **Description**: The current temperature of the nozzle.
  - **Available for printers**: all
  - **Remarks**: On a printer with two nozzles, this is the temperature of the nozzle that is in use.
- **Bed temperature**
  - **Description**: The current temperature of the print bed.
  - **Available for printers**: all
- **Chamber temperature**
  - **Description**: The current temperature inside the printer.
  - **Available for printers**: Printers that measure the temperature of their chamber. The A1, A1 mini, A2L, P1P, and P1S do not.

## Data updates

The printer pushes its state to Home Assistant over your local network, so the sensors update as soon as something changes. Home Assistant does not poll the printer.

When the connection to the printer is lost, for example because the printer is turned off, the sensors become unavailable. Home Assistant keeps trying to connect, and the sensors come back when the printer does.

## Known limitations

- The integration only reads from the printer. You cannot start, pause, or stop a print, and you cannot control the light, the fans, or the temperatures.
- The integration has no entities for the camera or for the Automatic Material System (AMS).
- Home Assistant does not discover printers on your network. You add each printer yourself.
- When you change the IP address or the access code of the printer, remove the printer from Home Assistant and add it again.

## Troubleshooting

{% details "Can't set up the printer: Failed to connect" %}

### Symptom: "Failed to connect"

When you try to set up the integration, the form shows the message "Failed to connect".

#### Description

Home Assistant cannot reach the printer at the address you entered, or the printer did not answer in time.

#### Resolution

1. Make sure the printer is turned on and connected to your network.
2. Check that the **Host** you entered is the IP address the printer shows on its screen.
3. Make sure Home Assistant can reach the printer on TCP port 8883. If the printer is in a different network or VLAN than Home Assistant, allow this port in your firewall.

{% enddetails %}

{% details "Can't set up the printer: Invalid authentication" %}

### Symptom: "Invalid authentication"

When you try to set up the integration, the form shows the message "Invalid authentication".

#### Description

The printer rejected the access code.

#### Resolution

1. Check the access code on the screen of your printer.
2. Enter it again in Home Assistant.

{% enddetails %}

{% details "Can't set up the printer: The printer has a different serial number" %}

### Symptom: "The printer at this address has a different serial number"

When you try to set up the integration, the form shows the message "The printer at this address has a different serial number. Check the host and the serial number."

#### Description

Home Assistant reached a Bambu Lab printer at the address you entered, but it is not the printer with the serial number you entered. Home Assistant does not send the access code to a printer it does not expect.

#### Resolution

1. Check the serial number on the screen of your printer. The serial number is not the name of the printer.
2. If you have more than one printer, check that the **Host** you entered is the IP address of the printer you want to add.

{% enddetails %}

{% details "The sensors stay unavailable while the printer is on" %}

### Symptom: The sensors stay unavailable, although the printer is on

The sensors of the printer worked before, but now they stay unavailable while the printer is turned on and connected to your network. After a restart of Home Assistant, the integration shows that it could not be set up.

#### Description

The IP address of the printer changed, or the access code that Home Assistant stored no longer works, for example because the printer created a new one.

#### Resolution

1. Check the IP address and the access code on the screen of your printer.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Bambu Lab** integration.
3. Remove the printer, as described in [Removing the integration](#removing-the-integration).
4. Add the printer again with the current IP address and access code.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
