from django.shortcuts import render
from .models import Personal
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def home(request):
    return render(request, 'myapp/home.html')


def personal(request):
    note_list = Personal.objects.all().values('id','note')
    note_list = list(note_list)
    return render(request, 'myapp/personal.html',{'note_list':note_list})


def add_note(request):
    if request.method == 'POST':
        note = request.POST.get('note')
        print(note)
        print("=========================")

        if note:
            personal = Personal(note=note)
            personal.save()
        else: 
            personal = Personal(note="List is empty")
            personal.save()

        return JsonResponse({'success':True})
    
    return JsonResponse({'success':False})

def delete_note(request):
    if request.method == 'POST':
        note_id = request.POST.get('noteId')
        note_id = int(note_id)
        try:
            note = Personal.objects.get(id=note_id)
            note.delete()
            return JsonResponse({'success':True})
        except Exception as e:
            return JsonResponse({'success':False,'error':"Empty"})
    return JsonResponse({'success':False,'error':"Invalid"})


def edit_note(request):
    if request.method == 'POST':
            note_id = request.POST.get('noteId')
            new_note = request.POST.get('newNote')
            note_id = int(note_id)
            personal = Personal.objects.get(id=note_id)

            try:
                personal.note = new_note
                personal.save()
                return JsonResponse({'success':True})
            except:
               return JsonResponse({'success':False,'error':"Empty"}) 
            
    return JsonResponse({'success':False,'error':"Invalid"})