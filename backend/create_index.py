import django
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from elasticsearch_dsl.connections import connections
from products.documents import ProductDocument
from products.models import Product

# Tạo kết nối đến Elasticsearch
connections.create_connection(hosts=['http://elasticsearch:9200'])

# Tạo index (mapping)
ProductDocument.init()
print("Index created!")

# Đẩy data từ DB vào Elasticsearch
for product in Product.objects.all():
    doc = ProductDocument(
        meta={'id': product.id},
        id=product.id,
        name=product.name,
        image=product.image,
        description=product.description,
        price=product.price,
        stock=product.stock,
        created_at=product.created_at,
        updated_at=product.updated_at
    )
    doc.save()

print("Data indexed!")
