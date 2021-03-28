---
title: "Standard Security Procedures"
description: "Instructions on how to secure your Home Assistant installation."
---

One major advantage of Home Assistant is that it is not dependent on cloud services. Unlike other cloud-based solutions, with Home Assistant, you are in control of your own data. The decisions you make will affect your security and your privacy. Security applies in all instances. Even if you are only using Home Assistant on a local network, you should take steps to secure your instance.

<div class="info">
Disclaimer: Home Assistant is not your security advisor. Due to continually changing threat landscapes and individual configurations we recommend best practices. The advice given here should be considered as a security baseline and should not represent your entire security profile.
</div>

## Initial Setup

After installation we strongly recommend you perform the following tasks before using the system.

* **Set up [encrypted access](/docs/configuration/securing/#remote-access)**.  Set up HTTPS to encrypt your communication. HTTP will allow eavesdropping on your passwords and other communications.  Make sure it says "https" for your external URL.<br>
{% my general badge %}
* **Ensure all [Updates](/common-tasks/os/#update) are applied**. Running older versions of Home Assistant can expose you to vulnerabilities that have been resolved in a newer release but could be exploitable until you update. You can check your version in the Home Assistant Info screen.
{% my info badge %}
* **Secure all access methods**. Some installation methods have dependencies on Terminals, SSH and other access methods. It is best to remove or secure these access methods when unused or not needed.  

## Configuration Changes

Configuration changes carry risk. These risks can be reduced by performing the following tasks.

* **Perform pre- and post-[Snapshots](/common-tasks/os/#snapshots).** In the event a configuration change needs to be reverted, you can easily revert using snapshots.
{% my supervisor_snapshots badge %}
* **Run [configuration checks](/common-tasks/os/#configuration-check).** After making configuration changes, you should ensure your configuration is valid so it will operate as expected.
{% my server_controls badge %}
* **Use built-in [secrets](/docs/configuration/secrets/) handling.** When requesting help from the [forums](https://community.home-assistant.io/) you will want to share your configuration. Secrets reduce your risk of exposure of sensitive data. Alternatively, many integrations can be set up via the user interface and will accept your password outside of your `configuration.yaml`. Check your integrations to see if they support this.
{% my integrations badge %}

## Maintenance

Your system is your own responsibility. You should perform regular [Software Updates](/common-tasks/os/#update) along with maintenance to ensure your system is secure. Many of these tasks can be automated. Your specific setup will dictate additional tasks.

* **Perform [Snapshots](/common-tasks/os/#snapshots).** Snapshots are a quick way to get your system back up and running in the event of failure.
{% my supervisor_snapshots badge %}
* **Check [Home Assistant Alerts](https://alerts.home-assistant.io/).** An informed user is able to make better decisions than an uninformed user.
* **Read the [Release Notes](https://github.com/home-assistant/operating-system/releases/).** Breaking changes can occur during updates and the release notes are Home Assistant's way of notifying you of these changes.
* **Update [Encryption Certificates](/docs/configuration/securing/#remote-access).** TLS certs expire on a regular basis. Once expired your browser will not recognize them as valid.
* **Ensure all add-ons are updated.** Running old versions of add-ons can lead to exploitable vulnerabilities which are not present in current versions.
{% my supervisor badge %}
* **Prune Integrations/add-ons.** Remove unused Integrations and add-ons to reduce your risk of exposure.
{% my supervisor badge %}

## Data/Privacy Recovery

Most problems with Home Assistant can be solved by restoring data from a point in time where the problem didn't exist. There are many problems which restoring cannot fix and every problem has a proper solution, given ample planning and understanding. While it is impossible to provide all details and scenarios given individual user configurations, network environments, physical access to machines and other such variables, we can only provide a high-level overview of recovery techniques. As in all scenarios, [Home Assistant Alerts](https://alerts.home-assistant.io/) and your local requirements will provide more information than the generic advice given below.

### Disaster Recovery

| issue type | Solution|
|---|---|
| Physical damage | [Replace hardware](https://www.home-assistant.io/installation/), [restore a backup](https://www.home-assistant.io/common-tasks/os/#restoring-a-snapshot-on-a-new-install). |
| Configuration issue | [restore a backup](https://www.home-assistant.io/common-tasks/os/#restoring-a-snapshot-on-a-new-install).|

### Data Leakage Recovery

| issue type | Solution|
|---|---|
| Cloud Service Data Breach | Change Cloud Service authentication. |
| Local Home Assistant Data Breach | [Restore a backup](https://www.home-assistant.io/common-tasks/os/#restoring-a-snapshot-on-a-new-install) and [change Home Assistant authentication](https://www.home-assistant.io/docs/locked_out/#home-assistant-including-supervised) |

### Off-Site backups

On-site/on-device backups are fast, cheap and easy, but in the event of physical damage to your hardware such as a natural disaster, you may not have access to any on-site data. It is recommended to store, at least some, backups off-site. You can choose USB sticks, hard drives, a cloud provider, multiple providers, or any method to physically transport the data to a separate and secure location. Any and all methods of storage can be used in your Backup Rotation Scheme. You can find multiple add-ons to [assist with off-site backup in the forums](https://community.home-assistant.io/search?q=tag%3Ahassio-addon%20backup%20).

### Backup Rotation Scheme

Nobody has unlimited storage. Disks can fill up, and cloud storage can be expensive. Because Home Assistant is intended to be the only solution you will ever need, eventually, you will run out of space. The solution to balancing the storage requirements and duration of backups is a proper [Backup Rotation Scheme](https://en.wikipedia.org/wiki/Backup_rotation_scheme). A good rotation scheme, like [daily, weekly, monthly](https://en.wikipedia.org/wiki/Backup_rotation_scheme#Grandfather-father-son), will ensure you have access to the latest backups and you are able to locate a backup prior to any issue you may encounter.

## Remote Access

If you want secure remote access, the easiest option is to use [Home Assistant cloud](/cloud/) by which you also [support](https://www.nabucasa.com/about) the founders of Home Assistant.

To expose your instance to the internet, use a [VPN](https://pivpn.dev/), or an [SSH tunnel](/blog/2017/11/02/secure-shell-tunnel/). Make sure to expose the used port in your router. Other options are to use TLS/SSL via the add-ons [Duck DNS integrating Let's Encrypt](/integrations/duckdns/) or [Let’s Encrypt](/docs/ecosystem/certificates/lets_encrypt/).

[Read more](/docs/configuration/remote/) about Remote Access to determine which solution is best for you.
