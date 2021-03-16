// a javascript file using ajax for handling POST and DELETE requests

$(document).ready(function(){

    $(form).on('submit', function(){

        let item = $('form input');
        let todo = {item: item.val()};

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function(data){
                // some code here please
                location.reload();
            }
        });

        return false;
    });

    $('li').on('click', function(){
        var item = $(this).text().replace(/ /g, "-");
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: function(data){
                // some code here please
                location.reload();
            }
        });
    });
});