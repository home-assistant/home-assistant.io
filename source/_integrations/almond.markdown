---
title: Almond
description: Instructions on how to setup Almond within Home Assistant.
ha_category:
  - Voice
ha_iot_class: Local Polling
ha_release: '0.102'
ha_config_flow: true
ha_codeowners:
  - '@gcampax'
  - '@balloob'
ha_domain: almond
ha_integration_type: integration
---

[Almond](https://almond.stanford.edu/) is an open, privacy-preserving virtual assistant by [Stanford Open Virtual Assistant Lab](https://oval.cs.stanford.edu/). It allows you, among other things, to control Home Assistant using natural language. Once installed, it will be available in the user interface via the microphone icon in the top right.

Almond consists of three parts:

- Almond Server: Knows about Home Assistant and your data. Executes your sentences.
- LUInet: Neural network that converts your sentences into Thingtalk programs.
- Thingpedia: Skills that provide the building blocks for Thingtalk programs.

<a href='/images/integrations/almond/almond-architecture.svg'><img src='/images/integrations/almond/almond-architecture.svg' alt='Architectural overview of how all pieces fit together.' style='border: 0;box-shadow: none;'></a>

## Installation

### Home Assistant add-on installation

To install Almond Server, go to the Home Assistant add-on store, search for Genie and click on Install. Once started, it will initiate a configuration flow to finish set up in Home Assistant. You can find it on the integrations page in the configuration panel.

### Manual installation

You can install Almond Server by following [the instructions in their README](https://github.com/stanford-oval/almond-server#running-almond-server).

Before linking it to Home Assistant, you will need to visit the Almond UI once to create a password. It is by default available on port 3000.

Once installed, configure Almond like this:

```yaml
# Example configuration.yaml entry
almond:
  type: local
  host: http://127.0.0.1:3000
```

The Almond integration does not update configuration entries yet. If you make a change to configuration.yaml, you will need to remove the configuration entry and then restart Home Assistant.

### Almond Web

Stanford offers a hosted version of Almond Server called Almond Web. To use this, go to the integrations page and add Almond using the add integration flow.

Your Home Assistant installation needs to be externally accessible if you want Almond Web to be able to control Home Assistant.

### Almond Web - Manual installation

It is possible to set up Almond Web manually. You will need to create your own client ID and secret in the web interface.

```yaml
# Example configuration.yaml entry
almond:
  type: oauth2
  client_id: AAAAAAAAAAAAA
  client_secret: BBBBBBBBBBBBBBBBB
```

You can now go to the integrations page and start the configuration flow.

## Language Support

Almond is currently limited to the English language. This is not a technical limitation but requires specialized engineering effort. Almond has currently no public timeline for adding other languages.

## Device Support

Almond is constantly improving. It does not currently support all devices, but we're working with Almond on improving this.
