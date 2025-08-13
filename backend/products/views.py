from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from elasticsearch_dsl import Q
from .models import Product
from .serializers import ProductSerializer
from .documents import ProductDocument  # file này bạn sẽ tạo ở bước mapping
from elasticsearch_dsl import connections
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

# ============================================DB
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# ============================================ES
class ProductListView(APIView):

    def get(self, request):

        connections.create_connection(alias='default', hosts=['http://elasticsearch:9200'])

        search = ProductDocument.search().sort('id')[:1000]  # Lấy 20 sản phẩm đầu
        # search = ProductDocument.search()[:1000]

        results = search.execute()

        data = [
            {
                'id': hit.id,
                'name': hit.name,
                'image': hit.image,
                'description': hit.description,
                'price': float(hit.price),
                'stock': hit.stock,
                'created_at': hit.created_at,
                'updated_at': hit.updated_at,
            }
            for hit in results
        ]

        return Response(data)


class ProductSearchView(APIView):
    """
    Search sản phẩm trong Elasticsearch
    """
    def get(self, request):
        connections.create_connection(alias='default', hosts=['http://elasticsearch:9200'])         

        query = request.GET.get('q', '')
        search = ProductDocument.search()

        if query:
            q = Q("multi_match", query=query, fields=['name', 'description'])
            search = search.query(q)

        results = search.execute()

        data = [
            {
                'id': hit.id,
                'name': hit.name,
                'image': hit.image,
                'description': hit.description,
                'price': float(hit.price),
                'stock': hit.stock,
                'created_at': hit.created_at,
                'updated_at': hit.updated_at
            }
            for hit in results
        ]
        return Response(data)   