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
  - button
  - camera
  - diagnostics
  - light
  - select
  - sensor
ha_quality_scale: bronze
related:
  - url: https://bambulab.com
    title: Bambu Lab
---

The **Bambu Lab** {% term integration %} lets you monitor your [Bambu Lab](https://bambulab.com) 3D printer in Home Assistant. It connects to the printer over your local network and does not use the Bambu Lab cloud.

Use it to see how far along a print is from your dashboard, to get a notification when a print finishes, pauses, or fails, or to pause a print from an automation.

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

Other Bambu Lab printers that have an access code for local connections may work as well. Home Assistant then names them after the model name the printer reports, or after the serial number if the printer reports no model name.

{% note %}
The integration is built from the community documentation of how the printers communicate, and not every model in this list has been verified by an owner. If your printer does not work as described on this page, [report an issue](https://github.com/home-assistant/core/issues).
{% endnote %}

## Prerequisites

Before you start, you need the access code of your printer. You can find it on the screen of your printer.

Home Assistant can search for the printers on your network. If it does not find yours, you also need the following from your printer:

- The IP address of the printer.
- The serial number of the printer. This is not the name of the printer.

You can find both on the screen of your printer.

Give the printer a fixed IP address in your router, so its address does not change.

Your printer does not have to be in LAN only mode. It can stay connected to the Bambu Lab cloud.

To control a print from Home Assistant, for example to pause it or to change its speed, a printer with recent firmware has to be in developer mode. Developer mode needs LAN only mode, which disconnects the printer from the Bambu Lab cloud. Without developer mode, Home Assistant can still monitor the printer and control its light. Bambu Lab explains [how to turn on developer mode](https://wiki.bambulab.com/en/knowledge-sharing/enable-lan-mode).

To see the camera of a printer that has a video stream, turn on the setting that lets the printer serve the stream on your network. On the screen of the printer, this setting is called LAN only liveview or similar, depending on the model. The A1 and P1 series and the A2L do not need this.

{% include integrations/config_flow.md %}

When you add the integration, you choose how to find your printer:

- **Search for printers on the network**: Home Assistant listens for the printers that announce themselves on your network, which takes a few seconds. You then only enter the access code. If the search finds more than one printer, you first select the one to set up.
- **Enter the details of the printer**: You enter the address, the serial number, and the access code yourself.

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your printer. For example, `192.168.1.50`. The printer shows its IP address on its screen."
Serial number:
  description: "The serial number of your printer, which it shows on its screen. Home Assistant uses it to make sure that it connects to the right printer."
Access code:
  description: "The access code of your printer, which it shows on its screen."
{% endconfiguration_basic %}

## Supported functionality

The **Bambu Lab** integration provides the following entities.

### Buttons

- **Pause print**
  - **Description**: Pauses the print job.
  - **Available for printers**: all
  - **Remarks**: Only available while the printer is printing.
- **Resume print**
  - **Description**: Resumes a paused print job.
  - **Available for printers**: all
  - **Remarks**: Only available while the print job is paused.
- **Stop print**
  - **Description**: Stops the print job. A stopped print job cannot be resumed.
  - **Available for printers**: all
  - **Remarks**: Only available while the printer is printing, or while the print job is paused.

The buttons are unavailable when the printer only accepts commands in developer mode, and developer mode is off.

### Cameras

- **Camera**
  - **Description**: The camera inside the printer.
  - **Available for printers**: all printers with a camera
  - **Remarks**: The A1 and P1 series and the A2L send a new image every second or two, so the camera shows images, not video. The other printers serve a video stream, which you have to turn on on the printer, as described in the [prerequisites](#prerequisites).

### Lights

- **Chamber light**
  - **Description**: The light inside the printer. You can turn it on and off.
  - **Available for printers**: Printers that report a chamber light.

### Selects

- **Print speed**
  - **Description**: The speed profile of the printer.
  - **Options**: Silent, Standard, Sport, Ludicrous
  - **Available for printers**: all
  - **Remarks**: Only available while the printer is printing. Unavailable when the printer only accepts commands in developer mode, and developer mode is off.

### Sensors

- **Print status**
  - **Description**: What the printer is doing with its print job: Idle, Initializing, Slicing, Preparing, Printing, Paused, Finished, or Failed.
  - **Available for printers**: all
- **Print progress**
  - **Description**: How far along the print job is, as a percentage.
  - **Available for printers**: all
- **Print finish**
  - **Description**: The date and time the printer expects to finish the print job. The value is only known while a print job is in progress.
  - **Available for printers**: all
- **Current layer**
  - **Description**: The layer the printer is printing.
  - **Available for printers**: all
- **Total layers**
  - **Description**: The number of layers in the print job.
  - **Available for printers**: all
- **Nozzle temperature**
  - **Description**: The current temperature of the nozzle, in whole degrees.
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

- You cannot start a print, and you cannot control the fans or the temperatures.
- A printer with recent firmware only lets Home Assistant pause, resume, or stop a print, or change its speed, while it is in developer mode.
- The integration has no entities for the Automatic Material System (AMS).
- Home Assistant does not tell you when it sees a new printer. You start the search yourself when you add the integration.
- The search only finds printers on the same network as Home Assistant.
- When you change the IP address or the access code of the printer, remove the printer from Home Assistant and add it again.

## Troubleshooting

{% details "The search does not find the printer" %}

### Symptom: "No printers were found on your network"

When you search for printers, the form shows the message "No printers were found on your network. Enter the details of your printer."

#### Description

A printer announces itself to the devices on its own network. Home Assistant cannot hear it when the printer is on another network or VLAN, or when Home Assistant runs in a container without access to the network of its host. The search also leaves out the printers that are already set up.

#### Resolution

1. Make sure the printer is turned on and connected to your network.
2. Enter the IP address, the serial number, and the access code of the printer in the form. Setting up a printer this way works across networks.

{% enddetails %}

{% details "Can't set up the printer: Failed to connect" %}

### Symptom: "Failed to connect"

When you try to set up the integration, the form shows the message "Failed to connect".

#### Description

Home Assistant cannot reach the printer at the address you entered, or the printer did not answer in time.

#### Resolution

1. Make sure the printer is turned on and connected to your network.
2. Check that the **Host** you entered is the IP address the printer shows on its screen.
3. Make sure Home Assistant can reach the printer on TCP port 8883. If the printer is in a different network than Home Assistant, allow this port in your firewall.

{% enddetails %}

{% details "Can't set up the printer: The device did not identify itself as a Bambu Lab printer" %}

### Symptom: "The device at this address did not identify itself as a Bambu Lab printer"

When you try to set up the integration, the form shows the message "The device at this address did not identify itself as a Bambu Lab printer. Check the host."

#### Description

Home Assistant reached a device at the address you entered, but could not verify that it is a Bambu Lab printer. Home Assistant does not send the access code to a device it cannot verify.

#### Resolution

1. Check that the **Host** you entered is the IP address the printer shows on its screen.
2. If the address is right, your printer may be a model that the integration does not know yet. [Report an issue](https://github.com/home-assistant/core/issues), and mention the model of your printer.

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

{% details "Can't set up the printer: The printer at this address has a different serial number" %}

### Symptom: "The printer at this address has a different serial number"

When you try to set up the integration, the form shows the message "The printer at this address has a different serial number. Check the host and the serial number."

#### Description

Home Assistant reached a Bambu Lab printer at the address you entered, but it is not the printer with the serial number you entered. Home Assistant does not send the access code to a printer it does not expect.

#### Resolution

1. Check the serial number on the screen of your printer. The serial number is not the name of the printer.
2. If you have more than one printer, check that the **Host** you entered is the IP address of the printer you want to add.

{% enddetails %}

{% details "The buttons or the print speed are unavailable" %}

### Symptom: The buttons or the print speed are unavailable, while the sensors work

The sensors of the printer show values, but **Pause print**, **Resume print**, **Stop print**, or **Print speed** are unavailable.

#### Description

A button is only available when the printer can do what it asks: you cannot pause a print when the printer is not printing. **Print speed** is only available while the printer is printing. When they stay unavailable during a print, the printer only accepts commands in developer mode.

#### Resolution

1. Check the **Print status** sensor. **Pause print** needs it to be **Printing**, and **Resume print** needs it to be **Paused**.
2. If they stay unavailable during a print, turn on developer mode on your printer, as described in the [prerequisites](#prerequisites).

{% enddetails %}

{% details "The camera is unavailable or shows no image" %}

### Symptom: The camera is unavailable, or shows no image, while the sensors work

The sensors of the printer show values, but the **Camera** is unavailable or does not show an image.

#### Description

A printer with a video stream only serves it on your network when that is turned on on the printer. The other printers send images over a separate connection, on TCP port 6000.

#### Resolution

1. If your printer has a video stream, turn on the setting for it on the printer, as described in the [prerequisites](#prerequisites). The camera becomes available right away.
2. Make sure Home Assistant can reach the printer on TCP port 322 for a video stream, or on TCP port 6000 for images. If the printer is in a different network than Home Assistant, allow this port in your firewall.

{% enddetails %}

{% details "The sensors stay unavailable while the printer is on" %}

### Symptom: The sensors stay unavailable, although the printer is on

The sensors of the printer worked before, but now they stay unavailable while the printer is turned on and connected to your network. After a restart of Home Assistant, the integration shows that it could not be set up.

#### Description

The IP address of the printer changed, or the access code that Home Assistant stored no longer works, for example because the printer created a new one.

#### Resolution

1. Check the IP address and the access code on the screen of your printer.
2. If only the IP address changed, give the printer its previous IP address back in your router. Home Assistant connects again by itself, and the sensors show values again.
3. If the access code changed, go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Bambu Lab** integration.
4. Remove the printer, as described in [Removing the integration](#removing-the-integration).
5. Add the printer again with the current IP address and access code.
   - Result: The sensors show values again.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
