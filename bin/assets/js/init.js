$(document).ready(function(){
$('#login').click(function(){

  var email = $("#email").val();
  var password = $("#password").val();

  if(email=='' || password == '')
  {
    $('input[type="text"],input[type="password"]').css("boarder","2px solid red");
    $('input[type="text"],input[type="password"]').css("box-shadow","0 0 3px red");
    alert("Please fill all fields!");
  }
  else{
    $.post("login.php",{ email: email, password1: password},
    function(data)
    {
      if(data=='Invalid Email')
      {
        $('input[type="text"]').css({"boarder":"2px solid red", "box-shadow":"0 0 3px red"});
        $('input[type="password"]').css({"boarder":"2px solid #00F5FF", "box-shadow":"0 0 5px #00F5FF"});
        alert(data);
      }
      else if(data=='Email or Password is wrong!')
      {
        $('input[type="text"]').css({"boarder":"2px solid red", "box-shadow":"0 0 3px red"});
      }
      else if(data=='sucessfully Logged in')
      {
        $('input[type="text"], input[type="password"]').css({"boarder":"2px solid #00F5FF","box-shadow":"0 0 5px #00F5FF"});
        alert(data);
      }
      else
      {
        alert(data);
      }
    });
  }

}
});
});
