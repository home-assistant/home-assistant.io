---
title: RTSPtoWebRTC
description: Instructions on how to integrate RTSPtoWebRTC server within Home Assistant.
ha_category:
  - Other
ha_release: '2021.12.1'
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@allenporter'
ha_domain: rtsptowebrtc
---

The `rtsptowebrtc` integration allows other integrations to provide WebRTC live streams. The integration initiates a connection to a [RTSPtoWebRTC](https://github.com/deepch/RTSPtoWebRTC) proxy server that converts an RTSP stream to a WebRTC stream.

Other integrations may use `rtsptowebrtc` with a `camera` to make WebRTC streams available in the fronted. This integration does not add any camera devices itself.

## Configuration

You need an existing [RTSPtoWebRTC](https://github.com/deepch/RTSPtoWebRTC) server to configure the `rtsptowebrtc`. The integraton is configured with the URL to your server, e.g. `https://example.com:8083.

{% my config_flow_start badge domain=page.ha_domain %}

{% details "Manual configuration steps" %}

1. Browse to your Home Assistant instance using.
1. In the sidebar click on _**{% my config icon %}**_.
1. From the configuration menu select: _**{% my integrations icon %}**_.
1. In the bottom right, click on the
  _**{% my config_flow_start icon domain=page.ha_domain %}**_ button.
1. From the list, search and select _**"RTSPtoWebRTC"**_ and follow the instructions.

{% enddetails %}

## Technical Details

A camera integration must explicitly integration with `rtsptowebrtc`, and must set a camera attribute `frontend_stream_type` of `STREAM_TYPE_WEBRTC` to instruct the frontend to use WebRTC streams.

<!-- Note: This documentation will be updated as support for other integrations is added, or if it is integrated directly into camera in future PRs. -->

See [WebRTC](https://webrtc.org/) for more technical details on the open standard for real-time communication. Here is a short summary of how it works:

- The Home Assistant Frontend is a WebRTC client. This just means there is some javascript for initiating a WebRTC stream which creates an *offer*.
- The `webrtc` integration is responsible for *signaling*, passing the *offer* and an RTSP URL to the *RTSPtoWebRTC* server.
- The *RTSPtoWebRTC* server opens the RTSP URL, and returns back an *answer*.
- The Frontend accepts the answer and then establishes a *peer connection* to the *RTSPtoWebRTC* server.
- Establishing a peer connection may be a direct connection on the local network, or using a variety of techniques to communicate through a NAT (e.g. with a STUN server).
- The Frontend then communicates directly with the *RTSPtoWebRTC* proxy server to view the stream.

See [Getting started with peer connections](https://webrtc.org/getting-started/peer-connections) for more on the technical details.

## Troubleshooting

The integration may not work for your particular setup, and Home Assistant cannot support and troubleshoot user problems that are unrelated to the actual integration in Home Assistant.

The WebRTC stream negotiation process and streaming can very a lot depending on your network setup and camera setup.  *RTSPtoWebRTC* supports specific audio and video codecs only, see [Limitations](https://github.com/deepch/RTSPtoWebRTC#limitations)
