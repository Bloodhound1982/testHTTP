/**
 * Created by alex on 11.12.16.
 */
(function(){
    var langName = document.querySelector('#lang_name'),
        btn = document.querySelector('#btn'),
        image = document.createElement('img'),
        text = document.createElement('p'),
        regExp = new RegExp(/^\d+$/); //regexp for checking input data (only numbers)

    //add class for image and text
    text.classList.add('text');
    image.classList.add('lang_logo');

    btn.addEventListener('click', function () {
        var xhr = new XMLHttpRequest();
        var data = langName.value;
        var params;
        if (regExp.test(data)) {    //if data is number send 'id'
            params = 'id=' + data;
        } else {                    //if string - send 'name'
            params = 'name=' + data;
        }
        xhr.open('GET', '/test?' + params, true);

        // receive request from server, parse JSON to object, add info to elements
        // add elements to the DOM
        xhr.onreadystatechange = function () {
            var resObj = JSON.parse(xhr.responseText);
            image.src = !resObj.imageUrl ? 'images/error.svg'
                                         : resObj.imageUrl;
            text.innerHTML = resObj.description;
            document.body.appendChild(image);
            document.body.appendChild(text);
        };
        xhr.send();
    })
})();