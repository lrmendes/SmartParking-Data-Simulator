```python
# V5 -> Adicao de Clima Atual no momento do estacionamento, baseado em dataset de cidades americanas:
#https://www.kaggle.com/selfishgene/historical-hourly-weather-data?select=weather_description.csv

# Variáveis Iniciais do Sistema
initial_date = "01-01-2013"
final_date = "31-12-2017"

# Regioes e Locais cadastrados no sistemas de SmartParking
parkings_data = [
    {
        "parking": "Bus Station",
        "weather_city": "Vancouver",
        "regions": [
            {
                "name": "Main",
                "open_time": "00:00",
                "close_time": "23:50",
                "max_slots": 250,
                
                "parking_time_min": 5,
                "parking_time_average": 15,
                "parking_time_max": 60,
                
                "weekday_flow": 1.0,
                "weekend_flow": 1.35,
                
                "rainy_flow": 1.2,
                
                "months_flow": {
                    "January": 1.7,
                    "February": 1.4,
                    "March": 1.15,
                    "April": 0.8,
                    "May": 0.9,
                    "June": 1.0,
                    "July": 0.9,
                    "August": 1.2,
                    "September": 1.1,
                    "October": 1.0,
                    "November": 1.15,
                    "December": 1.4
                },
                
                "holidays_flow": [
                    {"date": "01-01", "flow": 2.4 },
                    {"date": "10-04", "flow": 2.0 },
                    {"date": "12-04", "flow": 1.4 },
                    {"date": "21-04", "flow": 1.4 },
                    {"date": "01-05", "flow": 2.2 },
                    {"date": "11-06", "flow": 1.4 },
                    {"date": "07-09", "flow": 2.0 },
                    {"date": "15-09", "flow": 1.5 },
                    {"date": "12-10", "flow": 1.9 },
                    {"date": "28-10", "flow": 1.7 },
                    {"date": "02-11", "flow": 1.8 },
                    {"date": "15-11", "flow": 2.1 },
                    {"date": "25-12", "flow": 1.6 },
                ],
                
                "year_increase_flow_max": 0.08,
                "year_decrease_flow_max": 0.04,
                
                "rush_range": [
                    {
                        "start": "6:00",
                        "finish": "7:30",
                        "flow": 2.6
                    },
                    {
                        "start": "18:00",
                        "finish": "19:00",
                        "flow": 1.8
                    },
                    {
                        "start": "22:00",
                        "finish": "23:00",
                        "flow": 2.3
                    },
                    
                ]
            }
        ]
    }
]
```


```python
# Importações de Bibliotecas Necessárias
import pandas as pd
import numpy as np
import time

from datetime import datetime
from datetime import timedelta  

from random import seed
from random import randint
from random import uniform

from matplotlib import pyplot as plt
import seaborn as sns

import matplotlib.dates as md
```


```python
# Importa dataset de climas para cada regiao

print("Reading CSV...")
weather_df = pd.read_csv('weather_description.csv')

print("Done!")
weather_df
```

    Reading CSV...
    Done!
    




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>datetime</th>
      <th>Vancouver</th>
      <th>Portland</th>
      <th>San Francisco</th>
      <th>Seattle</th>
      <th>Los Angeles</th>
      <th>San Diego</th>
      <th>Las Vegas</th>
      <th>Phoenix</th>
      <th>Albuquerque</th>
      <th>...</th>
      <th>Philadelphia</th>
      <th>New York</th>
      <th>Montreal</th>
      <th>Boston</th>
      <th>Beersheba</th>
      <th>Tel Aviv District</th>
      <th>Eilat</th>
      <th>Haifa</th>
      <th>Nahariyya</th>
      <th>Jerusalem</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2012-10-01 12:00:00</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>haze</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2012-10-01 13:00:00</td>
      <td>mist</td>
      <td>scattered clouds</td>
      <td>light rain</td>
      <td>sky is clear</td>
      <td>mist</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>...</td>
      <td>broken clouds</td>
      <td>few clouds</td>
      <td>overcast clouds</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>haze</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2012-10-01 14:00:00</td>
      <td>broken clouds</td>
      <td>scattered clouds</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>...</td>
      <td>broken clouds</td>
      <td>few clouds</td>
      <td>sky is clear</td>
      <td>few clouds</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>broken clouds</td>
      <td>overcast clouds</td>
      <td>sky is clear</td>
      <td>overcast clouds</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2012-10-01 15:00:00</td>
      <td>broken clouds</td>
      <td>scattered clouds</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>...</td>
      <td>broken clouds</td>
      <td>few clouds</td>
      <td>sky is clear</td>
      <td>few clouds</td>
      <td>overcast clouds</td>
      <td>sky is clear</td>
      <td>broken clouds</td>
      <td>overcast clouds</td>
      <td>overcast clouds</td>
      <td>overcast clouds</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2012-10-01 16:00:00</td>
      <td>broken clouds</td>
      <td>scattered clouds</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>...</td>
      <td>broken clouds</td>
      <td>few clouds</td>
      <td>sky is clear</td>
      <td>few clouds</td>
      <td>overcast clouds</td>
      <td>sky is clear</td>
      <td>broken clouds</td>
      <td>overcast clouds</td>
      <td>overcast clouds</td>
      <td>overcast clouds</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>45248</th>
      <td>2017-11-29 20:00:00</td>
      <td>NaN</td>
      <td>broken clouds</td>
      <td>NaN</td>
      <td>light rain</td>
      <td>sky is clear</td>
      <td>broken clouds</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>broken clouds</td>
      <td>...</td>
      <td>scattered clouds</td>
      <td>NaN</td>
      <td>broken clouds</td>
      <td>broken clouds</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>45249</th>
      <td>2017-11-29 21:00:00</td>
      <td>NaN</td>
      <td>broken clouds</td>
      <td>NaN</td>
      <td>overcast clouds</td>
      <td>sky is clear</td>
      <td>broken clouds</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>broken clouds</td>
      <td>...</td>
      <td>scattered clouds</td>
      <td>NaN</td>
      <td>scattered clouds</td>
      <td>broken clouds</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>45250</th>
      <td>2017-11-29 22:00:00</td>
      <td>NaN</td>
      <td>broken clouds</td>
      <td>NaN</td>
      <td>broken clouds</td>
      <td>sky is clear</td>
      <td>broken clouds</td>
      <td>sky is clear</td>
      <td>sky is clear</td>
      <td>broken clouds</td>
      <td>...</td>
      <td>scattered clouds</td>
      <td>NaN</td>
      <td>few clouds</td>
      <td>broken clouds</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>45251</th>
      <td>2017-11-29 23:00:00</td>
      <td>NaN</td>
      <td>broken clouds</td>
      <td>NaN</td>
      <td>broken clouds</td>
      <td>sky is clear</td>
      <td>broken clouds</td>
      <td>sky is clear</td>
      <td>broken clouds</td>
      <td>overcast clouds</td>
      <td>...</td>
      <td>few clouds</td>
      <td>NaN</td>
      <td>few clouds</td>
      <td>few clouds</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>45252</th>
      <td>2017-11-30 00:00:00</td>
      <td>NaN</td>
      <td>broken clouds</td>
      <td>NaN</td>
      <td>few clouds</td>
      <td>sky is clear</td>
      <td>broken clouds</td>
      <td>sky is clear</td>
      <td>broken clouds</td>
      <td>overcast clouds</td>
      <td>...</td>
      <td>sky is clear</td>
      <td>NaN</td>
      <td>few clouds</td>
      <td>broken clouds</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
<p>45253 rows × 37 columns</p>
</div>




