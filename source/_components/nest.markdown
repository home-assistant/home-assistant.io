---
layout: page
title: "Nest"
description: "Instructions how to integrate Nest into Home Assistant."
date: 2016-01-29 21:57
sidebar: true
comments: false
sharing: true
footer: true
logo: nest.png
ha_category: Hub
featured: true
---

The Nest component is the main component to integrate all [Nest](https://nest.com/) related platforms. To connect Nest, you will have to [sign up for a developer account](https://developers.nest.com/products) and get a client_id and client_secret.

###Setting up developer account
1. Log into https://developers.nest.com/
2. Fill in account details 
  - The compnay details can be any made up information.
3. Submit changes
4. Click "[Products](https://developers.nest.com/products)" at top of page
5. Click "[Create New Product](https://developers.nest.com/products/new)" to start a new api client
6. Fill in details
  - Product name must be unique. I recommend [email] - Home Assistant.
  - The description, users, urls can all be anything you want
7. For permissions check every box and if it's an option select the read/write option.
  - The description requires a specific format to be accepted.
    - Use "[Home Assistant] [Edit] [For Home Automation]" as the description as it is not super important.
8. Click "Create Product"
9. Once the new product page opens the "Product ID" and "Product Secret" are located on the right side.
10. After these configs are updated and Home Assistant is started a configurator will pop up asking you to log in and copy a authorization code into Home Assistant.



```yaml
# Example configuration.yaml entry
nest:
  client_id: CLIENT_ID
  client_secret: CLIENT_SECRET
```

```yaml
# Example configuration.yaml entry to show only devices at your vacation and primary homes
nest:
  client_id: CLIENT_ID
  client_secret: CLIENT_SECRET
  structure:
    - Vacation
    - Primary
```

Configuration variables:

- **client_id** (*Required*): Your Nest developer client id.
- **client_secret** (*Required*): Your Nest developer client secret.
- **structure** (*Optional*): The structure or structures you would like to include devices from. If not specified, this will include all structures in your Nest account.
