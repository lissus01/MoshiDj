from django.db import models
class Producto(models.Model):
    id=models.IntegerField(primary_key=True)
    nombre=models.CharField(max_length=100)
    descripcion=models.CharField(max_length=100)
    imagen=models.CharField(max_length=100)
    precio=models.IntegerField(default=0)
    cantidad=models.IntegerField(default=0)

    def __str__(self):
        return self.nombre
    class Meta:
        db_table = 'Producto'
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        ordering = ['id']