```python
rain_values = [
"drizzle","fog","freezing rain","heavy intensity drizzle","heavy intensity rain","heavy intensity shower rain",
"heavy shower snow","heavy snow","heavy thunderstorm","light intensity drizzle","light intensity drizzle rain",
"light intensity shower rain","light rain","light rain and snow","light shower sleet","light shower snow",
"light snow","moderate rain","proximity moderate rain","proximity shower rain","proximity thunderstorm",
"proximity thunderstorm with drizzle","proximity thunderstorm with rain","ragged shower rain",
"ragged thunderstorm","rain and snow","shower drizzle","shower rain","shower snow","sleet","snow","squalls",
"thunderstorm","thunderstorm with drizzle","thunderstorm with heavy drizzle","thunderstorm with heavy rain",
"thunderstorm with light drizzle","thunderstorm with light rain","thunderstorm with rain","very heavy rain"
]

"""
# Listar todos os diferentes tipos de clima registrados no dataset 
unique_weather = []
for col in weather_df.columns:
    if (col != 'datetime'):
        unique_vals = weather_df[col].unique()
        for val in unique_vals:
            if not pd.isnull(val):
                if val not in unique_weather:
                    unique_weather.append(val)         
unique_weather.sort()

for i in unique_weather:
    print(i)
"""
    
print("Values considered as rain:\n", rain_values)
```

    Values considered as rain:
     ['drizzle', 'fog', 'freezing rain', 'heavy intensity drizzle', 'heavy intensity rain', 'heavy intensity shower rain', 'heavy shower snow', 'heavy snow', 'heavy thunderstorm', 'light intensity drizzle', 'light intensity drizzle rain', 'light intensity shower rain', 'light rain', 'light rain and snow', 'light shower sleet', 'light shower snow', 'light snow', 'moderate rain', 'proximity moderate rain', 'proximity shower rain', 'proximity thunderstorm', 'proximity thunderstorm with drizzle', 'proximity thunderstorm with rain', 'ragged shower rain', 'ragged thunderstorm', 'rain and snow', 'shower drizzle', 'shower rain', 'shower snow', 'sleet', 'snow', 'squalls', 'thunderstorm', 'thunderstorm with drizzle', 'thunderstorm with heavy drizzle', 'thunderstorm with heavy rain', 'thunderstorm with light drizzle', 'thunderstorm with light rain', 'thunderstorm with rain', 'very heavy rain']
    


```python
cols = ["parking","region","timeFrom","timeTo","spotWanted","spotWon","isWeekday","isRain","isHoliday"]

date = datetime.strptime(initial_date, '%d-%m-%Y')
end_date = datetime.strptime(final_date, '%d-%m-%Y')

for park in parkings_data:
    for region in park['regions']:
        region['open_time'] = datetime.strptime(region['open_time'], '%H:%M').time()
        region['close_time'] = datetime.strptime(region['close_time'], '%H:%M').time()
        for holyday in region['holidays_flow']:
            holyday['date'] =  datetime.strptime(holyday['date'], '%d-%m').date()
        for rush in region['rush_range']:
            rush['start'] = datetime.strptime(rush['start'], '%H:%M').time()
            rush['finish'] = datetime.strptime(rush['finish'], '%H:%M').time()

print("Start Generating On:", date.strftime('%d-%m-%Y'))
print("Finish Generating On:", end_date.strftime('%d-%m-%Y'))
days_total = (end_date - date).days
print("Total Days: ", days_total)
```

    Start Generating On: 01-01-2013
    Finish Generating On: 31-12-2017
    Total Days:  1825
    


