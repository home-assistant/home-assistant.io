---
title: Glutz eAccess
description: Instructions on how to integrate Glutz eAccess into Home Assistant.
ha_category:
  - Lock
ha_release: "2026.XX"
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@miitchpls'
ha_domain: glutz_eaccess
ha_integration_type: hub
---

The Glutz eAccess integration connects Home Assistant to the [Glutz eAccess](https://www.glutz.com/) access control system, allowing you to control all your Glutz access points directly from Home Assistant.

Glutz eAccess can be deployed as a cloud service (hosted by Glutz) or as a self-hosted server (eAccess Desktop or Server with the RPC interface enabled).

## Prerequisites

- Access to a Glutz eAccess server (cloud or self-hosted), with either:
  - A user account with at least **Smart Access** rights, **or**
  - An invitation link received by email from your Glutz system administrator (for new accounts).

Smart Access is a Glutz eAccess permission level that allows users to control their assigned access points via the mobile app and API. It is assigned by a system administrator and does not require administrator privileges.

## Supported devices

All Glutz eAccess-compatible hardware is supported.

{% include integrations/config_flow.md %}

## Setup

The integration offers two setup methods.

### Sign in with credentials

Use this method if you already have a Glutz eAccess account. You will need:

- The URL of your Glutz eAccess server (e.g., `https://cloud.eaccess.glutz.com`)
- Your username or email address
- Your password

### Use an invitation link

Use this method if you received an invitation email from a Glutz system administrator. Paste the full invitation link from the email — the server and email address will be pre-filled automatically. You will then be prompted to set a password for your new account.

The password must be at least 8 characters and include uppercase letters, lowercase letters, a digit, and a special character.

## Entities

### Lock

Each Glutz access point is exposed as a **lock** entity. The following actions are supported:

| Action | Description |
|--------|-------------|
| Lock | Sends a close command to the access point. |
| Unlock | Sends an open command; the door re-locks automatically after a few seconds. |
| Open | Holds the door open indefinitely until a lock command is issued. |

{% note %}
Glutz eAccess doors do not provide real-time state feedback. The lock state in Home Assistant is simulated: after an unlock command the entity shows *unlocked* briefly before reverting to *locked*. The **Open** action keeps the entity in the *unlocked* state until explicitly locked.
{% endnote %}