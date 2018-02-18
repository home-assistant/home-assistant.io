---
layout: page
title: "GIT pull"
description: "Load and update configuration files for Home Assistant from a GIT repository."
date: 2017-09-25 14:00
sidebar: true
comments: false
sharing: true
footer: true
---

Load and update configuration files for Home Assistant from a GIT repository.

```json
{
  "repository": "https://example.com/my_configs.git",
  "auto_restart": false,
  "repeat": {
    "active": false,
    "interval": 300
  },
  "deployment_key": [
"-----BEGIN RSA PRIVATE KEY-----",
"MIIEowIBAAKCAQEAv3hUrCvqGZKpXQ5ofxTOuH6pYSOZDsCqPqmaGBdUzBFgauQM",
"xDEcoODGHIsWd7t9meAFqUtKXndeiKjfP0MMKsttnDohL1kb9mRvHre4VUqMsT5F",
"...",
"i3RUtnIHxGi1NqknIY56Hwa3id2yk7cEzvQGAAko/t6PCbe20AfmSQczs7wDNtBD",
"HgXRyIqIXHYk2+5w+N2eunURIBqCI9uWYK/r81TMR6V84R+XhtvM",
"-----END RSA PRIVATE KEY-----"
  ],
  "deployment_key_protocol": "rsa"
}
```

- **repository** (*Required*): GIT url to your repository. You have to add .git to your GITHub-Repository-URL (see example Config)
- **auto_restart** (*Optional*): Make a restart of Home-Assistant if the config have change and is valid.
- **repeat/active** (*Optional*): Pull periodic for GIT updates.
- **repeat/interval** (*Optional*): Pull all x seconds and look for changes.
- **deployment_user** (*Optional*): Username to use when authenticating to a repo with a username and password.
- **deployment_password** (*Optional*): Password to use when authenticating to a repo.  Ignored if deployment_user is not set.
- **deployment_key** (*Optional*): A private SSH key that will be used for communication during git operations. This key is mandatory for ssh-accessed repositories, which are the ones with the following pattern: `<user>@<host>:<repository path>`.
- **deployment_key_protocol** (*Optional*): The key protocol. Default is "rsa". Valid protocols are:

  * **dsa**
  * **ecdsa**
  * **ed25519**
  * **rsa**
  
The protocol is typically known by the suffix of the private key --e.g., a key file named `id_rsa` will be a private key using "rsa" protocol.

<p class='note warning'>
You should only use this add-on if you do not have an existing configuration or if your existing configuration is already in a git repository. If the script does not find the necessary git files in your configuration folder, it will delete anything that might be there. Please ensure that there is a `.git` folder before using this. You can verify this by listing the items in the configuration folder including hidden files. The command is `ls -a /config`.
</p>
