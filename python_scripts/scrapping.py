import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options  
from utils import list_formater
from time import sleep

chrome_options = Options()
chrome_options.add_argument("--headless")

driver = webdriver.Chrome(options=chrome_options)

driver.get("https://www.reciclasampa.com.br/pontos-de-coleta")
driver.find_element_by_css_selector('.btn_busca_ponto').click()

sleep(15)

POINTS_LIST = driver.find_elements_by_xpath("//ul")[6]
ITEMS = POINTS_LIST.find_elements_by_tag_name("li")
points_array = []

for item in ITEMS:
    point_item = {}
    point_item["name"] = item.find_element_by_css_selector('.nome').text
    point_item["address"] = item.find_element_by_css_selector('.end').text
    
    extra_info = item.find_element_by_css_selector('.info')

    # extract data from extra info
    try:
        point_item['website'] = extra_info.find_element_by_tag_name('a').get_attribute('innerText')
    except:
        point_item['website'] = ""
    
    paragraphs = extra_info.find_elements_by_tag_name("p")
    point_item["phone"] = paragraphs[0].get_attribute('innerText')
    point_item["description"] = paragraphs[1].get_attribute('innerText')
    point_item["items"] = list_formater.format_string_to_list(paragraphs[2].get_attribute('innerText'))

    points_array.append(point_item)

jsonPointsList = json.dumps(points_array)

with open("points.json", "w") as outfile:
    outfile.write(jsonPointsList)
