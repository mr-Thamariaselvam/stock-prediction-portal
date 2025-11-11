from django.urls import path
from accounts import views as userViews
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .views import StockPredictionAPIView
urlpatterns=[
    path('register/',userViews.RegisterView.as_view(),name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('producted-view/',userViews.ProdectedView.as_view(),name='producted-view'),
    path('predict/',StockPredictionAPIView.as_view(),name='Stock Prediction'),
]