---
description: Instructions on how to integrate a Brother printer into Home Assistant.
ha_release: 0.104
ha_domain: brother
---

The **Brother Printer** {% term integration %} allows you to read current data from your local Brother printer.

It provides information about the printer's state, the amount of ink or toner left, and the remaining lifetime of the drum and other parts of the printer. The integration monitors every supported part.

## Supported devices

The integration supports Brother printers that expose their status over <abbr title="Simple Network Management Protocol">SNMP</abbr>. Both ink and laser printers are supported.

## Unsupported devices

The following devices are not supported by the integration:

- MFC-8660DN
- MFC-8860DN

## Prerequisites

The integration reads data from the printer over SNMP, so SNMP must be turned on in the printer.

1. Open the printer's web interface in a browser, for example `http://192.168.5.6`.
2. If the web interface asks for a password, sign in. For some printers, the default password is printed on a sticker on the back of the printer, preceded by **Pwd**. If there is no password on the sticker, the default password is `initpass`.
3. Go to **Network** > **Protocol** and turn on **SNMP**.
4. For some printers, you also need to select **SNMPv3 read-write access and v1/v2c read-only access** in the SNMP settings.

![SNMP settings on Brother Printer web interface](/images/integrations/brother/brother-printer-webui.png)

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The hostname or IP address of the Brother printer, for example `192.168.5.6`."
Printer type:
    description: "The type of the Brother printer: **Ink** or **Laser**."
Port:
    description: "The SNMP port of the Brother printer. Available under **Additional settings**. Defaults to `161`."
SNMP Community:
    description: "A simple password for devices to communicate to each other. Available under **Additional settings**. Defaults to `public`."
{% endconfiguration_basic %}

## Supported functionality

The **Brother Printer** integration provides the following entities.

### Binary sensors

- **Door open**
  - **Description**: Printer door is open
- **Input tray empty**
  - **Description**: Input tray is empty
  - **Remarks**: This entity is [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity)
- **Input tray missing**
  - **Description**: Input tray is missing
  - **Remarks**: This entity is disabled by default
- **Low ink**
  - **Description**: Ink level is low (ink printers only)
- **Low paper**
  - **Description**: Paper level is low
  - **Remarks**: This entity is disabled by default
- **Low toner**
  - **Description**: Toner level is low (laser printers only)
- **No ink**
  - **Description**: Ink is empty (ink printers only)
- **No paper**
  - **Description**: Paper is empty
- **No toner**
  - **Description**: Toner is empty (laser printers only)
- **Output tray full**
  - **Description**: Output tray is full
  - **Remarks**: This entity is disabled by default
- **Output tray near full**
  - **Description**: Output tray is almost full
  - **Remarks**: This entity is disabled by default
- **Output tray missing**
  - **Description**: Output tray is missing
  - **Remarks**: This entity is disabled by default
- **Paper jam**
  - **Description**: Paper is jammed
- **Preventive maintenance overdue**
  - **Description**: Preventive maintenance is overdue
  - **Remarks**: This entity is disabled by default
- **Service requested**
  - **Description**: Printer requests service
  - **Remarks**: This entity is disabled by default

### Sensors

- **Belt unit remaining lifetime**
  - **Description**: Remaining lifetime percentage of the belt unit
- **Black drum page counter**
  - **Description**: Total number of pages printed with the black drum
- **Black drum remaining lifetime**
  - **Description**: Remaining lifetime percentage of the black drum
- **Black drum remaining pages**
  - **Description**: Estimated number of pages remaining for the black drum
- **Black ink remaining**
  - **Description**: Percentage of black ink remaining
- **Black toner remaining**
  - **Description**: Percentage of black toner remaining
- **B/W pages**
  - **Description**: Total number of black and white pages printed
- **Color pages**
  - **Description**: Total number of color pages printed
- **Cyan drum page counter**
  - **Description**: Total number of pages printed with the cyan drum
- **Cyan drum remaining lifetime**
  - **Description**: Remaining lifetime percentage of the cyan drum
- **Cyan drum remaining pages**
  - **Description**: Estimated number of pages remaining for the cyan drum
- **Cyan ink remaining**
  - **Description**: Percentage of cyan ink remaining
- **Cyan toner remaining**
  - **Description**: Percentage of cyan toner remaining
- **Device status**
  - **Description**: Current device status or condition
- **Drum page counter**
  - **Description**: Total number of pages printed using the main drum
- **Drum remaining lifetime**
  - **Description**: Remaining lifetime percentage of the main drum
- **Drum remaining pages**
  - **Description**: Estimated number of pages remaining for the main drum
