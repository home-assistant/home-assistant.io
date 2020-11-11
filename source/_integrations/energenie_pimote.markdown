---
title: "Energenie PiMote"
description: "Control your Energenie devices with a Raspberry Pi and Home Assistant"
ha_release: "0.118"
ha_category: Switch
ha_iot_class: "Assumed State"
ha_config_flow: true
ha_codeowners:
  - '@matejmecka'
ha_domain: energenie
---

This integration allows you to use and control your Energenie Pimote devices via Home Assistant.

<div class='note'>
This integration requires the Pimote addon installed on the Raspberry Pi with having it paired with the following [script](https://bitbucket.org/MattHawkinsUK/rpispy-pool-monitor/raw/master/utils/energenie_pair.py)
</div>

### Configuration via the frontend

Make sure you have previously paired them or if you have not follow consult the following [guide](https://www.raspberrypi-spy.co.uk/2017/08/controlling-energenie-power-sockets-with-the-pi-mote-addon/).

In the settings go to `Integrations`, click on the `+` sign to add an integration and click on *Energenie*. After filling out the socket number and name the integration is ready to go!
