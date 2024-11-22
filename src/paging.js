$(document).ready(function () {
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.get('genre') == null){
      window.location = '?genre=';
    }else if(searchParams.get('genre') == ''){
    }else{
      $('#searchDiv').remove();
    }

    
});