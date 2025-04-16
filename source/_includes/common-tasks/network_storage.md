## Network storage

You can configure both Network File System (NFS) and Samba/Windows (CIFS) targets to be used within Home Assistant and add-ons.
To list all your currently connected network storages, go to **{% my storage title="Settings > System > Storage" %}** in the UI.

{% if page.installation == "os" %}

{% important %}
You need to update to Home Assistant Operating System 10.2 before you can use this feature.
{% endimportant %}

{% else %}

{% important %}

You need to make sure you run a supported {% term "Home Assistant Supervised" %} installation with the latest version of the [os-agent](https://github.com/home-assistant/os-agent). Make sure that your supervisor uses [slave bind propagation](https://docs.docker.com/storage/bind-mounts/#configure-bind-propagation) for the data volume.

{% endimportant %}

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
2. Select **Add network storage**.
3. Fill out all the information for your network storage.
4. Select **Connect**.

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
  description: Here, you select how the target should be used. [See usage types below](#usage-types)
Server:
  description: The IP/hostname of the server running NFS/CIFS.
"Protocol<sup>3</sup>":
  description: The service the server is using for the network storage.
"[NFS]<sup>1</sup> Remote share path":
  description: The path used to connect to the remote storage server.
"[CIFS]<sup>2</sup> Username":
  description: "The username to use when connecting to the storage server. Use User Principal Name for domain accounts. For example: `user@domain.com`."
"[CIFS]<sup>2</sup> Password":
  description: The password to use when connecting to the storage server.
"[CIFS]<sup>2</sup> Share":
  description: The share to connect to on the storage server.
{% endconfiguration_basic %}

<sup>1</sup> _Options prefixed with `[NFS]` are only available for NFS targets._<br>
<sup>2</sup> _Options prefixed with `[CIFS]` are only available for CIFS targets._<br>
<sup>3</sup> _For the `CIFS` option, only version 2.1+ is supported._<br>

##### Usage types

{% configuration_basic "hassio.network_share.usage" %}
Backup:
  description: This will become a target. You can use it when creating an automatic or manual backup. The first storage you add of this type becomes your new default target. If you want to change the default target, [check out the documentation below](#change-default-local-backup-location).
Media:
  description: A new directory with the name you gave your network storage will be created under `/media`. This directory can be accessed by Home Assistant and add-ons.
Share:
  description: A new directory with the name you gave your network storage will be created under `/share`.  This directory can be accessed by Home Assistant and add-ons.
{% endconfiguration_basic %}

### Change default local backup location

By default, the first network storage of type **Backup** that you add is used as your local default backup location.

If you want to change the local network storage that is used to store your backups, follow these steps:

1. Go to **{% my backup title="Settings > System > Backups" %}**.
2. In the top-right corner, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Change local backup location**.
3. Select your preferred network location and save your changes.
   ![Select default location used for local backup](/images/screenshots/network-storage/backup_select_local_default.png)
4. **Troubleshooting**: Don't see your external storage location? This list contains only the network storage targets you have added of type **Backup**.
