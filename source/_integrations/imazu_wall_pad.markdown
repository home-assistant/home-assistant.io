---
title: Imazu Wall Pad
description: Instructions on integrating Imazu Wall Pad devices within Home Assistant.

ha_category:
  - Binary Sensor
  - Climate
  - Fan
  - Light
  - Switch
ha_release: 2023.1.7
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@stkang90'
ha_domain: imazu_wall_pad
ha_platforms:
  - binary_sensor
  - climate
  - fan
  - light
  - switch
ha_integration_type: integration
---

[Imazu Wall Pad](https://www.hyundaiht.co.kr/product/smart_home/list.php) integration allows control and monitoring of connected devices via RS485.

## Setup

Wall Pad should be connected to `Elfin-EW11` device via RS485.

#### Elfin-EW11 Settings
After changing the network settings in system settings, set as follows in serial port setting and communication setting.

```yaml
Serial Port Settings:
  Basic Settings:
    Baud Rate: 9600
    Data Bit: 8
    Stop Bit: 1
    Parity: None
  Buffer Settings:
    Buffer Size: 512
    Gap Time: 50
  Flow Control Settings:
    Flow Control: Half Duplex
  Cli Settings:
    Cli: Serial String
    Serial String: +++
    Waiting Time: 300
  Protocol Settings:
    Protocol: None

Communication Settings:
  Basic Settings:
    Protocol: Tcp Server
  Socket Settings:
    Local Port: 8899
    Buffer Size: 512
```

## Configuration

Enable the `Imazu Wall Pad` integration via **Settings** -> **Devices & Services**.

To use an Imazu Wall Pad in your installation, you need to configure the IP address and port to connect to EW11.

## Supported devices

- Room light switches
- Room power outlets
- Room thermostats
- Gas valve close
- Ventilation fan
- Away light sensor
- Away gas sensor
