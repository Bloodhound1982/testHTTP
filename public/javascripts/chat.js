"use strict";
;(function () {
    let sendButton = document.querySelector('#send_btn'),
        socket = io(),
        chatWindow = document.querySelector('#chat_window'),
        title = document.querySelector('#connect'),
        messageForm = document.querySelector('#message_form'),
        messageInput = document.querySelector('#message'),
        createRoomForm = document.querySelector('#create_room_form'),
        roomNameInput = document.querySelector('#room_name'),
        createRoomBtn = document.querySelector('#create_room'),
        joinRoomForm = document.querySelector('#join_room_form'),
        joinRoomName = document.querySelector('#join_room_name'),
        joinUserName = document.querySelector('#join_user_name'),
        joinRoomBtn = document.querySelector('#join_room'),
        roomLabel = document.querySelector('#room_label'),
        nickLabel = document.querySelector('#nick_label'),
        listOfUsers = document.querySelector('#list_users');

    let currentRoomName,
        currentUserName;

    let messages = [];

    let addUser = function (username, isCurrent) {
        let currentTag = isCurrent ? 'tag-success' : 'tag-info';
        let user = document.createElement('span');
        user.classList.add('tag');
        user.classList.add(currentTag);
        user.classList.add('mr-1');
        user.innerText = username;
        listOfUsers.children[1].appendChild(user);
    };

    let sendMessage = function() {
        let form = new FormData(messageForm);
        let message = form.get('message');
        let objMessage = {
            room: currentRoomName,
            username: currentUserName,
            text: message,
        };

        if (objMessage.text) {
            socket.emit('new message', objMessage);
            messageInput.value = '';
        }
    };

    let changeInput = function (formElement, formGroupNumber, isDanger, text) {
        let classInform = isDanger ? 'has-danger' : 'has-success';
        let formGroup = formElement.children[formGroupNumber];
        formGroup.classList.add(classInform);
        formGroup.children[2].innerText = text;
    };

    let addMessage = function (message, username) {
        let container = chatWindow.children[0];
        let row = document.createElement('div'),
            colFirst = document.createElement('div'),
            colSecond = document.createElement('div'),
            tag = document.createElement('span'),
            alert = document.createElement('div'),
            color = message.user === username ? 'success' : 'info';

        row.classList.add('row');
        colFirst.classList.add('col-xs-12');
        colSecond.classList.add('col-xs-12');
        tag.classList.add('tag');
        tag.classList.add('tag-' + color);
        alert.classList.add('alert');
        alert.classList.add('alert-' + color);
        tag.innerText = `[${new Date(message.date).toLocaleTimeString()}] ${message.user}`;
        alert.innerText = message.text;

        colFirst.appendChild(tag);
        colSecond.appendChild(alert);
        row.appendChild(colFirst);
        row.appendChild(colSecond);
        container.appendChild(row);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    if (createRoomBtn) {
        createRoomBtn.addEventListener('click', function () {
            let form = new FormData(createRoomForm),
                tempRoom = form.get('room_name'),
                tempUser = form.get('user_name');

            if (tempRoom && tempUser) {
                socket.emit('create room', {
                    room: tempRoom,
                    user: tempUser
                });
                socket.on('add room', function (data) {
                    currentRoomName = data;
                    roomLabel.innerText = data;
                    $('.bd-create-modal-sm').modal('hide');
                });
                socket.on('add client', function (data) {
                    nickLabel.innerText = data;
                    addUser(data, true);
                    currentUserName = data;
                });
                socket.on('error create room', function (data) {
                    changeInput(createRoomForm, 0, true, data.error);
                });
            }
        });
    }

    if (joinRoomBtn) {
        joinRoomBtn.addEventListener('click', function () {
            let form = new FormData(joinRoomForm),
                roomName = form.get('room_name'),
                userName = form.get('user_name');
            if (roomName && userName) {
                socket.emit('try join', {
                    room: roomName,
                    user: userName
                });
                socket.on('after join', function (data) {
                    if (data) {
                        currentRoomName = data.room;
                        currentUserName = data.user;
                    }
                    roomLabel.innerText = currentRoomName;
                    nickLabel.innerText = currentUserName;
                    $('.bd-join-modal-sm').modal('hide');
                });
            } else {
                if (!roomName) {
                    changeInput(joinRoomForm, 0, true, 'Please, enter room name...');
                } else {
                    changeInput(joinRoomForm, 1, true, 'Please, enter user name...')
                }
            }
        });
    }

    messageInput.addEventListener('keyup', function (event) {
        if (event.keyCode == 13) {
            sendMessage();
        }
    });

    sendButton.addEventListener('click', function () {
        sendMessage();
    });

    socket.on('testConnect', function (data) {
        let titleClasses = title.classList;
        if (data.connection) {
            if (titleClasses.contains('alert-danger')) titleClasses.remove('alert-danger');
            if (!titleClasses.contains('alert-success')) titleClasses.add('alert-success');
            title.children[0].innerText = 'Connection is successful!';
        } else {
            if (titleClasses.contains('alert-success')) titleClasses.remove('alert-success');
            if (!titleClasses.contains('alert-danger')) titleClasses.add('alert-danger');
            title.children[0].innerText = 'Connection is wrong!';
        }
    });

    socket.on('update clients', function (data) {
        listOfUsers.children[1].remove();
        let newSpace = document.createElement('li');
        newSpace.classList.add('list-group-item');
        listOfUsers.appendChild(newSpace);
        data.forEach(function (elem, idx, arr) {
            if (elem === currentUserName) {
                addUser(elem, true);
            } else {
                addUser(elem, false);
            }
        });
    });

    socket.on('update messages', function (data) {
        addMessage(data, currentUserName);
        messages.push(data);
    });

    socket.on('add old messages', function (data) {
        data.forEach(function (elem, idx, arr) {
            addMessage(elem, currentUserName);
            messages.push(data);
        })
    });

    socket.on('join new user', function (data) {
        let container = chatWindow.children[0];
        let row = document.createElement('div'),
            col = document.createElement('div'),
            tag = document.createElement('span');

        row.classList.add('row');
        col.classList.add('col-xs-12');
        tag.classList.add('tag');
        tag.classList.add('tag-pill');
        tag.classList.add('tag-warning');
        tag.innerText = `"${data.toUpperCase()}" is join to the room`;
        col.appendChild(tag);
        row.appendChild(col);
        container.appendChild(row);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    });

})();