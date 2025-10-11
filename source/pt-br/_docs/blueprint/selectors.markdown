---
title: "Seletores de Blueprint"
description: "Aprenda sobre os diferentes seletores que você pode usar em seus blueprints."
---

Os seletores de blueprint são usados para criar campos de entrada na interface do usuário para seus blueprints. Eles permitem que os usuários selecionem entidades, dispositivos, valores e muito mais.

Existem muitos tipos diferentes de seletores disponíveis, cada um com suas próprias opções de configuração.

## Tipos de seletores

Aqui está uma lista de alguns dos seletores mais comuns:

- **entity:** Permite ao usuário selecionar uma única entidade.
- **device:** Permite ao usuário selecionar um único dispositivo.
- **area:** Permite ao usuário selecionar uma única área.
- **target:** Permite ao usuário selecionar uma ou mais entidades, dispositivos ou áreas.
- **number:** Permite ao usuário inserir um valor numérico.
- **text:** Permite ao usuário inserir um valor de texto.
- **boolean:** Permite ao usuário selecionar um valor booleano (verdadeiro/falso).
- **time:** Permite ao usuário selecionar um horário.
- **date:** Permite ao usuário selecionar uma data.
- **datetime:** Permite ao usuário selecionar uma data e hora.
- **action:** Perme ao usuário especificar uma sequência de ações.
- **condition:** Permite ao usuário especificar uma condição.
- **trigger:** Permite ao usuário especificar um gatilho.

## Configuração do seletor

Cada seletor tem suas próprias opções de configuração. Por exemplo, o seletor `entity` permite que você filtre as entidades que o usuário pode selecionar por domínio, classe de dispositivo e muito mais.

Consulte a documentação do Home Assistant para obter uma lista completa de todos os seletores disponíveis e suas opções de configuração.

## Exemplo de seletor

Aqui está um exemplo de como usar o seletor `entity` para permitir que o usuário selecione um sensor de movimento:

```yaml
input:
  motion_sensor:
    name: Sensor de movimento
    selector:
      entity:
        domain: binary_sensor
        device_class: motion
```

Este seletor exibirá um menu suspenso de todos os sensores binários com a classe de dispositivo "movimento".

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre seletores de blueprint, incluindo uma lista completa de todos os seletores disponíveis e suas opções de configuração.