```python
df = pd.DataFrame(columns=cols)

start_time = time.time()
print("Generating Data...\n")

# Zera a lista do estacionamento
parkings = []

# Verifica se o horario atual é um horário de maior fluxo para aquela região    
def is_rush_time(region):
    is_rush = False
    rush_increase = 1
    for rush in region['rush_range']:
        # Verifica se esta no horario de pico do Rush
        if (date.time() >= rush['start'] and date.time() <= rush['finish']):
            is_rush = True
            rush_increase = rush['flow']
            break
        # Verifica se esta à pelo menos 30 minutos antes do Rush (pre-rush)
        elif ( (date + timedelta(minutes=30)).time() >= rush['start'] and (date + timedelta(minutes=30)).time() <= rush['finish'] ):
            is_rush = True
            rush_increase = ((rush['flow'] - 1) / 2) + 1
            # Cria variacao de 15 porcento para mais ou menos (para nao gerar um padrao identico de pré/pós rush)
            last_variation = uniform(-0.1,0.1)
            rush_increase = rush_increase * (1-last_variation)
            break
        # Verifica se esta à pelo menos 30 minutos depois do Rush (pós-rush)
        elif ( (date - timedelta(minutes=30)).time() >= rush['start'] and (date - timedelta(minutes=30)).time() <= rush['finish'] ):
            is_rush = True
            rush_increase = ((rush['flow'] - 1) / 2) + 1
            # Cria variacao de 15 porcento para mais ou menos (para nao gerar um padrao identico de pré/pós rush)
            last_variation = uniform(-0.1,0.1)
            rush_increase = rush_increase * (1-last_variation)
            break   
              
        # Increase Some More Parkings When Nearing to the rush time and Increase Some Parkings time after the end rush's time
        #else if (date.time())
    return is_rush, rush_increase

# Define quantos parkings serao criados em cada execucao dependendo se a regiao esta ou nao em horario de maior fluxo
def add_parkings_by_rush(region):
    is_rush, rush_increase = is_rush_time(region)
    
    add_parkings = randint(1,24)
    if (is_rush):
        # Multiplicacao do anterior OU randint(1,3*increase) *****************
        add_parkings = add_parkings * rush_increase
        #add_parkings = randint(1,int(3*rush_increase))
        
    return add_parkings

# Verifica se é dia de semana / final de semana
def check_weekday(date):
    day = date.strftime('%A')
    if day == "Saturday" or day == "Sunday":
        return 0
    return 1

# Percorre cada Parking cadastrado
for park in parkings_data:
    var_parking = park['parking']
    var_weather = park['weather_city']
    print("Generating Data for Parking: ",var_parking)
    # Percorre cada Região do parking
    for region in park['regions']:
        var_region = region['name']
        print("\tGenerating Data for Region: ",var_region, " ...")
        
        # Obtem os horarios de abertura e fechamento da Região do Parking
        open_time = region['open_time']
        close_time = region['close_time']
        
        # Obtem o tempo minimo e maximo de estacionamentos no local
        parking_time_min = region['parking_time_min']
        parking_time_max = region['parking_time_max']
        parking_time_average = region['parking_time_average']
        if (parking_time_min == None):
            parking_time_min = 15
        if (parking_time_max == None):
            parking_time_max = 300
        if (parking_time_average == None):
            parking_time_average = 60
            
        # Zera lista de spots ocupados no estacionamento
        parking_spots = []
        parking_max_slots = region['max_slots']
        parking_empty_slots = parking_max_slots
        
        for c in range(parking_max_slots):
            parking_spots.append(None)
            
        # Seleciona o dataframe de clima baseado apenas na cidade escolhida pelo estacionamento
        weather = weather_df.copy()
        weather = weather.drop(weather.columns.difference(['datetime',var_weather]), axis=1)
        print("\tSetting the Pattern in Weather City \"",var_weather,"\"...")
        weather['datetime'] = pd.to_datetime(weather['datetime'], errors='ignore')
        weather['datetime'] = pd.to_datetime(weather["datetime"].dt.strftime('%d-%m-%Y %H:%M'))
        weather.set_index('datetime')
        weather = weather.dropna()
        
        rainy_flow = region['rainy_flow']
        
        # Zera a data de inicio e fim para iniciar a criacao de dados
        date = datetime.strptime(initial_date, '%d-%m-%Y')
        date = date.replace(hour=open_time.hour, minute=open_time.minute)
        
        end_date = datetime.strptime(final_date, '%d-%m-%Y')
        end_date = end_date.replace(hour=close_time.hour, minute=close_time.minute)  
        
        weekday_flow = region['weekday_flow']
        weekend_flow = region['weekend_flow']
        months_flow = region['months_flow']
        
        year_increase_flow_max = region['year_increase_flow_max']
        year_decrease_flow_max = region['year_decrease_flow_max']
        current_year = date.year
        cumulative_year_ratio = 1

        while(date <= end_date):
            
            # Define o percentual de vagas que serao adicionados (inicial 1 = 100%)
            parking_ratio = 1
            
            # [1 - Variaveis de Padronizacao] Calcula Impacto de horarios de alto fluxo (Rush Hours)
            check_rush,rush_increase = is_rush_time(region)
            if (check_rush):
                parking_ratio = parking_ratio * rush_increase

            # [2 - Variaveis de Padronizacao] Calcula Impacto do Fim de Semana (WeekDays/WeekendDays)
            is_weekday = check_weekday(date)
            if (is_weekday == 1):
                parking_ratio = parking_ratio * weekday_flow               
            else:
                parking_ratio = parking_ratio * weekend_flow

            # [3 - Variaveis de Padronizacao] Calcula Impacto do Clima Atual (isRain)
            is_rain = 0
            res = weather[(weather['datetime'] <= date )]
            if (len(res) > 0):
                #print(date,"->",res.iloc[len(res)-1][var_weather])
                if ( res.iloc[len(res)-1][var_weather] in rain_values):
                    is_rain = 1
                    parking_ratio = parking_ratio * rainy_flow
            
            # [4 - Variaveis de Padronizacao] Calcula o Impacto de Feriados (Holidays)
            is_holiday = 0
            for holiday in region['holidays_flow']:
                holiday_date = holiday['date']
                holiday_flow = holiday['flow']
                if (date.day == holiday_date.day and date.month == holiday_date.month):
                    parking_ratio = parking_ratio * holiday_flow * (1 + uniform(-0.1, 0.1))
                    is_holiday = 1
                
            # [5 - Variaveis de Padronizacao] Calcula o Impacto do MES ATUAL no fluxo
            current_month = months_flow[date.strftime('%B')]
            parking_ratio = parking_ratio * current_month * (1-uniform(-0.15,0.15))
            
            # [6 - Variaveis de Padronizacao] Calcula o Impacto do ANO ATUAL no fluxo
            if (date.year != current_year):
                current_year = date.year
                cumulative_year_ratio = cumulative_year_ratio * (1 + uniform(year_decrease_flow_max, year_increase_flow_max))
                print("\t\tCurrent Year: ", current_year)
            parking_ratio = parking_ratio * cumulative_year_ratio
            
            # [7 - Variacao do numero de estacionamentos no fim do dia]
            if ((date + timedelta(minutes=40)).time() >= close_time):
                parking_ratio = parking_ratio * 0.8
            
            # [8 - Variacao Final para nao criar padroes obvios e repetitivos]
            last_variation = uniform(-0.1,0.1)
            bkp = parking_ratio
            parking_ratio = parking_ratio * (1-last_variation)
            
            # Insere estacionamentos na base de dados
            MAX_ADD = 4
            
            park_max = parking_time_max
            park_avg = parking_time_average
                
            # Reduz a chance de ficar mais tempo quanto mais tarde o horario de entrada no estacionamento
            if (close_time.hour - date.hour <= park_avg/60):
                parking_ratio = parking_ratio * 0.7
                        
            add_parkings = 0
            if (int(MAX_ADD*parking_ratio) != 0):
                add_parkings = randint(1,int(MAX_ADD*parking_ratio))
            if (add_parkings == 0):
                add_parkings = 1
            
            while(add_parkings != 0):
                
                # Chance do estaciomamento durar: [ Ate 60min : 70%  | Acima de 60min: 30% ]
                parking_time = randint(parking_time_min,park_avg)
                if (randint(1,10) > 5):
                    parking_time = randint(park_avg,park_max)

                # Cria uma ROW
                row = {'parking': var_parking, 'region': var_region}
                row.update({'isWeekday': is_weekday})
                row.update({'isHoliday': int(str(is_holiday))})
                row.update({'isRain': is_rain})
                row.update({'timeFrom': date.strftime('%d-%m-%Y %H:%M')})

                # Adiciona o Role ***********************************************
                accept_parking = True
                
                validate_date = date + timedelta(minutes=parking_time)

                # Caso o tempo de estacionamento seja maior ou igual o limite do horario do estacionamento
                if (validate_date.hour >= close_time.hour and validate_date.minute >= close_time.minute) or (validate_date.hour > close_time.hour) or (validate_date.hour < open_time.hour):
                    t1 = timedelta(hours=date.hour, minutes=date.minute)
                    t2 = timedelta(hours=close_time.hour, minutes=close_time.minute)
                    new_time = int ( (t2 - t1).total_seconds() / 60 )
                                        
                    # Caso seja um estacionamento ate 15 minutos acima do limite minimo
                    if (new_time <= parking_time_min + 15):
                        if (new_time > 15):
                            new_parking_time = randint(0, (new_time-15) )
                        else:
                            new_parking_time = randint(0, (15-new_time) )
                        validate_date = date.replace(hour=close_time.hour, minute=close_time.minute) - timedelta(minutes=new_parking_time)                  
                                                   
                        set_date = date.replace(hour=validate_date.hour, minute=validate_date.minute)
                        row.update({'timeTo': set_date.strftime('%d-%m-%Y %H:%M') })
                            
                    # Caso seja um estacionamento 15 minutos ou mais acima do limite minimo
                    else:
                        new_parking_time = randint(parking_time_min, new_time-parking_time_min )
                        validate_date = date.replace(hour=close_time.hour, minute=close_time.minute) - timedelta(minutes=new_parking_time)
                        set_date = date.replace(hour=validate_date.hour, minute=validate_date.minute)                    
                        row.update({'timeTo': set_date.strftime('%d-%m-%Y %H:%M')})
                # Caso o tempo final do estacionamento esteja dentro do limite do horario
                else:
                    row.update({'timeTo': validate_date.strftime('%d-%m-%Y %H:%M')})
                    if (date.day != validate_date.day ):
                        accept_parking = False

                # ***********************************************************************************

                # [SPOT NUMBER] Encontra um SpotID vago para o usuario
                spot_found = False
                spot_id = -1

                # Define aleatoriamente um Spot de vaga "Desejado" pelo Usuario
                try_spot = randint(0,parking_max_slots-1)
                row.update({'spotWanted': try_spot})

                # Tenta encontrar em um spot disponivel de forma aleatoria por 10 tentativas
                for c in range(1,10):
                    if (parking_spots[try_spot] == None):
                        spot_found = True
                        spot_id = try_spot
                        parking_spots[spot_id] = datetime.strptime(row['timeTo'], '%d-%m-%Y %H:%M')
                        break
                    try_spot = randint(0,parking_max_slots-1)

                # Caso nao encontre em 10 tentativas aleatorias -> seleciona o primeiro disponivel em ordem crescente
                if not (spot_found):
                    for c in range(len(parking_spots)):
                        if (parking_spots[c] == None):
                            spot_id = c
                            parking_spots[spot_id] = datetime.strptime(row['timeTo'], '%d-%m-%Y %H:%M')
                            break

                row.update({'spotWon': spot_id}) 

                # Finaliza o Role ***********************************************                
                if (spot_id != -1 and accept_parking):
                    parkings.append(row)

                # Libera Espacos vagos no estacionamento
                for c in range(len(parking_spots)):
                    if (parking_spots[c] != None):
                        if (parking_spots[c] <= date):
                            parking_spots[c] = None
                            
                # 
                if (len(parkings) >= 50000):
                    print("\t\t50.000 Generated! ...")
                    df = df.append(parkings, ignore_index=True)
                    parkings = []
                            
                add_parkings -= 1
                
            addMin = randint(0,6)
            date = date + timedelta(minutes=addMin)

            # Verifica se a nova hora e data é valida
            if not(date.time() >= open_time and date.time() <= close_time):
                date = date + timedelta(days=1)
                date = date.replace(hour=open_time.hour, minute=open_time.minute)
            elif ((date + timedelta(minutes=15)).time() >= close_time):
                date = date + timedelta(days=1)
                date = date.replace(hour=open_time.hour, minute=open_time.minute)
                
            if (date >= end_date):
                break
                    
    print("\n")
    
end_time = time.time()
final_time = datetime.fromtimestamp((end_time-start_time))
final_time = final_time.replace(microsecond=0)
df = df.append(parkings, ignore_index=True)
print("\nTime Spent: ",final_time.time())
print("Done!")
```

    Generating Data...
    
    Generating Data for Parking:  Bus Station
    	Generating Data for Region:  Main  ...
    	Setting the Pattern in Weather City " Vancouver "...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		Current Year:  2014
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		Current Year:  2015
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		Current Year:  2016
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		Current Year:  2017
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    		50.000 Generated! ...
    
    
    
    Time Spent:  00:23:59
    Done!
    


