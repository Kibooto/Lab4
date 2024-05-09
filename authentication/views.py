from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required

from django.contrib.auth.models import User

# Create your views here.
def login_view(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect('/')

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect('/')
        else:
            return render(request, 'login.html', {'message': 'Invalid credentials'})
    return render(request, 'auth/login.html')

def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/')

def register_view(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect('/')
    
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = User.objects.create_user(username, password=password)
        user.is_active = True
        login(request, user)
        return HttpResponseRedirect('/')
    return render(request, 'auth/register.html')

@login_required()
def profile_view(request):
    return render(request, 'auth/profile.html', {'user': request.user})
