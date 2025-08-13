import requests

resp = requests.get("http://localhost:8000/products/search/?q=giay")
print(resp.json())
