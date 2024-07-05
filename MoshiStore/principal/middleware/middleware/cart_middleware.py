import datetime
import os
from django.core.cache import cache
from django.conf import settings
from django.utils.deprecation import MiddlewareMixin


class InitVariablesMiddleware:
    def initCarrito(self,request):
        request.session['carrito'] = {}
        #{id (int): cantidad (int)}
        #{1:5, 3:1, 2:1}
    
    def total_carrito(self,request):
        total = 0
        if request.user.is_authenticated or True:
            if "carrito" in request.session.keys():
                for key,value in request.session["carrito"].items(): #((1,5), (3,1), (2,1))
                    total += int(value)
        request.session['total_carrito'] = total
        #return {"total_carrito": total}
    
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.
    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        if "carrito" not in request.session.keys():
            self.initCarrito(request)
        self.total_carrito(request)
        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response