**Estrutura:** Find Park ( refParkingSite, EnterDate, ExitDate )

**Desc:** Usuario Busca por vagas no Parking enviando a localização do parking (ex: IPB).

**Importância:** Verificar a taxa de buscas de vagas diárias naquela região/parking.

------------------------------
**Estrutura:** Request Park ( User, refParkingSite, EnterDate, ExitDate )

**Descrição:** Usuário Requisita uma vaga no estacionamento enviando a localização do parking

**Importância:** Verificar a taxa diária de alugueis de vaga realizados naquela região/parking.

------------------------------

**Estrutura:** Parking -> ( User , EnterDate, ExitDate, Price, refParkingSite, refParkingGroup, refParkingSpot )

**Descrição:** Registro do parking completo, contendo todas as informações necessárias sobre a ação do aluguel da vaga.

**Importância:** Realizar análises sobre o processo de parking observando todas as variáveis presentes na ação final.

------------------------------

**Simulação:**

Entradas:   Define uma data/hora de início do sistema.
            Define uma data/hora de fim do sistema.
            Define um valor ran(min,max) randômico de tempo em minutos para uma nova solicitação de usuário.

------------------------------

**Funções:**

A cada ran(1~5) minutos faz uma chamada de ran(1,10) usuários buscando vagas (Registro de FindPark).
A cada ran(1~30) minutos faz uma chamada de ran(1,5) usuários requisitando vagas (Registro de RequestPark).

OBS: A solicitação deverá conter um ran(1~3) horas de duração do parking.

Registra o parking solicitado se for possível ( Registro de Parking )

------------------------------

**Problemas a serem considerados:**

Não obter usuários que estejam com parking ativo.
Não fornecer spots que estejam com parking ativo.

Liberar Spot quando seu horário de término for alcançado ( dentro da função de atualizar horário ).

------------------------------

### Generated CSV from Simulator:

<p> </p>
#### Parking Groups Use
<img src="/src/examples/parkingByGroup.png">

<p> </p>
#### Parking Use for 1 day ( 24 hours )
<img src="/src/examples/parkingDay.png">

<p> </p>
#### Parking Use for 30 days
<img src="/src/examples/parkingMonth.png">