```python
df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>parking</th>
      <th>region</th>
      <th>timeFrom</th>
      <th>timeTo</th>
      <th>spotWanted</th>
      <th>spotWon</th>
      <th>isWeekday</th>
      <th>isRain</th>
      <th>isHoliday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>01-01-2013 00:00</td>
      <td>01-01-2013 00:07</td>
      <td>52</td>
      <td>52</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>01-01-2013 00:00</td>
      <td>01-01-2013 00:38</td>
      <td>207</td>
      <td>207</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>01-01-2013 00:00</td>
      <td>01-01-2013 00:45</td>
      <td>13</td>
      <td>13</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>01-01-2013 00:04</td>
      <td>01-01-2013 00:09</td>
      <td>166</td>
      <td>166</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>01-01-2013 00:04</td>
      <td>01-01-2013 00:38</td>
      <td>91</td>
      <td>91</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>3584355</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>31-12-2017 23:31</td>
      <td>31-12-2017 23:48</td>
      <td>53</td>
      <td>53</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3584356</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>31-12-2017 23:31</td>
      <td>31-12-2017 23:43</td>
      <td>109</td>
      <td>109</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3584357</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>31-12-2017 23:34</td>
      <td>31-12-2017 23:49</td>
      <td>211</td>
      <td>211</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3584358</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>31-12-2017 23:34</td>
      <td>31-12-2017 23:43</td>
      <td>45</td>
      <td>45</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3584359</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>31-12-2017 23:34</td>
      <td>31-12-2017 23:49</td>
      <td>231</td>
      <td>231</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>3584360 rows × 9 columns</p>
</div>




```python
dfx = df[df['isRain'] == 1]
print("Total 'Rainy' Parkings:",len(dfx))
dfy = df[df['isRain'] == 0]
print("Total 'Sunny' Parkings:",len(dfy))
```

    Total 'Rainy' Parkings: 1692221
    Total 'Sunny' Parkings: 1892139
    


```python
print("Writing output file...")
df.to_csv('generated_dataset.csv', index=False)
print("Done!")
```

    Writing output file...
    Done!
    


```python
print("Reading CSV...")
df = pd.read_csv('generated_dataset.csv')
print("Setting the Pattern in DateTime Columns...")
df['timeFrom'] = pd.to_datetime(df['timeFrom'], errors='ignore')
df['timeFrom'] = pd.to_datetime(df["timeFrom"].dt.strftime('%d-%m-%Y %H:%M'))

print("Done!")
```

    Reading CSV...
    Setting the Pattern in DateTime Columns...
    Done!
    


```python
df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>parking</th>
      <th>region</th>
      <th>timeFrom</th>
      <th>timeTo</th>
      <th>spotWanted</th>
      <th>spotWon</th>
      <th>isWeekday</th>
      <th>isRain</th>
      <th>isHoliday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>2013-01-01 00:00:00</td>
      <td>01-01-2013 00:07</td>
      <td>52</td>
      <td>52</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>2013-01-01 00:00:00</td>
      <td>01-01-2013 00:38</td>
      <td>207</td>
      <td>207</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>2013-01-01 00:00:00</td>
      <td>01-01-2013 00:45</td>
      <td>13</td>
      <td>13</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>2013-01-01 00:04:00</td>
      <td>01-01-2013 00:09</td>
      <td>166</td>
      <td>166</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>2013-01-01 00:04:00</td>
      <td>01-01-2013 00:38</td>
      <td>91</td>
      <td>91</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>3584355</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>2017-12-31 23:31:00</td>
      <td>31-12-2017 23:48</td>
      <td>53</td>
      <td>53</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3584356</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>2017-12-31 23:31:00</td>
      <td>31-12-2017 23:43</td>
      <td>109</td>
      <td>109</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3584357</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>2017-12-31 23:34:00</td>
      <td>31-12-2017 23:49</td>
      <td>211</td>
      <td>211</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3584358</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>2017-12-31 23:34:00</td>
      <td>31-12-2017 23:43</td>
      <td>45</td>
      <td>45</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3584359</th>
      <td>Bus Station</td>
      <td>Main</td>
      <td>2017-12-31 23:34:00</td>
      <td>31-12-2017 23:49</td>
      <td>231</td>
      <td>231</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>3584360 rows × 9 columns</p>
</div>




```python
df1 = df.copy()
df1 = df1[['timeFrom','isWeekday']]

print("Setting the Pattern in DateTime Columns...")
df1['timeFrom'] = pd.to_datetime(df1['timeFrom'], errors='ignore')

print("Grouping by Day...")
df1 = df1.groupby(df1['timeFrom'].dt.date).size().reset_index(name='TotalParkings')

print("Done!")
df1
```

    Setting the Pattern in DateTime Columns...
    Grouping by Day...
    Done!
    




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>timeFrom</th>
      <th>TotalParkings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2013-01-01</td>
      <td>5070</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2013-01-02</td>
      <td>2236</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2013-01-03</td>
      <td>2134</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2013-01-04</td>
      <td>2187</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2013-01-05</td>
      <td>2850</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>1821</th>
      <td>2017-12-27</td>
      <td>2066</td>
    </tr>
    <tr>
      <th>1822</th>
      <td>2017-12-28</td>
      <td>2255</td>
    </tr>
    <tr>
      <th>1823</th>
      <td>2017-12-29</td>
      <td>2138</td>
    </tr>
    <tr>
      <th>1824</th>
      <td>2017-12-30</td>
      <td>2953</td>
    </tr>
    <tr>
      <th>1825</th>
      <td>2017-12-31</td>
      <td>2851</td>
    </tr>
  </tbody>
</table>
<p>1826 rows × 2 columns</p>
</div>




