---
description: Instructions on how to integrate Telldus Live into Home Assistant.
ha_release: 0.11
ha_domain: tellduslive
---

The **Telldus Live** {% term integration %} let you connect to the [Telldus Live](https://live.telldus.com) API. It's cloud platform that connects to your Tellstick Net or Tellstick ZNet connected gear at home.

{% important %}
You need a [Telldus Premium](https://telldus.com/en/telldus-premium/) subscription to access the Cloud API (https://telldus.com/en/important-announcement-english/).
{% endimportant %}

Local API supports only one device at this stage. Local API is only supported with the Znet Lite products, the older hardware (such as Tellstick Net) does not support local API.

{% include integrations/config_flow.md %}

The integration will offer configuration through the Home Assistant user interface where it will let you associate it with your Telldus Live account.

{% note %}

If you are receiving the error message: "The path '/tellduslive/authorize' was not found", you have to switch to a web browser that allows HTTP connections. Firefox is known to work fine. Chrome is known to cause issues.

{% endnote %}
