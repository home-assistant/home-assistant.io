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
---

The **Brother Printer** {% term integration %} allows you to read current data from your local Brother printer.

It usually provides information about the device's state, the left amount of ink or toner and the remaining lifetime of the drum or other parts of the printer.
The integration monitors every supported part.

{% include integrations/config_flow.md %}

{% note %}
Some very old Brother printers use different data format and these models are not supported. The integration will show information about that during configuration.
{% endnote %}

## Configuring the printer

To enable SNMP, navigate to the printer's web interface (for example: `http://192.168.5.6`) and turn it on under Network / Protocol / SNMP. For some models, access to the web interface is password-protected. For some printers, the default password is printed on a sticker on the back of the printer, preceded by "Pwd:". If the printer does not have a password on the sticker, the default password is "initpass".

For some Brother devices, `SNMPv3 read-write access and v1/v2c read-only access` is the option required (under advanced settings).

![SNMP settings on Brother Printer web interface](/images/integrations/brother/brother-printer-webui.png)

## Sensor example

You can configure Home Assistant to alert you when the printer jams or runs out of paper as follows.  First, add the following to {% term "`configuration.yaml`" %} under the `template:` section (Note: replace `sensor.hl_l2340d_status` with the actual name of your sensor):

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
