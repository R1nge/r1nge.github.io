var createModButton = document.querySelector('.create-mod-button');
createModButton.addEventListener('click', function() {  
  var input = document.createElement('input');
  input.type = 'file';
  
  input.onchange = e => { 
     var file = e.target.files[0]; 
  
     var reader = new FileReader();
     reader.readAsText(file,'UTF-8');
  
     reader.onload = readerEvent => {
        var content = readerEvent.target.result;
        console.log( content );
     }
  }
  
  input.click();
});