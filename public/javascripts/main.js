/**
 * Created by alex on 11.12.16.
 */
(function(){
    var langName = document.querySelector('#lang_name'),
        btn = document.querySelector('#btn');

    btn.addEventListener('click', function () {
        var xhr = new XMLHttpRequest();
        var data = langName.value;
        var params;
        if (isNaN(parseInt(data))) {
            params = 'name=' + data;
        } else {
            params = 'id=' + data;
        }
        xhr.open('GET', '/users?' + params, true);
        xhr.onreadystatechange = function () {
            console.log(xhr.responseText);
        };
        xhr.send();
    })
})();