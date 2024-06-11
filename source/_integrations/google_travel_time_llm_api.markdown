---
title: Google Maps Travel Time LLM API
description: Instructions on how to add the Google Maps travel time LLM API to Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 2024.6
ha_config_flow: true
ha_domain: google_travel_time_llm_api
ha_platforms:
ha_codeowners:
  - '@fjfricke'
ha_integration_type: integration
related:
  - docs: /integrations/google_travel_time/
  - docs: /integrations/openai_conversation/
---

The `google_travel_time_llm_api` provides travel times and directions to conversation agents from the [Google Directions API](https://developers.google.com/maps/documentation/directions/).

## Setup

You need to register for an API key by following the instructions [here](https://github.com/googlemaps/google-maps-services-python#api-keys). You only need to turn on the Directions API.

[Google now requires billing](https://mapsplatform.googleblog.com/2018/05/introducing-google-maps-platform.html) to be enabled (and a valid credit card loaded) to access Google Maps APIs. The Directions API is billed at US$5 per 1000 requests, however, a US$200 per month credit is applied (20,000 requests).

A quota can be set against the API to avoid exceeding the free credit amount. Details on how to configure a quota can be found [here](https://developers.google.com/maps/documentation/directions/usage-and-billing#set-caps).

{% include integrations/config_flow.md %}

## How to use it

The LLM API can be toggled on in the conversation agent settings. It has been tested to work with [OpenAI Conversation](/integrations/openai_conversation/)
You can then ask your voice assistant for directions or the travel time between two addresses. You can also specify the mode of transport (car, bicycle, walking or transit) as well as the starting time.
