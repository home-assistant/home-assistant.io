---
title: HP Printer
description: Instructions on how to integrate HP printers into Home Assistant.
ha_category:
  - Sensor
ha_release: '2026.11'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@chemelli74'
ha_domain: hp_printer
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **HP Printer** {% term integration %} connects Home Assistant to [HP](https://www.hp.com/) printers on your local network.

It reads the information the printer publishes through its built-in web server: the printer status, the ink or toner levels, and the page counters for printing, scanning, copying, and faxing. No cloud account is needed.

## Use cases

- Get notified when an ink or toner cartridge is running low, so you can order a replacement in time.
- Get notified when the paper tray is empty.
- Track how many pages you print, scan, and copy over time, for example to compare color and black and white usage.

## Supported devices

The integration works with HP printers that have a built-in web server (the page that opens when you enter the printer's IP address in a browser) and report their data through it.

The following printers are known to work:

- HP Color LaserJet M255dw
- HP ENVY Photo 7830 All-in-One
- HP OfficeJet Pro 9022e

Which sensors are created depends on the printer model. For example, a printer without a scanner or fax does not get the scanner or fax sensors.

## Unsupported devices

The following devices are not supported:

- Printers that are only connected over USB, without a network connection.
- Printers whose built-in web server only answers over HTTPS.
- Printers that do not report a serial number.

## Prerequisites

1. Connect the printer to your network.
2. Find the printer's IP address. You can usually print it from the printer's control panel, for example in the network settings or by printing a network configuration page.
3. Optional, but recommended: in your router, give the printer a fixed IP address, so it does not change after a restart.
4. Check that the printer's built-in web server is reachable: in a browser, open `http://<printer IP address>/DevMgmt/ProductStatusDyn.xml`, replacing `<printer IP address>` with your printer's IP address. The browser should show an XML document.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your printer. For example, `192.168.1.12`."
{% endconfiguration_basic %}

## Supported functionality

Each printer is added as a device in Home Assistant, with the following entities.
Some entities are disabled by default. To use them, [enable them](/common-tasks/general/#enabling-entities) first.

### Sensors

- **Status**
  - **Description**: What the printer is currently doing.
  - **Values**: Canceling job, Copying, Power save, Off, Printing, Ready, Scanning, Paper tray empty.
  - **Remarks**: If the printer reports a status that is not in this list, the sensor shows as unknown.
- **Cyan level**, **Magenta level**, **Yellow level**, **Black level**, **Tri-color level**
  - **Description**: Estimated ink or toner remaining in the cartridge (in percent %).
  - **Remarks**: One sensor is created for each cartridge the printer reports. Tri-color is used for combined cyan, magenta, and yellow cartridges.
- **Cyan pages remaining**, **Magenta pages remaining**, **Yellow pages remaining**, **Black pages remaining**, **Tri-color pages remaining**
  - **Description**: Estimated number of pages the cartridge can still print.
  - **Remarks**: Only created when the printer reports this estimate. Many inkjet printers don't.
- **Printed pages**
  - **Description**: Total number of pages printed.
- **Printed black and white pages**
  - **Description**: Number of pages printed in black and white.
- **Printed color pages**
  - **Description**: Number of pages printed in color.
- **Printed single-sided sheets**
  - **Description**: Number of sheets printed on one side.
  - **Remarks**: Disabled by default.
- **Printed double-sided sheets**
  - **Description**: Number of sheets printed on both sides.
  - **Remarks**: Disabled by default.
- **Paper jams**
  - **Description**: Number of paper jams while printing. Shown as diagnostic information on the device page.
- **Paper mispicks**
  - **Description**: Number of times the printer failed to pick up a sheet of paper. Shown as diagnostic information on the device page.
  - **Remarks**: Disabled by default.
- **Scanned pages**
  - **Description**: Total number of pages scanned.
- **Scanned pages from document feeder**
  - **Description**: Number of pages scanned from the automatic document feeder.
  - **Remarks**: Disabled by default.
- **Scanned pages from glass**
  - **Description**: Number of pages scanned from the scanner glass.
  - **Remarks**: Disabled by default.
- **Scanned double-sided sheets**
  - **Description**: Number of sheets scanned on both sides.
  - **Remarks**: Disabled by default.
- **Scanner jams**
  - **Description**: Number of paper jams in the document feeder. Shown as diagnostic information on the device page.
  - **Remarks**: Disabled by default.
- **Scanner mispicks**
  - **Description**: Number of times the document feeder failed to pick up a sheet of paper. Shown as diagnostic information on the device page.
  - **Remarks**: Disabled by default.
- **Copied pages**
  - **Description**: Total number of pages copied.
- **Faxed pages**
  - **Description**: Total number of pages faxed.

## Data updates

The **HP Printer** integration {% term polling polls %} the printer every minute.

When the printer is switched off or cannot be reached, its entities become unavailable. They recover on the next update after the printer is back online.

## HP Printer automation examples

The sensors of this integration are a good basis for supply and maintenance automations.
Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when the ink is running low

Send a notification to your phone when the black cartridge drops below 10%, so you can order a new one in time.

- **Trigger**: When the black level drops below 10%
  - **Target**: Black level (`sensor.office_printer_black_level`)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying when the ink is running low" %}

{% example %}
automation: |
  alias: "Notify when the printer ink is running low"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.office_printer_black_level
      below: 10
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The black cartridge of the printer is at
          {{ states('sensor.office_printer_black_level') }}%.
{% endexample %}

{% enddetails %}

### Automation: Notify when the paper tray is empty

Send a notification to your phone when the printer runs out of paper.

- **Trigger**: When the status changes to Paper tray empty
  - **Target**: Status (`sensor.office_printer_status`)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying when the paper tray is empty" %}

{% example %}
automation: |
  alias: "Notify when the printer paper tray is empty"
  triggers:
    - trigger: state
      entity_id: sensor.office_printer_status
      to: "tray_empty"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The printer is out of paper."
{% endexample %}

{% enddetails %}

## Known limitations

- The integration is read-only. It cannot manage print jobs or change printer settings.
- The integration connects over HTTP on port 80. Printers that only accept HTTPS are not supported.
- Printheads are not shown as consumables.
- If the printer's IP address changes, remove the integration and add it again with the new address.

## Troubleshooting

### Can't set up the printer

#### Symptom: "Failed to connect" during setup

When trying to set up the integration, the form shows a message that it failed to connect.

#### Description

Home Assistant could not read the printer's information from its built-in web server.

#### Resolution

1. Make sure the printer is switched on and connected to the network.
2. In a browser, open `http://<printer IP address>/DevMgmt/ProductStatusDyn.xml`, replacing `<printer IP address>` with your printer's IP address.
   - If the page does not load, check the IP address and make sure Home Assistant and the printer are on the same network.
   - If the page loads but shows no XML document, your printer model is not supported.

### Entities are unavailable

#### Symptom: All the printer's entities show as unavailable

#### Description

The printer did not respond to the last update. This is expected while the printer is switched off. Some printers also stop responding when they go into a deep sleep mode.

#### Resolution

1. Switch on the printer. The entities recover within a minute.
2. If the printer has an auto-off or deep sleep setting, consider changing it in the printer's settings.
3. If the printer's IP address has changed, remove the integration and add it again with the new address.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
