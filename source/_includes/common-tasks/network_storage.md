## Network storage

You can configure both Network File Share (NFS) and Windows samba (CIFS) targets to be used within Home Assistant and add-ons.
To list all your currently connected network storages, go to **{% my storage title="Settings > System > Storage" %}** in the UI.

{% if page.installation == "os" %}

<div class='note'>
  You need to update to Home Assistant Operating System 10.2 before you can use this feature.
</div>

{% endif %}

<p class='img'>
  <picture>
    <source srcset="/images/screenshots/network-storage/list_dark.png" media="(prefers-color-scheme: dark)">
    <img src="/images/screenshots/network-storage/list_light.png">
  </picture>
  Screenshot of the list of network shares inside the storage panel.
</p>

### Add a new network storage

1. Go to **{% my storage title="Settings > System > Storage" %}** in the UI.
1. Select **Add network storage**.
1. Fill out all the information for your network storage.
1. Select **Connect**.

<p class='img'>
  <picture>
    <source srcset="/images/screenshots/network-storage/connect_dark.png" media="(prefers-color-scheme: dark)">
    <img src="/images/screenshots/network-storage/connect_light.png">
  </picture>
  Screenshot of connecting a new network storage.
</p>

#### Network storage configuration

{% configuration_basic "hassio.network_share" %}
Name:
  description: This is the name that will be used for the mounted directory on your system.
Usage:
  description: Here, you select how the target should be used.
Server:
  description: The IP/hostname of the server running NFS/CIFS.
Protocol:
  description: The service the server is using for the network storage.
"[NFS]<sup>1</sup> Remote share path":
  description: The path used to connect to the remote storage server.
"[CIFS]<sup>2</sup> Username":
  description: The username to use when connecting to the storage server.
"[CIFS]<sup>2</sup> Password":
  description: The password to use when connecting to the storage server.
"[CIFS]<sup>2</sup> Share":
  description: The share to connect to on the storage server.
{% endconfiguration_basic %}

<sup>1</sup> _Options prefixed with `[NFS]` is only available for NFS targets._<br>
<sup>2</sup> _Options prefixed with `[CIFS]` is only available for CIFS targets._

### Change default backup location

By default, the first network storage of type **Backup** that you add will be set as your default backup target.

If you want to change the default backup target, you can do the following:

1. Go to **{% my backup title="Settings > System > Backups" %}** in the UI.
1. Select the menu in the top right of the screen and select the **Change default backup location** option.
1. In the dialog, there is a single option to set the default backup target.
1. Choose the one you want from the list.
1. Select **Save**.

This list will contain all the network storage targets you have added of usage type **Backup**. It also contains another option to set it back to use `/backup` again.

<p class='img'>
  <picture>
    <source srcset="/images/screenshots/network-storage/change_backup_dark.png" media="(prefers-color-scheme: dark)">
    <img src="/images/screenshots/network-storage/change_backup_light.png">
  </picture>
  Screenshot of changing the default backup target.
</p>
