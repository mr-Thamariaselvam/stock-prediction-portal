from django.shortcuts import render
from django.contrib.auth.models import User


from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response



from .serializers import UserSerializer



# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset= User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]

class ProdectedView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        response={
            'status':'Authenticated successfully'
        }
        return Response(response)