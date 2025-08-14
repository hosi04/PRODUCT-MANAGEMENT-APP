from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200)
    image = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'product' # This is name of table

    def __str__(self):
        return self.name