```python
df4 = df1.copy()
df4['timeFrom'] = pd.to_datetime(df4['timeFrom'], errors='ignore')
df4 = df4[df4['timeFrom'].dt.year == 2013]
df4 = df4.set_index('timeFrom')

plt.subplots(figsize=(20,6))
plt.title("\n[Only 2013] Dataset Parkings - Grouped by Day", fontsize=20, pad=20)
plt.xlabel("Date", fontsize=16, labelpad=20)
plt.ylabel("Total", fontsize=16, labelpad=20)
plt.xticks(rotation=45)
plt.margins(x=0)
plt.figure(1).set_facecolor((1, 1, 1))
plt.plot(df4)
```




    [<matplotlib.lines.Line2D at 0x2dc11c31688>]




![png](output_12_1.png)



```python
df3 = df1.copy()
df3 = df3.set_index('timeFrom')

plt.subplots(figsize=(15,6))

plt.title("\nAll Dataset Parkings - Grouped by Day", fontsize=20, pad=20)
plt.xlabel("Date", fontsize=16, labelpad=20)
plt.ylabel("Total", fontsize=16, labelpad=20)
plt.xticks(rotation=45)
plt.margins(x=0)
plt.figure(1).set_facecolor((1, 1, 1))
plt.plot(df3)

plt.show()
```


![png](output_13_0.png)



```python
df2 = df1.copy()
print("Setting the Pattern in DateTime Columns...")
df2['timeFrom'] = pd.to_datetime(df2['timeFrom'], errors='ignore')

# https://pandas.pydata.org/pandas-docs/stable/user_guide/timeseries.html#offset-aliases
print("Grouping by Month")
df2 = df2.groupby(pd.Grouper(freq='M', key='timeFrom')).sum().reset_index()
df2['timeFrom'] = df2['timeFrom'].dt.strftime('%m-%Y')

print("Done!")
df2
```

    Setting the Pattern in DateTime Columns...
    Grouping by Month
    Done!
    




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>timeFrom</th>
      <th>TotalParkings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>01-2013</td>
      <td>83598</td>
    </tr>
    <tr>
      <th>1</th>
      <td>02-2013</td>
      <td>58922</td>
    </tr>
    <tr>
      <th>2</th>
      <td>03-2013</td>
      <td>50653</td>
    </tr>
    <tr>
      <th>3</th>
      <td>04-2013</td>
      <td>36429</td>
    </tr>
    <tr>
      <th>4</th>
      <td>05-2013</td>
      <td>41097</td>
    </tr>
    <tr>
      <th>5</th>
      <td>06-2013</td>
      <td>43684</td>
    </tr>
    <tr>
      <th>6</th>
      <td>07-2013</td>
      <td>39859</td>
    </tr>
    <tr>
      <th>7</th>
      <td>08-2013</td>
      <td>51361</td>
    </tr>
    <tr>
      <th>8</th>
      <td>09-2013</td>
      <td>54797</td>
    </tr>
    <tr>
      <th>9</th>
      <td>10-2013</td>
      <td>54171</td>
    </tr>
    <tr>
      <th>10</th>
      <td>11-2013</td>
      <td>60706</td>
    </tr>
    <tr>
      <th>11</th>
      <td>12-2013</td>
      <td>67410</td>
    </tr>
    <tr>
      <th>12</th>
      <td>01-2014</td>
      <td>86724</td>
    </tr>
    <tr>
      <th>13</th>
      <td>02-2014</td>
      <td>61117</td>
    </tr>
    <tr>
      <th>14</th>
      <td>03-2014</td>
      <td>53528</td>
    </tr>
    <tr>
      <th>15</th>
      <td>04-2014</td>
      <td>41689</td>
    </tr>
    <tr>
      <th>16</th>
      <td>05-2014</td>
      <td>45579</td>
    </tr>
    <tr>
      <th>17</th>
      <td>06-2014</td>
      <td>45116</td>
    </tr>
    <tr>
      <th>18</th>
      <td>07-2014</td>
      <td>41486</td>
    </tr>
    <tr>
      <th>19</th>
      <td>08-2014</td>
      <td>61355</td>
    </tr>
    <tr>
      <th>20</th>
      <td>09-2014</td>
      <td>54526</td>
    </tr>
    <tr>
      <th>21</th>
      <td>10-2014</td>
      <td>53157</td>
    </tr>
    <tr>
      <th>22</th>
      <td>11-2014</td>
      <td>58759</td>
    </tr>
    <tr>
      <th>23</th>
      <td>12-2014</td>
      <td>64731</td>
    </tr>
    <tr>
      <th>24</th>
      <td>01-2015</td>
      <td>94944</td>
    </tr>
    <tr>
      <th>25</th>
      <td>02-2015</td>
      <td>64102</td>
    </tr>
    <tr>
      <th>26</th>
      <td>03-2015</td>
      <td>55660</td>
    </tr>
    <tr>
      <th>27</th>
      <td>04-2015</td>
      <td>44028</td>
    </tr>
    <tr>
      <th>28</th>
      <td>05-2015</td>
      <td>49396</td>
    </tr>
    <tr>
      <th>29</th>
      <td>06-2015</td>
      <td>52377</td>
    </tr>
    <tr>
      <th>30</th>
      <td>07-2015</td>
      <td>51411</td>
    </tr>
    <tr>
      <th>31</th>
      <td>08-2015</td>
      <td>67579</td>
    </tr>
    <tr>
      <th>32</th>
      <td>09-2015</td>
      <td>62612</td>
    </tr>
    <tr>
      <th>33</th>
      <td>10-2015</td>
      <td>59323</td>
    </tr>
    <tr>
      <th>34</th>
      <td>11-2015</td>
      <td>61081</td>
    </tr>
    <tr>
      <th>35</th>
      <td>12-2015</td>
      <td>71742</td>
    </tr>
    <tr>
      <th>36</th>
      <td>01-2016</td>
      <td>101507</td>
    </tr>
    <tr>
      <th>37</th>
      <td>02-2016</td>
      <td>77994</td>
    </tr>
    <tr>
      <th>38</th>
      <td>03-2016</td>
      <td>69243</td>
    </tr>
    <tr>
      <th>39</th>
      <td>04-2016</td>
      <td>45995</td>
    </tr>
    <tr>
      <th>40</th>
      <td>05-2016</td>
      <td>54566</td>
    </tr>
    <tr>
      <th>41</th>
      <td>06-2016</td>
      <td>53883</td>
    </tr>
    <tr>
      <th>42</th>
      <td>07-2016</td>
      <td>51699</td>
    </tr>
    <tr>
      <th>43</th>
      <td>08-2016</td>
      <td>63424</td>
    </tr>
    <tr>
      <th>44</th>
      <td>09-2016</td>
      <td>55921</td>
    </tr>
    <tr>
      <th>45</th>
      <td>10-2016</td>
      <td>60560</td>
    </tr>
    <tr>
      <th>46</th>
      <td>11-2016</td>
      <td>70564</td>
    </tr>
    <tr>
      <th>47</th>
      <td>12-2016</td>
      <td>79961</td>
    </tr>
    <tr>
      <th>48</th>
      <td>01-2017</td>
      <td>93684</td>
    </tr>
    <tr>
      <th>49</th>
      <td>02-2017</td>
      <td>65866</td>
    </tr>
    <tr>
      <th>50</th>
      <td>03-2017</td>
      <td>60689</td>
    </tr>
    <tr>
      <th>51</th>
      <td>04-2017</td>
      <td>44598</td>
    </tr>
    <tr>
      <th>52</th>
      <td>05-2017</td>
      <td>50252</td>
    </tr>
    <tr>
      <th>53</th>
      <td>06-2017</td>
      <td>59855</td>
    </tr>
    <tr>
      <th>54</th>
      <td>07-2017</td>
      <td>58084</td>
    </tr>
    <tr>
      <th>55</th>
      <td>08-2017</td>
      <td>67097</td>
    </tr>
    <tr>
      <th>56</th>
      <td>09-2017</td>
      <td>59135</td>
    </tr>
    <tr>
      <th>57</th>
      <td>10-2017</td>
      <td>58466</td>
    </tr>
    <tr>
      <th>58</th>
      <td>11-2017</td>
      <td>61593</td>
    </tr>
    <tr>
      <th>59</th>
      <td>12-2017</td>
      <td>75015</td>
    </tr>
  </tbody>
