# from rest_framework import routers
# from django.urls import path, include
# from .views import ProductViewSet, ProductListView, ProductSearchView

# router = routers.DefaultRouter()
# router.register(r'products', ProductViewSet)

# urlpatterns = [
#     path('', include(router.urls)),  # Không thêm 'api/' ở đây
#     path('products-es/', ProductListView.as_view(), name='products-es'),
#     path('products-es/search/', ProductSearchView.as_view(), name='products-es-search'),
# ]

from rest_framework import routers
from django.urls import path, include
from .views import ProductViewSet, ProductListView, ProductSearchView

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),
    path('products-es/', ProductListView.as_view(), name='products-es'),
    path('products-es/search/', ProductSearchView.as_view(), name='products-es-search'),
]
