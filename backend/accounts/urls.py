from django.urls import path, include
from .views import (SignUpView, GetCSRFToken, LoginView, LogoutView, CheckAuthenticatedView, GetUser, UpdateUser, GetTrainingFeatures, GetSentimentCount, GetDeceptiveCount, GetActualSentimentCount, GetActualDeceptiveCount, GetActualFeatures, GetNBDAccuracy, GetRFDAccuracy, GetSVMDAccuracy, GetDeceptiveAccuracies,
GetUsersData, GetAllCounts)

urlpatterns = [
    path('authenticated', CheckAuthenticatedView.as_view()),
    path('register', SignUpView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('csrf_cookie', GetCSRFToken.as_view()),
    path('user', GetUser.as_view()),
    path('update_user', UpdateUser.as_view()),
    path('training_features', GetTrainingFeatures.as_view()),
    path('sentiment_count', GetSentimentCount.as_view()),
    path('deceptive_count', GetDeceptiveCount.as_view()),
    path('actual_features', GetActualFeatures.as_view()),
    path('t_sentiment_count', GetActualSentimentCount.as_view()),
    path('t_deceptive_count', GetActualDeceptiveCount.as_view()),
    path('nbd_accuracy', GetNBDAccuracy.as_view()),
    path('rfd_accuracy', GetRFDAccuracy.as_view()),
    path('svmd_accuracy', GetSVMDAccuracy.as_view()),
    path('deceptive_accuracies', GetDeceptiveAccuracies.as_view()),
    path('users', GetUsersData.as_view()),
    path('data_counts', GetAllCounts.as_view())
]
