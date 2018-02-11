---
layout: page
title: "API"
description: "Home Assistant API"
date: 2017-02-15 07:00
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant provides various APIs. For detail please refer to [Home Assistant API](https://dev-docs.home-assistant.io/en/dev/) documentation.

  * [Python API](https://dev-docs.home-assistant.io/)
  * [WebSocket API](/developers/websocket_api/)
  * [REST API](/developers/rest_api/)
  * [Python REST API](/developers/python_api/)
  * [Server-sent events](/developers/server_sent_events/)

If you are not using the [`frontend`](/components/frontend/) in your setup then you need to enable the components by adding them to your `configuration.yaml` file. E.g., [`websocket_api:`](/components/websocket_api/) for the WebSocket API or [`api:`](/components/api/) for the [REST API](/developers/rest_api/) and the [Python REST API](/developers/python_api/).

