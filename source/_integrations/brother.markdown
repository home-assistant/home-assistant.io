---
title: Brother Printer
description: Instructions on how to integrate a Brother printer into Home Assistant.
ha_category:
  - System monitor
ha_release: 0.104
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: brother
ha_zeroconf: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
ha_quality_scale: platinum
---

The **Brother Printer** {% term integration %} allows you to read current data from your local Brother printer.

It usually provides information about the device's state, the left amount of ink or toner and the remaining lifetime of the drum or other parts of the printer.
The integration monitors every supported part.

## Prerequisites

- To enable SNMP, navigate to the printer's web interface (for example: `http://192.168.5.6`) and turn it on under **Network** > **Protocol** > **SNMP**. 
- For some models, access to the web interface is password-protected. 
   - For some printers, the default password is printed on a sticker on the back of the printer, preceded by **Pwd**.
   - If the printer does not have a password on the sticker, the default password is `initpass`.

- For some Brother devices, **SNMPv3 read-write access and v1/v2c read-only access** is the option required (under advanced settings).

![SNMP settings on Brother Printer web interface](/images/integrations/brother/brother-printer-webui.png)

## Unsupported devices

The following devices are not supported by the integration:

- MFC-8660DN
- MFC-8860DN

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The hostname or IP address of the Brother printer to control."
Port:
    description: "The SNMP port of the Brother printer."
SNMP Community:
    description: "A simple password for devices to communicate to each other."
Type of the printer:
    description: "Brother printer type: ink or laser."
{% endconfiguration_basic %}

## Supported functionality

The Brother integration provides the following entities.

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
- **Laser remaining lifetime**
  - **Description**: Remaining lifetime percentage of the laser unit
- **Last restart**
  - **Description**: Date and time of the last printer restart
  - **Remarks**: This entity is disabled by default
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
- **Status**
  - **Description**: Current printer status or condition
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
Not all printer models support all the listed entities, the set of entities is tailored to a specific printer model.
{% endnote %}

## Data updates

By default, the integration {% term polling polls %} data from the device every 30 seconds.

## Possible use-cases

- Monitor printer status and send notifications when paper jams or other unexpected events occur.

## Examples

You can configure Home Assistant to alert you when the printer jams or runs out of paper as follows. First, add the following to {% term "`configuration.yaml`" %} under the `template:` section.
Replace `sensor.hl_l2340d_status` with the actual name of your sensor.

{% raw %}

```yaml
template:
  - binary_sensor:
    - name: 'Laser Printer Out Of Paper'
      state: >
        {{ is_state('sensor.hl_l2340d_status', 'no paper') }}

  - binary_sensor:
    - name: 'Laser Printer Paper Jam'
      state: >
        {{ is_state('sensor.hl_l2340d_status', 'paper jam') }}
```

{% endraw %}

Then, add this under the `alert:` section:

```yaml
  laser_out_of_paper:
    name: Laser Printer is Out of Paper
    done_message: Laser Printer Has Paper
    entity_id: binary_sensor.laser_printer_out_of_paper
    can_acknowledge: true
    notifiers:
      - my_phone_notify

  laser_paper_jam:
    name: Laser Printer has a Paper Jam
    done_message: Laser Printer Paper Jam Cleared
    entity_id: binary_sensor.laser_printer_paper_jam
    can_acknowledge: true
    notifiers:
      - my_phone_notify
```

The above will send an alert for paper jam or out of paper whenever the condition is detected, assuming you have the Home Assistant app configured on your phone so that alerts can be sent directly to it. If you don't use the Home Assistant app, you will need to set up a different notifier.

Change `my_phone_notify` to the actual notifier you are using.

## Known limitations

- Some very old Brother printers use a different data format. Those models are not supported. The integration will show information about that during configuration.

## Troubleshooting

### Printer is unavailable after changing SNMP community

After changing the SNMP community in the printer configuration, you need to reconfigure the device in Home Assistant. To do this:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select **Brother Printer**.
3. Click {% icon "mdi:dots-vertical" %}.
4. Select **Reconfigure**.

### Integration reports problems with communication or data updating

1. Check if the printer is online and available on the local network.
2. Check in the printer's web interface if SNMP is enabled.
3. In the printer's web interface, verify that **SNMPv3 read/write access and v1/v2c read-only access** is enabled, if available.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
