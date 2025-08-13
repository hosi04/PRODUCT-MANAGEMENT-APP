from django_elasticsearch_dsl import Document, Index
from django_elasticsearch_dsl.registries import registry
from .models import Product

# Tạo index trên Elasticsearch
product_index = Index('products')
product_index.settings(
    number_of_shards=1,
    number_of_replicas=0
)

@registry.register_document
class ProductDocument(Document):
    class Index:
        name = 'products'  # tên index trong Elasticsearch

    class Django:
        model = Product
        fields = [
            'id',
            'name',
            'image',
            'description',
            'price',
            'stock',
            'created_at',
            'updated_at'
        ]