</table>
</div>




```python
df3 = df2.copy()

print("Grouping by Month")
df3 = df3.set_index('timeFrom')

plt.subplots(figsize=(30,6))
plt.title("\nTotal: "+str(len(df['timeTo'])), fontsize=30, pad=20)
plt.title("\nAll Dataset Parkings - Grouped by Month", fontsize=20, pad=20)
plt.xlabel("Month", fontsize=16, labelpad=20)
plt.ylabel("Total Parkings", fontsize=16, labelpad=20)

plt.margins(x=0)
plt.figure(1).set_facecolor((1, 1, 1))
plt.xticks(rotation=90)

plt.plot(df3)
```

    Grouping by Month
    




    [<matplotlib.lines.Line2D at 0x2dc68fab148>]




![png](output_15_2.png)



```python
df4 = df.copy()
df4 = df4[['timeFrom','timeTo']]

# Query For Specific Day
print("Setting Query for Specific Day and Month...")
df4 = df4[(df4['timeFrom'].dt.month == 1) & (df4['timeFrom'].dt.day == 24) & (df4['timeFrom'].dt.year == 2013)]

if (len(df4) > 0): 
    print("Setting the Pattern in DateTime Columns...")
    df4['timeFrom'] = pd.to_datetime(df4['timeFrom'], errors='ignore')
    df4['timeFrom'] = pd.to_datetime(df4["timeFrom"].dt.strftime('%d/%m/%Y %H:%M'))

    df4['timeTo'] = pd.to_datetime(df4['timeTo'], errors='ignore')
    df4['timeTo'] = pd.to_datetime(df4["timeTo"].dt.strftime('%d/%m/%Y %H:%M'))
    print("Generating Graph...")
    fig, ax = plt.subplots(figsize=(15,15))

    max_y = 0
    min_x = 0

    while ((df4['timeTo'].max().minute + max_y) % 30 != 0):
        max_y += 1

    while ((df4['timeFrom'].min().minute + min_x) % 30 != 0):
        min_x -= 1

    min_x = min_x + 30
    max_y = max_y + 30

    plt.scatter(x=df4['timeFrom'], y=df4['timeTo'])

    ax.set_xlim(df4['timeFrom'].min()-pd.Timedelta(min_x,'m'),
                df4['timeTo'].max()+pd.Timedelta(max_y,'m'))

    ax.set_ylim(df4['timeFrom'].min()-pd.Timedelta(min_x,'m'),
                df4['timeTo'].max()+pd.Timedelta(max_y,'m'))

    ax.xaxis.set_major_locator(md.MinuteLocator(interval = 30))
    ax.xaxis.set_major_formatter(md.DateFormatter('%H:%M'))

    ax.yaxis.set_major_locator(md.MinuteLocator(interval = 30))
    ax.yaxis.set_major_formatter(md.DateFormatter('%H:%M'))

    fig.autofmt_xdate()

    plt.title("\nTotal Parkings of One Day (24/01/2013)", fontsize=30, pad=20)
    plt.xlabel("Entry DateTime", fontsize=20, labelpad=20)
    plt.ylabel("Exit DateTime", fontsize=20, labelpad=20)

    plt.xticks(rotation=90)

    plt.margins(x=0)
    plt.figure(1).set_facecolor((1, 1, 1))

    plt.grid()
    plt.show()
else:
    print("Date Not Found")
```

    Setting Query for Specific Day and Month...
    Setting the Pattern in DateTime Columns...
    Generating Graph...
    


![png](output_16_1.png)



```python
# Query For Specific Day
print("Setting Query for Specific Day and Month...")

df2 = df.copy()
df2 = df2.drop(df2.columns.difference(['timeFrom']), axis=1)

print("Setting the Pattern in DateTime Columns...")
df2['timeFrom'] = pd.to_datetime(df2['timeFrom'], errors='ignore')

df2 = df2[(df2['timeFrom'].dt.month == 1) & (df2['timeFrom'].dt.day == 28) & (df2['timeFrom'].dt.year == 2017)]

# https://pandas.pydata.org/pandas-docs/stable/user_guide/timeseries.html#offset-aliases
print("Grouping by Month")
#df2 = df2.groupby(pd.Grouper(freq='H', key='timeFrom')).sum().reset_index()

df2 = df2.groupby(df2['timeFrom'].dt.hour).size().reset_index(name='TotalParkings')

print("Done!")
df2

plt.subplots(figsize=(14,4))
plt.grid()
plt.locator_params(axis='x', nbins=24)
plt.bar(df2['timeFrom'],df2['TotalParkings'])

plt.title("\nTotal Parkings of One Day (28/01/2017)", fontsize=20, pad=20)
plt.xlabel("Entry Hour", fontsize=20, labelpad=20)
plt.ylabel("Total Parkings", fontsize=20, labelpad=20)

plt.figure(1).set_facecolor((1, 1, 1))
plt.show()
```

    Setting Query for Specific Day and Month...
    Setting the Pattern in DateTime Columns...
    Grouping by Month
    Done!
    


![png](output_17_1.png)



```python
df2 = df.copy()
df3 = df.copy()

df2 = df2.drop(df2.columns.difference(['timeTo']), axis=1)
df3 = df3.drop(df3.columns.difference(['timeFrom']), axis=1)

print("Setting the Pattern in DateTime Columns...")
df2['timeTo'] = pd.to_datetime(df2['timeTo'], errors='ignore')
df3['timeFrom'] = pd.to_datetime(df3['timeFrom'], errors='ignore')

print("Grouping by Hour...")
df2 = df2.groupby(df2['timeTo'].dt.hour).size().reset_index(name='TotalParkings')
df3 = df3.groupby(df3['timeFrom'].dt.hour).size().reset_index(name='TotalParkings')

df2 = df2.rename(columns={'timeTo':'Hour'})
df3 = df3.rename(columns={'timeFrom':'Hour'})

df3.insert(0, 'Type', 'Entry')
df2.insert(0, 'Type', 'Exit')

df2 = pd.concat([df2, df3],ignore_index=True)

fig, ax = plt.subplots(figsize=(20,14),nrows=2)
fig.subplots_adjust(hspace=0.4)

graph = sns.barplot(ax=ax[0], x = 'Hour', y='TotalParkings', hue = 'Type', data=df2)
graph.axes.set_title("Total Parkings of Dataset Grouped By Hour",fontsize=25)
graph.set_xlabel("Hour",fontsize=18)
graph.set_ylabel("Total Parkings",fontsize=18)
graph.tick_params(labelsize=14)
graph.grid()
plt.setp(graph.get_legend().get_texts(), fontsize='16') # for legend text
plt.setp(graph.get_legend().get_title(), fontsize='20') # for legend title
plt.figure(1).set_facecolor((1, 1, 1))

graph2 = sns.lineplot(ax=ax[1], x = 'Hour', y='TotalParkings', hue = 'Type', data=df2, lw=4.5)
graph2.set_xticks(range(df2['Hour'].min(),df2['Hour'].max()+1))
graph2.axes.set_title("Total Parkings of Dataset Grouped By Hour",fontsize=25)
graph2.set_xlabel("Hour",fontsize=18)
graph2.set_ylabel("Total Parkings",fontsize=18)
graph2.tick_params(labelsize=14)
graph2.grid()
plt.setp(graph2.get_legend().get_texts(), fontsize='16') # for legend text
plt.setp(graph2.get_legend().get_title(), fontsize='20') # for legend title
plt.figure(2).set_facecolor((1, 1, 1))


plt.show()
```

    Setting the Pattern in DateTime Columns...
    Grouping by Hour...
    


