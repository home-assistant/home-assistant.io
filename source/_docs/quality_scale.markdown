---
title: "Quality scale"
description: "Details about the classification of integrations."
related:
  - url: https://developers.home-assistant.io/docs/core/integration-quality-scale/
    title: Developer documentation on the integration quality scale
---

The integration quality scale is a framework for Home Assistant to grade integrations based on user experience, features, code quality, and developer experience.
To grade this, the project has come up with a set of tiers, each with its own set of criteria.

## Scaled tiers

There are 4 scaled tiers, bronze, silver, gold, and platinum.
To reach a tier, the integration must fulfill all rules of that tier and the tiers below.

These tiers are defined as follows.

### 🥉 Bronze

The bronze tier is the baseline standard and requirement for all new integrations. It meets the minimum requirements in code quality, functionality, and user experience. It complies with the fundamental expectations and provides a reliable foundation for users to interact with their devices and services.

The documentation provides guidelines for setting up the integration directly from the Home Assistant user interface.

From a technical perspective, this integration has been reviewed to comply with all baseline standards, which we require for all new integrations, including automated tests for setting up the integration.

The bronze tier has the following characteristics:

- Can be easily set up through the UI.
- The source code adheres to basic coding standards and development guidelines.
- Automated tests that guard this integration can be configured correctly.
- Offers basic end-user documentation that is enough to get users started step-by-step easily.

### 🥈 Silver

The silver tier builds upon the _Bronze_ level by improving the reliability and robustness of integrations, ensuring a solid runtime experience. It ensures an integration handles errors properly, such as when authentication to a device or service fails, handles offline devices, and other errors.

The documentation for these integrations provides information on what is available in Home Assistant when this integration is used, as well as troubleshooting information when issues occur.

This integration has one or more active code owners who help maintain it to ensure the experience on this level lasts now and in the future.

The silver tier has the following characteristics:

- Provides everything the _Bronze_ tier has.
- Provides a stable user experience under various conditions.
- Has one or more active code owners who help maintain the integration.
- Correctly and automatically recover from connection errors or offline devices, without filling log files and without unnecessary messages.
- Automatically triggers re-authentication if authentication with the device or service fails.
- Offers detailed documentation of what the integration provides and instructions for troubleshooting issues.

### 🥇 Gold

The gold standard in integration user experience, providing extensive and comprehensive support for the integrated devices & services. A gold-tier integration aims to be user-friendly, fully featured, and accessible to a wider audience.

When possible, devices are automatically discovered for an easy and seamless setup, and their firmware/software can be directly updated from Home Assistant.

All provided devices and entities are named logically and fully translatable, and they have been properly categorized and enabled for long-term statistical use.

The documentation for these integrations is extensive, and primarily aimed toward end-users and understandable by non-technical consumers. Besides providing general information on the integration, the documentation provides possible example use cases, a list of compatible devices, a list of described entities the integration provides, and extensive descriptions and usage examples of available actions provided by the integration. The use of example automations, dashboards, available Blueprints, and links to additional external resources, is highly encouraged as well.

The integration provides means for debugging issues, including downloading diagnostic information and documenting troubleshooting instructions. If needed, the integration can be reconfigured via the UI.

From a technical perspective, the integration needs to have full automated test coverage of its codebase to ensure the set integration quality is maintained now and in the future.

All integrations that have devices in the Works with Home Assistant program are at least required to have this tier.

The gold tier has the following characteristics:

- Provides everything the _Silver_ tier has.
- Has the best end-user experience an integration can offer; streamlined and intuitive.
- Can be automatically discovered, simplifying the integration setup.
- Integration can be reconfigured and adjusted.
- Supports translations.
- Extensive documentation, aimed at non-technical users.
- It supports updating the software/firmware of devices through Home Assistant when possible.
- The integration has automated tests covering the entire integration.
- Required level for integrations providing devices in the Works with Home Assistant program.

### 🏆 Platinum

Platinum is the highest tier an integration can reach, the epitome of quality within Home Assistant. It not only provides the best user experience but also achieves technical excellence by adhering to the highest standards, supreme code quality, and well-optimized performance and efficiency.

The platinum tier has the following characteristics:

- Provides everything the _Gold_ tier has.
- All source code follows all coding and Home Assistant integration standards and best practices and is fully typed with type annotations and clear code comments for better code clarity and maintenance.
- A fully asynchronous integration code base ensures efficient operation.
- Implements efficient data handling, reducing network and CPU usage.

## Special tiers

There are 4 special tiers that are used for integrations that don't have a place on the scaled tier list.
This is because they are either an internal part of {% term "Home Assistant Core" %}, they are not in {% term "Home Assistant Core" %} at all, or they don't meet the minimum requirements to be graded against the scaled tiers.

The special tiers are defined as follows.

### ❓ No score

These integrations can be set up through the Home Assistant user interface. The _No score_ designation doesn’t imply that they are bad or buggy, instead, it indicates that they haven’t been assessed according to the quality scale or that they need some maintenance to reach the now-considered minimum _Bronze_ standard.

The _No score_ tier cannot be assigned to new integrations, as they are required to have at least a _Bronze_ level when introduced. The Home Assistant project encourages the community to help update these integrations without a score to meet at least the _Bronze_ level requirements.

Characteristics:

- Not yet scored or lacks sufficient information for scoring.
- Can be set up via the UI, but may need enhancements for a better experience.
- May function correctly, but hasn’t been verified against current standards.
- Documentation most often provides only basic setup steps.

### 🏠 Internal

The internal tier is assigned to integrations used internally by Home Assistant. These integrations provide basic components and building blocks for the Home Assistant Core program or for other integrations to build on top of it.

Internal integrations are maintained by the Home Assistant project and subjected to strict architectural design procedures.

Characteristics:

- Internal, built-in building blocks of the Home Assistant Core program.
- Provides building blocks for other integrations to use and build on top of.
- Maintained by the Home Assistant project.

### 💾 Legacy

Legacy integrations are older integrations that have been part of Home Assistant for many years, possibly since its inception. They can only be configured through {% term YAML %} files and often lack active maintainers (code owners). These integrations might be complex to set up and do not adhere to current/modern end-user expectations in their use and features.

The Home Assistant project encourages the community to help migrate these integrations to the UI and update them to meet modern standards, making these integrations accessible to everyone.

Characteristics:

- Complex setup process; only configurable via {% term YAML %}, without UI-based setup.
- May lack active code ownership and maintenance.
- Could be missing recent updates or bug fixes.
- Documentation may still be aimed at developers.

### 📦 Custom

Custom integrations are developed and distributed by the community, and offer additional functionalities and support for devices and services to Home Assistant. These integrations are not included in the official Home Assistant releases and can be installed manually or via third-party tools like HACS (Home Assistant Community Store).

The Home Assistant project does not review, security audit, maintain, or support third-party custom integrations. Users are encouraged to exercise caution and review the custom integration’s source and community feedback before installation.

Developers are encouraged and invited to contribute their custom integration to the Home Assistant project by aligning them with the integration quality scale and submitting them for inclusion.

Characteristics:

- Not included in the official Home Assistant releases.
- Manually installable or installable via community tools, like <abbr title="Home Assistant Community Store">HACS</abbr>.
- Maintained by individual developers or community members.
- User experience may vary widely.
- Functionality, security, and stability can vary widely.
- Documentation may be limited.
