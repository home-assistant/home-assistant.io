---
title: "Setting up a fully local voice remote device"
---

If you have Home Assistant Cloud, the voice assistant uses Home Assistant Cloud by default.
This is because the Cloud version currently still performs better than the local version.
The performance depends a bit on the hardware you run it on. To set up a fully local, private voice assistant, follow these steps.

Currently, there are two version of voice remote devices supported to talk to Home Assistant: 
   * Using a classic analog telephone
   * Using an ATOM Echo

## Setting up a voice remote using ATOM Echo

## Required material

* Latest version of Home Assistant installed on your Home Assistant device 
* [Assist Pipeline](/integrations/assist_pipeline)
* The password to your 2.4&nbsp;GHz Wi-Fi network
* Chrome (or a Chromium-based browser like Edge) on desktop (not Android/iOS) 
* [M5Stack ATOM Echo Development Kit](https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit?ref=NabuCasa)
* USB-C cable to connect the ATOM Echo

## Getting everything ready

1. Before you can use this device with Home Assistant, you need to install a bit of software on it.
   * Follow the steps described in this procedure: [Installing the software onto the ATOM Echo](/projects/private-voice-assistant/voice_remote_esp32/#installing-the-software-onto-the-atom-echo).
1. [Set up a local voice assistant](/projects/private-voice-assistant/voice_remote_local_assistant/).
1. [Expose your devices to Assist](/projects/private-voice-assistant/voice_remote_expose_devices/#exposing-your-devices)

## Go and do something awesome
1. [Control Home Assistant over the ATOM Echo](/projects/private-voice-assistant/voice_remote_esp32/#installing-the-software-onto-the-atom-echo).
 
## Troubleshooting

Are things not working as expected?

* Checkout the [general troubleshooting section for Assist](/projects/private-voice-assistant/troubleshooting-assist/).