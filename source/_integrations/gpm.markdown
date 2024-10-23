---
title: GPM
description: How to use GIT packages as `custom_components` or Dashboard resources.
ha_release: 2024.10
ha_category:
  - Update
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@tomasbedrich'
ha_domain: gpm
ha_zeroconf: false
ha_platforms:
  - update
ha_integration_type: integration
---

GPM = GIT Package Manager. This {% term integration %} offers a native user interface for managing `custom_components` and [dashboard](/dashboards) resources.

## Installing integrations

Home Assistant `custom_components` are third-party integrations that extend Home Assistant's functionality. They are located in the `custom_components` directory within the Home Assistant configuration directory, typically at `/config/custom_components/`. Each custom component resides in its own subdirectory within this directory.

When a custom component is available as a public GIT repository, users can install it using the HTTP address of the repository. The address is pasted into a GPM config flow, and GPM downloads (technically speaking "[clones](https://git-scm.com/docs/git-clone)") the latest version and creates the appropriate symlinks. GPM also publishes an [update entity](/integrations/update/) to facilitate easy updates of the integration.

## Installing dashboard resources

Dashboard resources are additional frontend elements that enhance the Home Assistant user interface. They can include custom cards, themes, and other UI components. These resources are typically added to the `www` directory within the Home Assistant configuration directory and referenced in the dashboard configuration YAML or UI editor.

GPM assists with dashboard resource management similarly to integrations. There is one extra step though: a user needs to provide a download URL for the dashboard resource file. GPM then automatically downloads the file on every update (more precisely "[checkout](https://git-scm.com/docs/git-checkout)") of the repository. When configuring the download URL, the {% raw %}`{{ version }}`{% endraw %} placeholder should be used. On every download, GPM substitutes {% raw %}`{{ version }}`{% endraw %} with the respective tag or commit hash of the GIT repository.

An example download URL for a GitHub-based repository of a dashboard resource, which publishes its builds as GitHub releases: {% raw %}`https://github.com/example-user/awesome-card/releases/download/{{ version }}/awesome-card.js`{% endraw %}

### Why manual download URL configuration is needed?

Frontend resources are often distributed as bundled JavaScript files (i.e., build artifacts), storage of which in the GIT repository is considered a bad practice. Because of that, GPM doesn't even look for build artifacts in the GIT repository.

GPM also doesn't limit the user to any particular GIT remote (GitHub, GitLab, etc.), therefore it cannot make assumptions about the expected download URL based on the "Releases" feature of the GIT remote.

## Compared to HACS

[HACS](https://hacs.xyz/) is an excellent and widely used alternative to GPM.

GPM is similar to HACS in the following ways:

- GPM also manages `custom_components` and dashboard resources.
- GPM requires [the same repository structure as HACS](https://hacs.xyz/docs/publish/integration/) for GIT repositories of `custom_components` (i.e., HACS packages are installable using GPM).
- GPM assumes that a new tag or commit must be published to release a new version of a custom component or dashboard resource.

Compared to HACS:

- GPM allows installation from _all remotes_, i.e., all GIT repositories that can be referenced using an HTTP address.
- GPM doesn't require a GitHub account.
- GPM intentionally avoids using any third-party APIs (e.g., not showing release notes, not using pre-built release bundles for dashboard resources). Pure GIT.
- GPM is built into the Home Assistant Core.
- HACS has more features, some of which GPM will likely never get (new repository explorer, support for AppDaemon, etc.).

Overall: GPM is a lightweight and flexible alternative to HACS for advanced users.

{% include integrations/config_flow.md %}
