from django.contrib import admin
from django.urls import include,path
from . import views
from .views import exit, register

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.inicio, name='inicio'),
    path('contactanos/', views.contactanos, name='contactanos'),
    path('nosotros/', views.nosotros, name='nosotros'),
    path('ofertas/', views.ofertas, name='ofertas'),
    path('productos/', views.productos, name='productos'),
    path('logout/', exit, name='exit'),
    path('register/', register, name='register'),
    path('perfil/',views.perfil, name='perfil'),

]