$(document).on("click", ".spread-more", function() {
    var index = $(".spread-more").index(this); 
    // console.log(index);
    if($('.group-more-desc').eq(index).css('display') === 'none'){       
        $(".group-more-desc").eq(index).show();
    } else { 
        $(".group-more-desc").eq(index).hide();
    }
});

console.log("dpd");

// var invitation = $('.reply-profile');
$(document).on("click", ".reply-profile", function (event) {
   x = event.pageX;
   y = event.pageY; 
//    alert('x좌표:' +x + ', y좌표:' + y);
   $(".group-reply-popup").css({"top":y, "left":x, "z-index": 100}).show();
//    console.log("whyery");
})