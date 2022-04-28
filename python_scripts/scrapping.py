import os
import json
from bson import json_util
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from dotenv import load_dotenv
from pymongo import MongoClient
import pymongo
from time import sleep

load_dotenv()

# Database connection
def get_database():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = os.getenv("DB_URI")
    client = MongoClient(CONNECTION_STRING)

    return client

client = get_database()

# Define a dict with the id of the items
items = client.hackDoAgora.items.find({})
items_id = {}

for document in items:
    key = document["name"]
    items_id[key] = document["_id"]

# Format string functions to normalize the items
def format_string_to_list(string, items):
    sliced_text = slice(17, -1)
    formatedItems = string[sliced_text].split(',')
    returned_list = []
    for item in items:
        for formatedItem in formatedItems:
            if item.lower() in formatedItem.lower() or item.lower() == formatedItem.lower():
                if item not in returned_list:
                    returned_list.append(items_id[item])
    return returned_list

def format_phone(value):
    sliced_text = slice(10, -1)
    return value[sliced_text]

default_user = client.hackDoAgora.users.find_one({"email": os.getenv('DEFAULT_USER')})["_id"]

chrome_options = Options()
chrome_options.add_argument("--headless")

driver = webdriver.Chrome(options=chrome_options)

driver.get("https://www.reciclasampa.com.br/pontos-de-coleta")
driver.find_element_by_css_selector('.btn_busca_ponto').click()

sleep(15) #Wait a little to load the page

POINTS_LIST = driver.find_elements_by_xpath("//ul")[6]
ITEMS = POINTS_LIST.find_elements_by_tag_name("li")
points_array = []

# Items list used to normalize items from remote source been fetch
items = [ 
    "Plástico",
    "Metal",
    "Vidro",
    "Isopor",
    "Papel e Papelão",
    "Lâmpada",
    "Pilhas e bateria",
    "Raios-X",
    "Medicamento",
    "Oléo de Cozinha",
    "Eletrônicos"
]

# Define list of EcoSpots
for item in ITEMS:
    point_item = {}
    point_item["name"] = item.find_element_by_css_selector('.nome').text
    point_item["address"] = item.find_element_by_css_selector('.end').text
    point_item["user"] = default_user
    
    extra_info = item.find_element_by_css_selector('.info')

    # extract data from extra info
    try:
        point_item['website'] = extra_info.find_element_by_tag_name('a').get_attribute('innerText')
    except:
        point_item['website'] = ""
    
    paragraphs = extra_info.find_elements_by_tag_name("p")
    point_item["phone"] = format_phone(paragraphs[0].get_attribute('innerText'))
    point_item["description"] = paragraphs[1].get_attribute('innerText')
    point_item["items"] = format_string_to_list(paragraphs[2].get_attribute('innerText'), items)

    points_array.append(point_item)

# Convert ecospots to json
jsonPointsList = json_util.dumps(points_array)

# Create a json file with the structured data
with open("points.json", "w") as outfile:
    outfile.write(jsonPointsList)
