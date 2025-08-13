from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Product
from .documents import ProductDocument
from elasticsearch_dsl.connections import connections
from django.conf import settings
@receiver(post_save, sender=Product)
def index_product(sender, instance, **kwargs):
    """
    Đồng bộ dữ liệu khi một sản phẩm được thêm hoặc cập nhật.
    """
    doc = ProductDocument(
        meta={'id': instance.id},
        id=instance.id,
        name=instance.name,
        image=instance.image,
        description=instance.description,
        price=instance.price,
        stock=instance.stock,
        created_at=instance.created_at,
        updated_at=instance.updated_at
    )
    doc.save()
    print(f"Product {instance.id} indexed!")

@receiver(post_delete, sender=Product)
def delete_product_from_es(sender, instance, **kwargs):
    """
    Xóa sản phẩm khỏi Elasticsearch khi nó bị xóa trong Django.
    """
    try:
        doc = ProductDocument.get(id=instance.id)
        doc.delete()
        print(f"Product {instance.id} deleted from Elasticsearch!")
    except Exception as e:
        print(f"Error deleting product {instance.id}: {e}")