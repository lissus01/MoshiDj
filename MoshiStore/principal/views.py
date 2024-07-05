from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate,logout,login
from .forms import CustomUserCreationForm
from .models import Producto

def contactanos (request):
    return render(request, 'contactanos.html')

def ofertas (request):
    return render(request, 'ofertas.html')


def productos (request):
    productos=Producto.objects.all()
    return render(request, 'productos.html', {"productos":productos})

def inicio (request):
    return render(request,'principal.html')

@login_required
def perfil(request):
    return render(request, 'perfil.html')
def nosotros(request):
    return render(request, 'nosotros.html')

def exit(request):
    logout(request)
    return redirect('inicio')
def register(request):
    data = {
        'form' : CustomUserCreationForm()
    }
    if request.method == 'POST':
        user_creation_form = CustomUserCreationForm(data=request.POST)
        if user_creation_form.is_valid():
            user_creation_form.save()
            user = authenticate(username=user_creation_form.cleaned_data['username'], password=user_creation_form.cleaned_data['password1'])
            login(request, user)
            return redirect('inicio')
    return render(request, 'registration/register.html', data)



def carrito(request):
    productos=[]
    for id, cantidad in request.session["carrito"].items():
        productos.append((Producto.objects.get(id=id), cantidad))

    #productos = Producto.objects.filter(id__in=request.session["carrito"])
    suma_precios = sum([x[0].precio*x[1] for x in productos])
    return render(request, 'cart.html', {"productos": productos, "suma_precios":suma_precios, "carrito": request.session["carrito"]})


def agregar_producto(request,id):
    producto = Producto.objects.get(id=id)
    if str(producto.id) in request.session["carrito"].keys() and producto.cantidad > request.session["carrito"][str(producto.id)]:
        request.session["carrito"][str(producto.id)] += 1
    elif str(producto.id) not in request.session["carrito"].keys() and producto.cantidad > 0:
        request.session["carrito"][str(producto.id)] = 1
    else:
        pass

    return redirect('tienda')

def eliminar_producto(request, id):
    del request.session["carrito"][str(id)]
    return redirect('carrito')


def restar_producto(request, id):
    request.session["carrito"][str(id)] -=1
    if request.session["carrito"][str(id)] <= 0:
        del request.session["carrito"][str(id)]
    return redirect('carrito')

def limpiar_carrito(request):
    request.session["carrito"] = {}
    return redirect('carrito')


def comprar_carrito(request):
    productos = []
    for id, cantidad in request.session["carrito"].items():
        producto = Producto.objects.get(id=id)
        productos.append((producto, cantidad))
        if cantidad > producto.cantidad:
            return render(request, 'index.html', {"mensaje":"Error en la Compra"})

    for producto, cantidad in productos:
        producto.cantidad = producto.cantidad - cantidad
        producto.save()

    request.session["carrito"] = {}

    return render(request, 'index.html', {"mensaje":"Gracias por Comprar!!"})