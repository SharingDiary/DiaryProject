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