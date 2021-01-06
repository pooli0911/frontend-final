$(document).ready(function () {

    // Initialize Firebase
    firebase.initializeApp({
        apiKey: "AIzaSyBfxMkUm2p6i3K78Y7nSgq6LgjgWZ4zrBw",
        authDomain: "final-9e957.firebaseapp.com",
        projectId: "final-9e957",
        storageBucket: "final-9e957.appspot.com",
        messagingSenderId: "405229192888",
        appId: "1:405229192888:web:31fa0e5d01d250e388564d",
        measurementId: "G-MZP5FBJGP4"
    });

    // Reference chatroom document
    const docRef = firebase.firestore()
        .collection("chatrooms")
        .doc("chatroom1");
    // Reference chatroom messages
    const messagesRef = docRef.collection("messages");

    // Referenct authentifacation
    const auth = firebase.auth();

    // Reference chatroom messages query
    const queryRef = messagesRef
        .orderBy("timeStamp", "asc");

    // Store Profile Info
    let profile_Name,
        profile_photoURL;

    // REGISTER DOM ELEMENTS
    const $email = $('#email');
    const $password = $('#password');
    const $btnSignIn = $('#btnSignIn');
    const $btnSignUp = $('#btnSignUp');
    const $btnSignOut = $('#btnSignOut');
    const $signInfo = $('#sign-info');
    const $cardHeader = $('#card-header');
    const $messageField = $('#message-field');
    const $messageList = $('#message-list');
    const $userName = $('#user-name');
    const $userPhoto = $('#user-photo');
    $signInfo.html("");

    // SignIn
    $btnSignIn.click(function (e) {
        $btnSignIn.html(`<div class="load">
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
    </div>`);
        auth.signInWithEmailAndPassword($email.val(), $password.val())
            .then(function (e) {
                $btnSignIn.html(`登入`);
                window.location.href = "./aftersignin.html";
            })
            .catch(function (e) {
                $btnSignIn.html(`登入`);
                console.log(e.message);
                $signInfo.html(e.message);
            });
    });


    // SignUp
    $btnSignUp.click(function (e) {
        console.log('sign up now ...');
        $btnSignUp.html(`<div class="load">
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
    </div>`);
        auth.createUserWithEmailAndPassword($email.val(), $password.val())
            .then(function () {
                const user = auth.currentUser;
                profile_Name = $('#userName').val();
                profile_photoURL = $('#photoURL').val();
                console.log(user);

                user.updateProfile({
                    displayName: profile_Name,
                    photoURL: profile_photoURL
                })
                    .then(function () {
                        $btnSignUp.html(`立即註冊`);
                        $email.val('');
                        $password.val('');
                        $('#userName').val('');
                        $('#photoURL').val('');
                        console.log("Update successful.");
                        window.location.href = "./aftersignin.html";
                    });
            })
            .catch(function (e) {
                console.log(e.message);
                $signInfo.html(e.message);
            });
    });

    // Listening Login User
    auth.onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            $signInfo.html(`${user.email} is login...`);
            user.providerData.forEach(function (profile) {
                profile_Name = profile.displayName;
                $userName.html(profile.displayName);
                $userPhoto.attr("src", profile.photoURL);
            });
        } else {
            console.log("not logged in");
        }
    });


    // Signout
    $btnSignOut.click(function () {
        auth.signOut();
        $email.val('');
        $password.val('');
        $signInfo.html('No one login...');
        window.location.href = "./index.html";
    });

    // SET CHAT ROOM TITLE
    docRef.get().then(function (doc) {
        $cardHeader.html(doc.data().name);
    });

    // LISTEN FOR KEYPRESS EVENT
    $messageField.keypress(function (e) {
        if (e.keyCode == 13) {
            //FIELD VALUES
            let message = $messageField.val();

            //SAVE DATA TO FIREBASE
            messagesRef.add({
                "senderName": profile_Name,
                "message": message,
                "timeStamp": Date.now()
            });

            // EMPTY INPUT FIELD
            $messageField.val('');
        }
    });

    // A RENDER SCREEN CALLBACK THAT IS TRIGGERED FOR EACH CHAT MESSAGE
    queryRef.onSnapshot(function (querySnapshot) {
        $messageList.html('');
        //MONITOR CHAT MESSAGE AND RENDER SCREEN
        querySnapshot.forEach(function (doc) {
            let senderName = doc.data().senderName || "anonymous";
            let message = doc.data().message;
            let messageItem = `
          <li class="message-item">
            <strong class="chat-username">${senderName}:</strong>
            ${message}
          </li>
          `;
            $messageList.append(messageItem);
        });
        if ($messageList[0]) {
            //SCROLL TO BOTTOM OF MESSAGE LIST
            $messageList[0].scrollTop = $messageList[0].scrollHeight;

        }
    });
    firebase.auth().onAuthStateChanged(user => {

        // 登入中
        if (user) {
            console.log("user", user)




            // 更新 User 資訊
            const displayName = user.displayName;
            const email = user.email;
            const uid = user.uid;
            const emailVerify = user.emailVerified;
            if (displayName) {
                document.getElementById('user-name').innerHTML = `您的名稱：${displayName}`;
            }
            document.getElementById('user-email').innerHTML = `您的帳號：${email}`;
            document.getElementById('user-uid').innerHTML = `您的Uid：${uid}`;
            document.getElementById('user-email-verify').innerHTML = `您的信箱是否驗證：${emailVerify}`;



            // 更新 User 名稱
            function updateUserName(name) {
                user.updateProfile({
                    displayName: name
                }).then(() => {
                    window.location.reload();
                }).catch(function (error) {
                    changeErrMessage(error.message);
                });
            }

            const btnUserName = document.getElementById('editor');
            btnUserName.addEventListener('click', e => {
                document.querySelector('.user-logged').classList.add('none');
                document.querySelector('.user-editor').classList.remove('none');
            });

            const btnUserNameSure = document.getElementById('sure-name');
            btnUserNameSure.addEventListener('click', e => {
                const name = document.getElementById('new-name').value;
                updateUserName(name);
            });



            // 修改密碼
            // 參考：https://stackoverflow.com/questions/55271096/firebase-problem-updating-password-after-re-authenticating
            function updatePassword() {
                const newPassword = document.getElementById('new-password').value;

                // 重新驗證使用者，驗證成功才能更新密碼
                reAuth('old-password-change')
                    .then(user => {
                        user.updatePassword(newPassword).then(() => {
                            window.alert('密碼更新完成，請重新登入');
                            firebase.auth().signOut().then(() => {
                                window.location.reload();
                            });
                        }).catch(error => {
                            changeErrMessage(error.message)
                        });
                    })
                    .catch(error => {
                        changeErrMessage(error.message)
                    });

            }
            const btnPassword = document.getElementById('changePassword');
            btnPassword.addEventListener('click', e => {
                document.querySelector('.user-logged').classList.add('none');
                document.querySelector('.user-password').classList.remove('none');
            });

            const btnPasswordSure = document.getElementById('sure-password');
            btnPasswordSure.addEventListener('click', () => {
                const password = document.getElementById('new-password').value;
                updatePassword(password)
            })



            // 信箱驗證
            const btnVerifyEmail = document.getElementById('verify-email');
            btnVerifyEmail.addEventListener('click', () => {
                // firebase.auth().languageCode = 'zh-TW'; // 發信模版改中文
                user.sendEmailVerification().then(() => {
                    // 驗證信發送完成
                    window.alert('驗證信已發送到您的信箱，請查收。')
                }).catch(error => {
                    // 驗證信發送失敗
                    changeErrMessage(error.message);
                });
            });

            // 登出
            const btnLogOut = document.getElementById('logout');
            btnLogOut.addEventListener('click', () => {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        window.location.reload();
                    }).catch(error => {
                        changeErrMessage(error.message)
                    });
            })



            // 刪除帳號
            function deleteUser() {
                // 重新驗證使用者，驗證成功才刪除
                reAuth('old-password-delete')
                    .then(user => {
                        user.delete().then(() => {
                            window.alert('您的帳號已成功刪除');
                            window.location.reload();
                        }).catch(error => {
                            changeErrMessage(error.message)
                        });
                    })
                    .catch(error => {
                        changeErrMessage(error.message)
                    })

            }
            const btnDelete = document.getElementById('delete-user');
            btnDelete.addEventListener('click', e => {
                document.querySelector('.user-logged').classList.add('none');
                document.querySelector('.user-delete').classList.remove('none');
            });
            const btnDeleteSure = document.getElementById('sure-delete');
            btnDeleteSure.addEventListener('click', () => {
                deleteUser();
            })

        }
        // 未登入
        else {

            // 隱藏會員區塊
            document.querySelector('.user-null').classList.remove('none');

            changeErrMessage('');



            // 忘記密碼
            const btnForget = document.getElementById('forgot');
            btnForget.addEventListener('click', e => {
                e.preventDefault();
                document.querySelector('.user-null').classList.add('none');
                document.querySelector('.user-forgot').classList.remove('none');
            });

            const btnUserForgotSure = document.getElementById('sure-forgot');
            btnUserForgotSure.addEventListener('click', e => {
                const emailAddress = document.getElementById('new-forgot').value;
                const auth = firebase.auth();
                firebase.auth().languageCode = 'zh-TW'; // 發信模版改中文

                auth.sendPasswordResetEmail(emailAddress).then(() => {
                    window.alert('已發送信件至信箱，請按照信件說明重設密碼');
                    window.location.reload();
                }).catch(error => {
                    changeErrMessage(error.message)
                });
            })

        }

    });
});


