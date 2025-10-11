---
title: "Perguntas Frequentes sobre Energia"
description: "Respostas a perguntas frequentes sobre o recurso de gerenciamento de energia do Home Assistant."
---

Esta página contém respostas a perguntas frequentes sobre o recurso de gerenciamento de energia do Home Assistant.

## Por que meus custos de energia não estão corretos?

Existem algumas razões pelas quais seus custos de energia podem não estar corretos.

- **Preço da eletricidade:** Certifique-se de que seu sensor de preço da eletricidade está configurado corretamente e está fornecendo o preço correto.
- **Tarifas:** Se você tiver tarifas diferentes para horários de pico e fora de pico, precisará configurar isso na seção de energia de sua configuração.
- **Impostos e taxas:** O recurso de gerenciamento de energia não leva em conta impostos e taxas. Se você quiser incluir isso em seus custos, precisará criar um sensor de modelo que adicione esses custos ao seu preço de eletricidade.

## Como faço para dividir meu consumo por tarifas?

Se você tiver tarifas diferentes para horários de pico e fora de pico, poderá configurar isso na seção de energia de sua configuração.

Você precisará criar sensores separados para seu consumo de pico e fora de pico. Você pode fazer isso usando a integração `utility_meter`.

Depois de ter os sensores para seu consumo de pico e fora de pico, você pode selecioná-los na seção de energia de sua configuração.

## Como faço para acompanhar o consumo de dispositivos individuais?

Você pode acompanhar o consumo de dispositivos individuais adicionando-os ao painel de energia.

Para fazer isso, você precisará de um sensor que meça o consumo de energia do dispositivo. Podem ser medidores de energia inteligentes, plugues inteligentes com monitoramento de energia ou outros dispositivos que relatam o consumo de energia.

Depois de ter um sensor para o dispositivo, você pode adicioná-lo ao painel de energia na seção de energia de sua configuração.

## Como faço para redefinir meus dados de energia?

Se você quiser redefinir seus dados de energia, pode fazer isso usando o serviço `recorder.purge`. Este serviço excluirá todos os dados do seu banco de dados.

Tenha cuidado ao usar este serviço, pois ele não pode ser desfeito.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre o recurso de gerenciamento de energia, incluindo uma lista de todas as opções de configuração disponíveis.
