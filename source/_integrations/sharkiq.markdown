---
description: Integrate your Shark IQ robot vacuum with Home Assistant.
ha_release: 0.115
ha_domain: sharkiq
---

The **Shark IQ** {% term integration %} allows you to control your [Shark IQ](https://www.sharkclean.com/vacuums/robot-vacuums/) vacuum.

{% include integrations/config_flow.md %}

{% include integrations/actions.md %}

The currently supported [Vacuum](/integrations/vacuum/) actions are:

- `vacuum.start`
- `vacuum.pause`
- `vacuum.stop`
- `vacuum.return_to_base`
- `vacuum.locate`
- `vacuum.set_fan_speed`

## Troubleshooting

### Integration Disconnecting

If the integration frequently disconnects and you have an ad blocker runner like [Pi-hole](https://pi-hole.net/) or [AdGuard](https://adguard.com) add `ads-field.aylanetworks.com` to the Allow list . This domain is needed for the connection and can be part of the automatic blocking because of `ads` being part of the subdomain.

If `pause` does not work for you, then it is not supported by your vacuum. The `stop` action will provide similar functionality.
