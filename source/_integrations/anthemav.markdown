---
title: Anthem A/V Receivers
description: Instructions on how to integrate Anthem A/V Receivers into Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Push
ha_release: 0.37
ha_domain: anthemav
ha_codeowners:
  - '@hyralex'
ha_config_flow: true
ha_platforms:
  - media_player
ha_integration_type: integration
---

Both [Anthem]'s current and last generation of <abbr title="Audio & video">A/V</abbr> receivers and processors support IP-based network control. This Home Assistant {% term integration %} adds proper "local push" support for any of these receivers on your network.

## Supported models

### A/V Receiver

- [MRX 540](https://www.anthemav.com/products-current/type=av-receiver/model=mrx-540/page=overview), [MRX 740](https://www.anthemav.com/products-current/type=av-receiver/model=mrx-740/page=overview), [MRX 1140](https://www.anthemav.com/products-current/type=av-receiver/model=mrx-1140/page=overview)
- [MRX 520](https://www.anthemav.com/products-current/series=mrx-series-gen3/model=mrx-520/page=overview), [MRX 720](https://www.anthemav.com/products-current/collection=performance/model=mrx-720/page=overview), [MRX 1120](https://www.anthemav.com/products-current/collection=performance/model=mrx-1120/page=overview)
- [MRX 310](https://www.anthemav.com/products-archived/type=av-receiver/model=mrx-310/page=overview), [MRX 510](https://www.anthemav.com/products-archived/series=mrx-series/model=mrx-510/page=overview), [MRX 710](https://www.anthemav.com/products-archived/type=av-receiver/model=mrx-710/page=overview)

### A/V Processor

- [AVM 60](https://www.anthemav.com/products-current/model=avm-60/page=overview)

### Distribution solution

- [MDX 8](https://www.anthemav.com/products-current/type=distribution/model=mdx-8/page=overview), [MDX 16](https://www.anthemav.com/products-current/type=distribution/model=mdx-16/page=overview)
- Martin Logan [MDA 8](https://www.martinlogan.com/en/product/mda8), [MDA 16](https://www.martinlogan.com/en/product/mda16)

If your model is not on the list, please give it a test. If everything works correctly, then add it to the list by selecting the **Edit this page on GitHub** link above.

Support is provided through the Python [anthemav] module. Older, RS-232 serial-based units like the [D2v series](https://www.anthemav.com/products-archived/model=d2v/page=overview) use a different protocol entirely and are not currently supported.

[Anthem]: https://www.anthemav.com/
[anthemav]: https://github.com/nugget/python-anthemav

{% include integrations/config_flow.md %}

{% configuration_basic %}
host:
  description: The host name or the IP address of the device.
port:
  description: The port number of the device.
{% endconfiguration_basic %}

## Notes and limitations

- The tuner is currently unsupported as are the `media_player` play, pause, prev, and next controls.
- Enabling this platform will set and enforce **Standby IP Control On** within your Anthem device. You almost certainly want this. If you disable it on the device, it will just get re-enabled by Home Assistant.

{% warning %}

The {% term integration %} will maintain a persistent connection to the network control port which will prevent any other application from communicating with the receiver. This includes the Anthem iOS and Android remote control apps as well as the ARC-2 Anthem Room Calibration software. If you want to use another application that makes use of the network control port, disable this {% term integration %} and restart Home Assistant.
<br /><br />
*The underlying Python module has hooks for halting and resuming the network connection but those functions are currently unsupported by the Home Assistant platform.*

{% endwarning %}
