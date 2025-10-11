---
title: "Esquema de Blueprint"
description: "Aprenda sobre o esquema YAML usado para criar blueprints válidos."
---

Esta seção descreve o esquema YAML usado para criar um blueprint válido. Para uma introdução de alto nível sobre o que são blueprints, consulte a seção [Sobre blueprints](/docs/blueprint/).

## Esquema

Um blueprint é definido em um arquivo YAML. O arquivo deve conter um objeto com uma chave `blueprint`. Esta chave contém o esquema do blueprint.

O esquema do blueprint tem as seguintes chaves:

- **name:** (Obrigatório) O nome do blueprint.
- **description:** (Obrigatório) Uma descrição do que o blueprint faz.
- **domain:** (Obrigatório) O domínio do blueprint. Pode ser `automation` ou `script`.
- **input:** (Opcional) Uma lista de entradas que o blueprint aceita.
- **source_url:** (Opcional) A URL do blueprint. Isso é útil para compartilhar seus blueprints com outras pessoas.

## Entradas

As entradas são os valores configuráveis em um blueprint. Eles permitem que os usuários personalizem o blueprint para suas necessidades específicas.

Cada entrada é definida com um nome e um seletor. O nome é usado para se referir à entrada no blueprint. O seletor define o tipo de entrada, como uma entidade, dispositivo ou valor numérico.

Existem muitos tipos diferentes de seletores disponíveis. Consulte a documentação [Seletores de Blueprint](/docs/blueprint/selectors/) para obter uma lista completa de todos os seletores disponíveis.

## Usando entradas

Você pode usar as entradas em seu blueprint usando a sintaxe `!input`. Por exemplo, para usar uma entrada chamada `my_entity`, você usaria `!input my_entity`.

As entradas podem ser usadas em qualquer lugar em seu blueprint, incluindo em nomes de serviços, dados de serviços e modelos.

## Exemplo de blueprint

Aqui está um exemplo de um blueprint simples que liga uma luz quando um sensor de movimento é acionado:

```yaml
blueprint:
  name: Luz de movimento
  description: Liga uma luz quando o movimento é detectado.
  domain: automation
  input:
    motion_sensor:
      name: Sensor de movimento
      selector:
        entity:
          domain: binary_sensor
          device_class: motion
    target_light:
      name: Luz alvo
      selector:
        target:
          entity:
            domain: light
  trigger:
    - platform: state
      entity_id: !input motion_sensor
      to: 'on'
  action:
    - service: light.turn_on
      target: !input target_light
```

Este blueprint tem duas entradas: `motion_sensor` e `target_light`. A entrada `motion_sensor` é um seletor de entidade que permite ao usuário selecionar um sensor de movimento. A entrada `target_light` é um seletor de alvo que permite ao usuário selecionar uma luz.

O gatilho e a ação do blueprint usam as entradas para especificar o sensor de movimento e a luz a serem usados.
