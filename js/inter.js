 
var $overlay = $('<div id="overlay"><div></div></div>');
var $image = $("<img>");
var $caption = $("<p></p>");
var $index = 0;
var $galleryLength = $("#list li").length;

$overlay.children("div").append($image);

$overlay.children("div").append($caption);

$overlay.children("div").append("<button id='buttonPrevious'> < </button>");

$overlay.children("div").append("<button id='buttonNext'> > </button>");

$("body").append($overlay);

var updateImage = function(imageLocation, imageCaption){

  $image.attr("src", imageLocation);

  $caption.text(imageCaption);

};

$("#list a").click(function(event){
  event.preventDefault();
  var imageLocation = $(this).attr("href");
  var imageCaption =  $(this).children("img").attr("alt");

  $index = $(this).parent().index(); 

  updateImage(imageLocation, imageCaption);

  $overlay.slideDown(imageLocation);

});

var prevNext = function(prev ) {

  if(!prev) { 
    
    $index += 1; 
  }
  else { 
    $index -= 1; 
  }

  if ($index < 0) { 
    $index = $galleryLength-1;
  }
  if ($index > 12) {
   $index = 0;
  }

  var newImgSelected = $("#list li").get($index).getElementsByTagName("a");
  var imageLocation = $(newImgSelected).attr("href");
  var imageCaption =  $(newImgSelected).children("img").attr("alt");
  
  updateImage(imageLocation, imageCaption);

};

$("#buttonPrevious").click(function(event){
  prevNext(true);
});

$("#buttonNext").click(function(event){
  prevNext();
});

$overlay.click(function(event){
  
    if(event.target.id == "overlay")
    $(this).slideUp("fast");

});

$(document).keyup(function(e) { 
        if (e.keyCode === 27) { 
            $('#overlay').hide();
        }
    });

$(document).keyup(function(e){
        if(e.keyCode === 37) {
          prevNext(true);
        }
        else if (e.keyCode === 39) {
          prevNext();
        }
      });

$("#search").keyup(function(){

  var currentQuery = $("#search").val();

  if(currentQuery !== "") {
    
    $("#list li").fadeOut( 100 );

    $("#list li").each(function(){

      var currentKeyword = $(this).attr("data-keywords");

      if (currentKeyword.toLowerCase().indexOf(currentQuery.toLowerCase()) >= 0) {

        $(this).fadeIn( 200 );
      }

    });
  } else {
    
    $("#list li").fadeIn( 200 );
    
  }

});