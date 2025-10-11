---
title: "Remoto"
description: "Como configurar o componente remoto no Home Assistant."
---

O componente `remote` no Home Assistant permite que você controle dispositivos remotos, como TVs, aparelhos de som e aparelhos de ar condicionado.

## Configurando uma plataforma remota

Para usar o componente `remote`, você precisará configurar uma plataforma remota. Existem muitas plataformas remotas diferentes disponíveis, cada uma projetada para funcionar com um tipo específico de dispositivo.

Por exemplo, a plataforma `broadlink` permite que você controle dispositivos que usam sinais infravermelhos (IR), como TVs e aparelhos de ar condicionado. A plataforma `harmony` permite que você controle dispositivos que são compatíveis com os hubs Logitech Harmony.

Consulte a documentação para sua plataforma remota específica para obter instruções sobre como configurá-la.

## Enviando comandos

Depois de configurar uma plataforma remota, você pode usar o serviço `remote.send_command` para enviar comandos para seus dispositivos.

O serviço `remote.send_command` requer um `entity_id` para o dispositivo remoto que você deseja controlar e um `command` a ser enviado. O formato do comando dependerá da plataforma remota que você está usando.

Aqui está um exemplo de como usar o serviço `remote.send_command` para ligar uma TV:

```yaml
action:
  - service: remote.send_command
    target:
      entity_id: remote.my_tv
    data:
      command: "power_on"
```

## Aprendendo comandos

Muitas plataformas remotas suportam o aprendizado de comandos de seus controles remotos existentes. Isso permite que você ensine ao Home Assistant os comandos para seus dispositivos, mesmo que eles não sejam suportados diretamente.

Para aprender um comando, você normalmente usará o serviço `remote.learn_command`. Este serviço colocará seu dispositivo remoto no modo de aprendizado. Você então precisará apontar seu controle remoto para o dispositivo e pressionar o botão que deseja que o Home Assistant aprenda.

Consulte a documentação para sua plataforma remota específica para obter instruções sobre como aprender comandos.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como usar o componente `remote`, incluindo uma lista de todas as plataformas remotas disponíveis e como configurar e usar cada uma.
