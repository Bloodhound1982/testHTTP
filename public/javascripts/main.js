;(function () {
    let langName = document.querySelector('#lang_name'),
        btn = document.querySelector('#btn'),
        image = document.createElement('img'),
        text = document.createElement('p'),
        regExp = new RegExp(/^\d+$/); //regexp for checking input data (only numbers)

    //add class for image and text
    text.classList.add('text');
    image.classList.add('lang_logo');

    if (btn) {
        btn.addEventListener('click', function () {
            console.log('catch');
            let xhr = new XMLHttpRequest();
            let data = langName.value;
            let params;
            if (regExp.test(data)) {    //if data is number send 'id'
                params = 'id=' + data;
            } else {                    //if string - send 'name'
                params = 'name=' + data;
            }
            xhr.open('GET', '/test/query?' + params, true);

            // receive request from server, parse JSON to object, add info to elements
            // add elements to the DOM
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let resObj = JSON.parse(xhr.responseText);
                    if (resObj.status === 'error') {
                        image.src = resObj.imageUrl;
                        text.innerHTML = resObj.description;
                    } else {
                        image.src = resObj.lang.imageUrl;
                        text.innerHTML = resObj.lang.description;
                    }
                    document.body.appendChild(image);
                    document.body.appendChild(text);
                }
            };
            xhr.send();
        });
    }
})();