![png](output_18_1.png)



    <Figure size 432x288 with 0 Axes>



```python
dfx = df.copy()
print("Grouping by SpotWon...")

xs = dfx.groupby('spotWon')['timeTo'].nunique().sort_values(ascending=False).reset_index(name='TotalWons')

xs
```

    Grouping by SpotWon...
    




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>spotWon</th>
      <th>TotalWons</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>111</td>
      <td>14616</td>
    </tr>
    <tr>
      <th>1</th>
      <td>53</td>
      <td>14589</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>14572</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0</td>
      <td>14568</td>
    </tr>
    <tr>
      <th>4</th>
      <td>155</td>
      <td>14560</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>245</th>
      <td>120</td>
      <td>14134</td>
    </tr>
    <tr>
      <th>246</th>
      <td>146</td>
      <td>14132</td>
    </tr>
    <tr>
      <th>247</th>
      <td>138</td>
      <td>14128</td>
    </tr>
    <tr>
      <th>248</th>
      <td>235</td>
      <td>14114</td>
    </tr>
    <tr>
      <th>249</th>
      <td>50</td>
      <td>14090</td>
    </tr>
  </tbody>
</table>
<p>250 rows × 2 columns</p>
</div>




```python
dfx = df.copy()

wanted_equals_won = [dfx[dfx['spotWon'] == dfx['spotWanted']].count().max()][0]
wanted_dif_won = [dfx[dfx['spotWon'] != dfx['spotWanted']].count().max()][0]

print("Same Spot Wanted & Won: ",wanted_equals_won)
print("Different Spot Wanted & Won: ",wanted_dif_won)

print("\nTotal Parkings: ",wanted_equals_won+wanted_dif_won)
print("Requested/Won Sucess Rate: %0.2f%%" % ((wanted_equals_won * 100 / (wanted_equals_won+wanted_dif_won))) )
```

    Same Spot Wanted & Won:  2988519
    Different Spot Wanted & Won:  595841
    
    Total Parkings:  3584360
    Requested/Won Sucess Rate: 83.38%
    


```python
df1 = df.copy()
df1 = df1[['timeFrom','isWeekday','isHoliday']]

print("Setting the Pattern in DateTime Columns...")
df1['timeFrom'] = pd.to_datetime(df1['timeFrom'], errors='ignore')

print("Grouping by Day...")
df2 = df1.groupby(df1['timeFrom'].dt.date).size().reset_index(name='TotalParkings')
df2['timeFrom'] = pd.to_datetime(df2['timeFrom'], errors='ignore')

print("Setting the Pattern in DateTime Columns (2)...")
df1['timeFrom'] = df1['timeFrom'].dt.date
df1['timeFrom'] = pd.to_datetime(df1['timeFrom'], errors='ignore')

print("Merging DataFrames...")
df3 = pd.merge(df1,df2, on='timeFrom')

print("Aggregating DataFrame Columns...")
df4 = df3.groupby(['timeFrom']).agg(['sum','count']).reset_index(drop=False)

print("Done!")
```

    Setting the Pattern in DateTime Columns...
    Grouping by Day...
    Setting the Pattern in DateTime Columns (2)...
    Merging DataFrames...
    Aggregating DataFrame Columns...
    Done!
    


```python
# Only Holidays DataFrame
df9 = df4.copy()
df9 = df9[['timeFrom','isWeekday','isHoliday']]

only_weekdays = df9[df9['isWeekday']['sum'] != 0]
only_weekendDays = df9[df9['isWeekday']['sum'] == 0]

only_holidays = df9[df9['isHoliday']['sum'] != 0]
only_nonHolidays = df9[df9['isHoliday']['sum'] == 0]

weekdays_holidays = df9[(df9['isWeekday']['sum'] != 0) & (df9['isHoliday']['sum'] != 0)]
weekendDays_holidays = df9[(df9['isWeekday']['sum'] == 0) & (df9['isHoliday']['sum'] != 0)]

weekdays_nonHolidays = df9[(df9['isWeekday']['sum'] != 0) & (df9['isHoliday']['sum'] == 0)]
weekendDays_nonHolidays = df9[(df9['isWeekday']['sum'] == 0) & (df9['isHoliday']['sum'] == 0)]

"""
print("Parking Daily Average By:\n")
print("WeekDays: ",only_weekdays["isWeekday"].mean()['count'])
print("WeekEndDays: ",only_weekendDays["isWeekday"].mean()['count'])
print()
print("Non-Holidays: ",only_nonHolidays["isHoliday"].mean()['count'])
print("Holidays: ",only_holidays["isHoliday"].mean()['count'])
print()
print("WeekDays & Holidays: ",weekdays_holidays["isWeekday"].mean()['count'])
print("WeekEndDays & Holidays: ",weekendDays_holidays["isWeekday"].mean()['count'])
print()
print("WeekDays & Non-Holidays  ",weekdays_nonHolidays["isWeekday"].mean()['count'])
print("WeekEndDays & Non-Holidays: ",weekendDays_nonHolidays["isWeekday"].mean()['count'])
"""

dataPlot = [
    {"id":0, "data": "WeekDays", "total": only_weekdays["isWeekday"].mean()['count']},
    {"id":0, "data": "WeekEndDays", "total": only_weekendDays["isWeekday"].mean()['count']},
    {"id":1, "data": "Non-Holidays", "total": only_nonHolidays["isHoliday"].mean()['count']},
    {"id":1, "data": "Holidays", "total": only_holidays["isHoliday"].mean()['count']},
    {"id":2, "data": "WeekDays & Non-Holidays", "total": weekdays_nonHolidays["isWeekday"].mean()['count'] },
    {"id":2, "data": "WeekDays & Holidays", "total": weekdays_holidays["isWeekday"].mean()['count'] },
    {"id":3, "data": "WeekEndDays & Non-Holidays", "total": weekendDays_nonHolidays["isWeekday"].mean()['count']},
    {"id":3, "data": "WeekEndDays & Holidays", "total": weekendDays_holidays["isWeekday"].mean()['count']}
]

dfPlt = pd.DataFrame(dataPlot)
dfPlt
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>data</th>
      <th>total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>WeekDays</td>
      <td>1794.242331</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0</td>
      <td>WeekEndDays</td>
      <td>2384.421456</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>Non-Holidays</td>
      <td>1918.343555</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>Holidays</td>
      <td>3171.646154</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2</td>
      <td>WeekDays &amp; Non-Holidays</td>
      <td>1753.230525</td>
    </tr>
    <tr>
      <th>5</th>
      <td>2</td>
      <td>WeekDays &amp; Holidays</td>
      <td>2915.826087</td>
    </tr>
    <tr>
      <th>6</th>
      <td>3</td>
      <td>WeekEndDays &amp; Non-Holidays</td>
      <td>2331.290258</td>
    </tr>
    <tr>
      <th>7</th>
      <td>3</td>
      <td>WeekEndDays &amp; Holidays</td>
      <td>3791.000000</td>
    </tr>
  </tbody>
</table>
</div>




```python
df2 = dfPlt.copy()

fig, ax = plt.subplots(figsize=(14,6),nrows=1)

