/**
 * Created by alex on 11.12.16.
 */
(function(){
    var langName = document.querySelector('#lang_name'),
        btn = document.querySelector('#btn'),
        image = document.createElement('img'),
        text = document.createElement('p');
    text.classList.add('text');
    image.classList.add('lang_logo');


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
            var resObj = JSON.parse(xhr.responseText);
            image.src = resObj.imageUrl;
            text.innerHTML = resObj.description;
            document.body.appendChild(image);
            document.body.appendChild(text);

        };
        xhr.send();
    })
})();