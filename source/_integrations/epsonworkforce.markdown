---
title: Epson Workforce
description: Instructions on how to integrate Epson Workforce/Ecotank Printer into Home Assistant.
ha_category:
  - Sensor
ha_release: 2023.12.0
ha_iot_class: Local Polling
ha_codeowners:
  - '@cociweb'
ha_domain: epsonworkforce
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `epson workforce` platform allows you to monitor the ink levels of a Epson Workforce/EcoTank(ET) printers from Home
Assistant.

To add Epson Workforce integration to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
   - platform: epsonworkforce
     host: IP_ADDRESS
     monitored_conditions:
     - black
     - photoblack
     - yellow
     - magenta
     - cyan
     - clean
     protocol: "http"
     verify_ssl: false
```

{% configuration %}
host:
  description: The host name or address of the Epson workforce printer
  required: true
  type: string
monitored_conditions:
  description: The cartridge colours to monitor.
  required: true
  type: list
  keys:
    black:
      description: The black ink cartridge
    photoblack:
      description: The photo black ink cartridge (not supported by all printers).
    yellow:
      description: The yellow ink cartridge.
    magenta:
      description: The magenta (=red) ink cartridge.
    cyan:
      description: The cyan (=blue) ink cartridge.
    clean:
      description: The cleaning cartridge.
protocol:
  description: The type of the protocol: `http` or `https`
  required: false
  type: string
  default: http
verify_ssl:
  description: Verify the ssl chain or not.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

Supported devices:

- Epson Workforce (and some EcoTank) printers who publish a HTTP(s) page containing the ink cartridge levels

Tested devices:

- Epson WF2630
- Epson WF2660
- Epson WF3540
- Epson WF3620
- Epson WF3640
- Epson WF4820
- Epson EcoTank ET-77x0
- Epson ET-2650
- EPSON ET-2750
- Epson ET-4750
- Epson EcoTank ET-5150 (51x0)
- Epson EcoTank L3150
- Epson Expression Home XP-2100
- Epson Expression Home XP-2105

To make this module work you need to connect your printer to your LAN.
The best is to navigate to the status page of the printer to check if it shows the page with the ink levels on the URL `http(s)://<IP_ADDRESS>/PRESENTATION/HTML/TOP/PRTINFO.HTML`