graph = sns.barplot(ax=ax, y='data', x='total', data=df2)
#graph.axes.get_legend().remove()
graph.set_yticklabels(graph.get_yticklabels(), rotation=0, fontsize="14", va="center")
graph.axes.set_title("Average Daily Parking By:",fontsize=25, pad=20)
graph.set_xlabel("Total Parkings",fontsize=18, labelpad=20)
graph.set_ylabel("Grouped Data",fontsize=18)
graph.tick_params(labelsize=14)
graph.axes.set_axisbelow(True)
graph.grid()

cont = 0
for bar in ax.patches:
    if (cont <= 1):
        bar.set_color('C1')
    elif (cont <= 3):
        bar.set_color('C2')
    elif (cont <= 5):
        bar.set_color('C4')
    elif (cont <= 7):
        bar.set_color('C8')
    cont+=1

plt.figure(1).set_facecolor((1, 1, 1))

plt.show()
```


![png](output_23_0.png)



```python
# Group Dataset By Date and Hour (for total parkings for each hour of each day)
# Thanks for: https://kanoki.org/2020/05/26/dataframe-groupby-date-and-time/
df3 = df.copy()
df3 = df3.drop(df3.columns.difference(['timeFrom']), axis=1)
df3 = df3.set_index(df3.timeFrom)
pd.to_datetime(df3.index, errors='ignore')
df3.resample('H').size().reset_index(name='TotalParkings')
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>timeFrom</th>
      <th>TotalParkings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2013-01-01 00:00:00</td>
      <td>201</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2013-01-01 01:00:00</td>
      <td>195</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2013-01-01 02:00:00</td>
      <td>161</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2013-01-01 03:00:00</td>
      <td>186</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2013-01-01 04:00:00</td>
      <td>217</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>43819</th>
      <td>2017-12-31 19:00:00</td>
      <td>104</td>
    </tr>
    <tr>
      <th>43820</th>
      <td>2017-12-31 20:00:00</td>
      <td>70</td>
    </tr>
    <tr>
      <th>43821</th>
      <td>2017-12-31 21:00:00</td>
      <td>111</td>
    </tr>
    <tr>
      <th>43822</th>
      <td>2017-12-31 22:00:00</td>
      <td>229</td>
    </tr>
    <tr>
      <th>43823</th>
      <td>2017-12-31 23:00:00</td>
      <td>33</td>
    </tr>
  </tbody>
</table>
<p>43824 rows × 2 columns</p>
</div>




```python
# Group Dataset By Date and Hour (for total parkings for each hour of each day)
# Thanks for: https://kanoki.org/2020/05/26/dataframe-groupby-date-and-time/
df3 = df.copy()
df3 = df3.drop(df3.columns.difference(['timeFrom','isRain','isWeekday','isHoliday']), axis=1)
df3 = df3.set_index(df3.timeFrom)
df3['TotalParkings'] = 1
pd.to_datetime(df3.index, errors='ignore')
df3 = df3.resample('H').sum()

df3.head(10)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>isWeekday</th>
      <th>isRain</th>
      <th>isHoliday</th>
      <th>TotalParkings</th>
    </tr>
    <tr>
      <th>timeFrom</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01 00:00:00</th>
      <td>201</td>
      <td>0</td>
      <td>201</td>
      <td>201</td>
    </tr>
    <tr>
      <th>2013-01-01 01:00:00</th>
      <td>195</td>
      <td>0</td>
      <td>195</td>
      <td>195</td>
    </tr>
    <tr>
      <th>2013-01-01 02:00:00</th>
      <td>161</td>
      <td>0</td>
      <td>161</td>
      <td>161</td>
    </tr>
    <tr>
      <th>2013-01-01 03:00:00</th>
      <td>186</td>
      <td>0</td>
      <td>186</td>
      <td>186</td>
    </tr>
    <tr>
      <th>2013-01-01 04:00:00</th>
      <td>217</td>
      <td>0</td>
      <td>217</td>
      <td>217</td>
    </tr>
    <tr>
      <th>2013-01-01 05:00:00</th>
      <td>262</td>
      <td>0</td>
      <td>262</td>
      <td>262</td>
    </tr>
    <tr>
      <th>2013-01-01 06:00:00</th>
      <td>290</td>
      <td>0</td>
      <td>290</td>
      <td>290</td>
    </tr>
    <tr>
      <th>2013-01-01 07:00:00</th>
      <td>359</td>
      <td>0</td>
      <td>359</td>
      <td>359</td>
    </tr>
    <tr>
      <th>2013-01-01 08:00:00</th>
      <td>161</td>
      <td>0</td>
      <td>161</td>
      <td>161</td>
    </tr>
    <tr>
      <th>2013-01-01 09:00:00</th>
      <td>176</td>
      <td>0</td>
      <td>176</td>
      <td>176</td>
    </tr>
  </tbody>
</table>
</div>




```python
print("Applying Function...")
df3['isRain'] = df3.apply((lambda x : 1 if x['isRain']>0 else 0),axis=1)
df3['isHoliday'] = df3.apply((lambda x : 1 if x['isHoliday']>0 else 0),axis=1)
df3['isWeekday'] = df3.apply((lambda x : 1 if x['isWeekday']>0 else 0),axis=1)
print("Done!")
df3
```

    Applying Function...
    Done!
    




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>isWeekday</th>
      <th>isRain</th>
      <th>isHoliday</th>
      <th>TotalParkings</th>
    </tr>
    <tr>
      <th>timeFrom</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-01-01 00:00:00</th>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>201</td>
    </tr>
    <tr>
      <th>2013-01-01 01:00:00</th>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>195</td>
    </tr>
    <tr>
      <th>2013-01-01 02:00:00</th>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>161</td>
    </tr>
    <tr>
      <th>2013-01-01 03:00:00</th>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>186</td>
    </tr>
    <tr>
      <th>2013-01-01 04:00:00</th>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>217</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2017-12-31 19:00:00</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>104</td>
    </tr>
    <tr>
      <th>2017-12-31 20:00:00</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>70</td>
    </tr>
    <tr>
      <th>2017-12-31 21:00:00</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>111</td>
    </tr>
    <tr>
      <th>2017-12-31 22:00:00</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>229</td>
    </tr>
    <tr>
      <th>2017-12-31 23:00:00</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>33</td>
    </tr>
  </tbody>
</table>
<p>43824 rows × 4 columns</p>
</div>




```python
# Group Dataset By Date and Hour (for total parkings for each hour of each day)
# Thanks for: https://kanoki.org/2020/05/26/dataframe-groupby-date-and-time/
df4 = df3.copy()
df4 = df4.groupby(['isHoliday','isWeekday','isRain']).agg(['sum','count','mean']).reset_index(drop=False)
df4
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead tr th {
        text-align: left;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th>isHoliday</th>
      <th>isWeekday</th>
      <th>isRain</th>
      <th colspan="3" halign="left">TotalParkings</th>
    </tr>
    <tr>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th>sum</th>
      <th>count</th>
      <th>mean</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>619167</td>
      <td>6950</td>
      <td>89.088777</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>553472</td>
      <td>5122</td>
      <td>108.057790</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>1157253</td>
      <td>17264</td>
      <td>67.032727</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>1048311</td>
      <td>12928</td>
      <td>81.088413</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>37752</td>
      <td>249</td>
      <td>151.614458</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>34277</td>
      <td>207</td>
      <td>165.589372</td>
    </tr>
    <tr>
      <th>6</th>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>77967</td>
      <td>673</td>
      <td>115.849926</td>
    </tr>
    <tr>
      <th>7</th>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>56161</td>
      <td>431</td>
      <td>130.303944</td>
    </tr>
  </tbody>
</table>
</div>




```python
print("Writing output file...")
df3.to_csv('generated_dataset_marchinelearning.csv', index=True)
print("Done!")
```

    Writing output file...
    Done!
    


```python

```
