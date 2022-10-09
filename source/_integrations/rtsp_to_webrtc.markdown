---
title: RTSPtoWebRTC
description: Instructions on how to integrate RTSPtoWebRTC server within Home Assistant.
ha_category:
  - Camera
ha_config_flow: true
ha_release: 2022.2
ha_iot_class: Local Push
ha_codeowners:
  - '@allenporter'
ha_domain: rtsp_to_webrtc
ha_platforms:
  - diagnostics
ha_integration_type: integration
---

The RTSPtoWebRTC integration registers with [camera integration](/integrations/camera) to provide WebRTC live streams for any RTSP camera. The integration initiates a connection to a [RTSPtoWeb](https://github.com/deepch/RTSPtoWeb) or [RTSPtoWebRTC](https://github.com/deepch/RTSPtoWebRTC) proxy server that converts an RTSP stream to a WebRTC stream.

The integration configuration requires the URL to your server (e.g. `http://example.com:8083`) and will automatically discover which type of server you have.

<lite-youtube videoid="6hJXenSZJ5M" videotitle="Real Time Camera Viewing using RTSPtoWeb and Glance Cards in Home Assistant." posterquality="maxresdefault"></lite-youtube>

{% include integrations/config_flow.md %}

## Technical Details

RTSPtoWebRTC registers with the camera integration to override the camera attribute `frontend_stream_type` of `STREAM_TYPE_WEBRTC` to instruct the frontend to use WebRTC streams.

<!-- Note: This documentation will be updated as support for other integrations is added, or if it is integrated directly into camera in future PRs. -->

See [WebRTC](https://webrtc.org/) for more technical details on the open standard for real-time communication. Here is a short summary of how it works:

- The Home Assistant Frontend is a WebRTC client. This just means there is some javascript for initiating a WebRTC stream which creates an *offer*.
- The `webrtc` integration is responsible for *signaling*, passing the *offer* and an RTSP URL to the *RTSPtoWebRTC* server.
- The *RTSPtoWeb{RTC}* server opens the RTSP URL, and returns back an *answer*.
- The Frontend accepts the answer and then establishes a *peer connection* to the *RTSPtoWebRTC* server.
- Establishing a peer connection may be a direct connection on the local network, or using a variety of techniques to communicate through a NAT (e.g. with a STUN server).
- The Frontend then communicates directly with the *RTSPtoWeb{RTC}* proxy server to view the stream.

See [Getting started with peer connections](https://webrtc.org/getting-started/peer-connections) for more on the technical details.

## Troubleshooting

The integration may not work for your particular setup, and Home Assistant cannot support and troubleshoot user problems that are unrelated to the actual integration in Home Assistant.

The WebRTC stream negotiation process and streaming can vary a lot depending on your network setup and camera setup. See the specific audio and video codecs supported at [RTSPtoWeb Limitations](https://github.com/deepch/RTSPtoWeb#limitations) and [RTSPtoWebRTC Limitations](https://github.com/deepch/RTSPtoWebRTC#limitations).
