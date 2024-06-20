
// ADD NOTE--------------------------------------------------------------------------------------
var addElement = document.getElementById("add_note");
addElement.addEventListener("click",function(event){
    event.preventDefault();

    note = document.getElementById("note-content").value;
    // csrfToken = document.getElementById("csrf_token").value
    var csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  
    
    axios.post('/add_note/',{
            note: note,
        },{
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            window.location.href = '/personal/'
            // console.log(response.data.note_list);
            // alert(response.data.message);
        })
        .catch(error => {
            console.error(error);
            alert('An error occurred');
        });  

    });

// DELETE NOTE--------------------------------------------------------------------------------------
function deleteNote(button){
    // Get the parent row of the clicked button
    var row = button.parentNode.parentNode;
    // Get the first cell in that row
    var firstCell = row.cells[0];
    // Get the ID of the note from the note-id attribute
    var noteId = firstCell.getAttribute('note-id')
    // Get the value of the first cell
    // var firstColumnValue = firstCell.textContent;
    console.log(noteId);
    var csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    axios.post('/delete_note/',{
        noteId:noteId
    },{
        headers:{
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/x-www-form-urlencoded'
        }  
    }).then(response=>{
        if(response.data.success){
            console.log("Success");
            window.location.href = '/personal/'
        }else{
            console.log(response.data.error)
        }
    }).catch(error=>{
        console.log(error)
    });
}



// DELETE NOTE--------------------------------------------------------------------------------------
function editNote(button){
    var csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    var row = button.parentNode.parentNode;
    var firstCell = row.cells[0];
    var noteId = firstCell.getAttribute('note-id'); 
    
    var noteText = firstCell.querySelector('.note-text');
    var newNote = firstCell.querySelector('.new-note');

    noteText.style.display = 'none';
    newNote.style.display = 'block';
    newNote.focus();    

    newNote.addEventListener('blur',function(event){            
        console.log(newNote.value)

        axios.post('/edit_note/',{
            newNote:newNote.value,
            noteId:noteId
        },{
            headers:{
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response=>{
            if(response.data.success){
                console.log("Done Editing");
                window.location.href = '/personal/'
            }else{
                console.log(response.data.error)
            }
        }).catch(error=>{
            console.log(error)
        })
    })

    // firstCell.textContent.style.display = 'none';
    // console.log("Done");

}

var checkboxes =  document.querySelectorAll('.select-note');
        checkboxes.forEach(function(checkbox){
            checkbox.addEventListener('change',function(event){
                var noteText = event.target.closest('tr').querySelector('.note')
                if(event.target.checked){
                    noteText.classList.add('crossed-out');
                }else{
                    noteText.classList.remove('crossed-out');
                }
            })
        })








