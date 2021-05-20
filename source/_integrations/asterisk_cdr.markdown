---
title: Asterisk Call Detail Records
description: Instructions on how to integrate an Asterisk CDR within Home Assistant.
ha_category:
  - Mailbox
ha_iot_class: Local Polling
ha_release: 0.79
ha_domain: asterisk_cdr
---

The Asterisk Call Data Recorder provides access to Asterisk call logs on the Asterisk PBX server. This mailbox is enabled automatically through the [Asterisk Voicemail integration](/integrations/asterisk_mbox/) configuration if the `asterisk_mbox_server` is configured to provide CDR data.  More information on configuring the server can be found in the [Asterisk PBX configuration guide](/docs/asterisk_mbox/).
