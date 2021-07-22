---
title: CUPS
description: Instructions on how to integrate CUPS sensors into Home Assistant.
ha_category:
  - System Monitor
ha_iot_class: Local Polling
ha_release: 0.32
ha_codeowners:
  - '@fabaff'
ha_domain: cups
ha_platforms:
  - sensor
---

The `cups` sensor platform is using the open source printing system [CUPS](https://www.cups.org/) to show details about your printers, including the ink levels. It can obtain the informations using a CUPS server or communicating directly with the printer with the Internet Printing Protocol.

## Setup

You will need to install the `python3-dev` or `python3-devel` package and the development files for CUPS (`libcups2-dev` or`cups-devel`) on your system manually (e.g., `sudo apt-get install python3-dev libcups2-dev` or `sudo dnf -y install python3-devel cups-devel`) along with a compiler (`gcc`). This integration doesn't work out-of-the-box in a container-based setup.

To set up the sensor the "Queue Name" of the printer is needed. The fastest way to get it, is to visit the CUPS web interface at "http://[IP ADDRESS PRINT SERVER]:631" and go to "Printers".

<p class='img'>
  <img src='/images/screenshots/cups-sensor.png' />
</p>

## Configuration

To enable the CUPS sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: cups
    printers:
      - C410
      - C430
```

{% configuration %}
printers:
  description: List of printers to add. If you're not using a CUPS server, add here your "Printer Name".
  required: true
  type: list
host:
  description: The IP address of the CUPS print server or of the printer.
  required: false
  type: string
  default: 127.0.0.1
port:
  description: The port number of the CUPS print server or of the printer.
  required: false
  type: integer
  default: 631
is_cups_server:
  description: Set true if you want to use a CUPS print server, set false otherwise.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

## Examples

Default configuration for an IPP printer:

```yaml
# Example configuration.yaml entry for an IPP printer
sensor:
  - platform: cups
    host: PRINTER_IP
    is_cups_server: false
    printers:
      - ipp/print
```

<div class='note'>

You will need to install the `python3-dev` or `python3-devel` and the development files for CUPS (`libcups2-dev` or`cups-devel`) package on your system manually (eg. `sudo apt-get install python3-dev libcups2-dev` or `sudo dnf -y install python3-devel cups-devel`) along with a compiler (`gcc`).

</div>
