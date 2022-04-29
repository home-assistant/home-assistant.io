---
title: Shark IQ
description: Instructions on how to integrate your Shark IQ vacuum robot with Home Assistant.
ha_category:
  - Vacuum
ha_iot_class: Cloud Polling
ha_release: 0.115
ha_config_flow: true
ha_codeowners:
  - '@JeffResc'
  - '@funkybunch'
  - '@AritroSaha10'
ha_domain: sharkiq
ha_platforms:
  - vacuum
ha_integration_type: integration
---

The `sharkiq` integration allows you to control your [Shark IQ](https://www.sharkclean.com/vacuums/robot-vacuums/) vacuum.

<p class='img'>
<img src='/images/screenshots/more-info-dialog-sharkiq.png' />
</p>

This platform has been tested and is confirmed to be working with the Shark IQ R101AE robot vacuum with self-empty base but should also work with the R100.

{% include integrations/config_flow.md %}

## Services

Currently supported services are:

- `start`
- `pause`
- `stop`
- `return_to_base`
- `locate`

## Troubleshooting

### Integration Disconnecting

If the integration frequently disconnects and you have an ad blocker runner like [Pi-hole](https://pi-hole.net/) or [AdGuard](https://adguard.com) add `ads-field.aylanetworks.com` to the Allow list . This domain is needed for the connection and can be part of the automatic blocking because of `ads` being part of the subdomain.