- **Duplex unit page counter**
  - **Description**: Total number of pages printed using the duplex unit
- **Fuser remaining lifetime**
  - **Description**: Remaining lifetime percentage of the fuser unit
- **Ink capture box remaining lifetime**
  - **Description**: Remaining lifetime percentage of the ink capture box
- **Laser remaining lifetime**
  - **Description**: Remaining lifetime percentage of the laser unit
- **Magenta drum page counter**
  - **Description**: Total number of pages printed with the magenta drum
- **Magenta drum remaining lifetime**
  - **Description**: Remaining lifetime percentage of the magenta drum
- **Magenta drum remaining pages**
  - **Description**: Estimated number of pages remaining for the magenta drum
- **Magenta ink remaining**
  - **Description**: Percentage of magenta ink remaining
- **Magenta toner remaining**
  - **Description**: Percentage of magenta toner remaining
- **Page counter**
  - **Description**: Total number of pages printed by the printer
- **PF Kit 1 remaining lifetime**
  - **Description**: Remaining lifetime percentage of paper feed kit 1
- **PF Kit MP remaining lifetime**
  - **Description**: Remaining lifetime percentage of multipurpose tray feed kit
- **Printer status**
  - **Description**: Current printer status as a normalized value (`idle`, `printing`, `warmup`, or `other`)
- **Status**
  - **Description**: Raw printer status text reported by the device
  - **Remarks**: This entity is disabled by default. Replaced by **Printer status**, which reports a fixed set of states
- **Uptime**
  - **Description**: Date and time of the last printer restart
  - **Remarks**: This entity is disabled by default
- **Yellow drum page counter**
  - **Description**: Total number of pages printed with the yellow drum
- **Yellow drum remaining lifetime**
  - **Description**: Remaining lifetime percentage of the yellow drum
- **Yellow drum remaining pages**
  - **Description**: Estimated number of pages remaining for the yellow drum
- **Yellow ink remaining**
  - **Description**: Percentage of yellow ink remaining
- **Yellow toner remaining**
  - **Description**: Percentage of yellow toner remaining

{% note %}
Not all printer models support all the listed entities. The set of entities depends on the printer model.
{% endnote %}

## Brother Printer automation examples

The binary sensors of this integration let you react to printer problems when the integration detects them, for example when the printer jams or runs out of paper.
Here is an idea to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Get notified when the printer jams or runs out of paper

Use the **Paper jam** and **No paper** binary sensors to send a notification to your phone when the printer needs attention. Replace the entity IDs in the example with the entity IDs of your printer's binary sensors.

- **Trigger**: State changed
  - **Target**: Your printer's **Paper jam** and **No paper** binary sensors
  - **To**: Problem
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying about a paper jam or empty paper tray" %}

{% example %}
automation: |
  alias: "Notify when the printer jams or runs out of paper"
  triggers:
    - trigger: state
      entity_id:
        - binary_sensor.hl_l2340d_paper_jam
        - binary_sensor.hl_l2340d_no_paper
      to: "on"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The printer needs attention: paper jam or out of paper."
{% endexample %}

{% enddetails %}

## Data updates

The **Brother Printer** integration {% term polling polls %} data from the printer every 30 seconds by default.

## Known limitations

Some very old Brother printers use a different data format and are not supported. The integration shows a message about this during setup.

## Troubleshooting

{% details "The printer is unavailable after changing the SNMP community" %}

### Symptom: The printer becomes unavailable after you change the SNMP community

After you change the SNMP community in the printer's web interface, the printer's entities become unavailable in Home Assistant.

#### Description

The integration uses the SNMP community stored in its configuration. When the community on the printer changes, Home Assistant can no longer read data from the printer until you update the configuration.

#### Resolution

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select **Brother Printer**.
3. Select the three dots {% icon "mdi:dots-vertical" %} menu next to the entry, and select **Reconfigure**.
4. Enter the new SNMP community under **Additional settings** and submit the form.

{% enddetails %}

{% details "The integration reports communication or data update problems" %}

### Symptom: The integration reports problems with communication or data updates

The printer's entities become unavailable, or {% my logs title="**Settings** > **System** > **Logs**" %} contains messages about connecting to the printer or retrieving data from it.

#### Description

Home Assistant cannot reach the printer over SNMP, or the printer does not answer SNMP requests.

#### Resolution

1. Check that the printer is turned on and reachable on your local network.
2. In the printer's web interface, check that SNMP is turned on.
3. In the printer's web interface, check that **SNMPv3 read-write access and v1/v2c read-only access** is selected, if this option is available.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
