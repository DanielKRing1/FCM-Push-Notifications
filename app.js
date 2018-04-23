(function(){
  // Permission Notifications
  // Register Service Worker
  // Manifest
  // Subscribe to Push Services

  // Fb Database- store posts
  // Fb Cloud Messaging- deliver messages
  // Fb Cloud Functions- Watch database changes

  var config = {
    apiKey: "AIzaSyAif6z5dFWTN2KdRgT60e6fkczE9qC2-Gw",
    authDomain: "angulardemo-17478.firebaseapp.com",
    databaseURL: "https://angulardemo-17478.firebaseio.com",
    projectId: "angulardemo-17478",
    storageBucket: "angulardemo-17478.appspot.com",
    messagingSenderId: "449211195314"
    };
  firebase.initializeApp(config);

  var app = angular.module('myApp', ['firebase']);

  app.controller('ctrl', ["$scope","$http","$firebaseArray",function($scope,$http,$firebaseArray){

    		var rootRef = firebase.database().ref();
        var ref = rootRef.child("devices");
    		$scope.deviceList = $firebaseArray(ref);

        var currentTokenKey;

        console.log($scope.deviceList);




        var msgEl   = document.getElementById("msg");
        var tokenEl = document.getElementById("token");
        var notifEl = document.getElementById("notif");
        var errEl   = document.getElementById("err");

        // Messaging object
        const messaging = firebase.messaging();
        var tokenSentToServer;
        // Web credentials
        // messaging.usePublicVapidKey("BAxispgwnBtsSwV43aEoiCdr7_sPn0VXvkeQzByni-D1lkkQzYEGYlmlxfSa8sYRfW1RktlrqYnqnxFoWzq5vdw");

        $scope.sendNotification = function() {
          $scope.deviceList.$loaded()
            .then(() => {
              for(var i = 0; i < $scope.deviceList.length; i++){
                console.log($scope.deviceList[i].$value);
                // $http({
                //   method: 'POST',
                //   url: 'https://gcm-http.googleapis.com/gcm/send',
                //   headers: {
                //     'Content-Type': 'application/json',
                //     'Authorization': key='AIzaSyAif6z5dFWTN2KdRgT60e6fkczE9qC2-Gw'
                //   },
                //   'to': $scope.deviceList[i].$value,
                //   'data':{
                //       "notification" : {
                //       "body" : "This is an FCM notification message!",
                //       "title" : "FCM Message",
                //       }
                //    }
                // })
                // .then((res) => {
                //   console.log('Successfully sent notification');
                // })
                // .catch((err) => {
                //   console.log('Failed to send notification: ' + err);
                // });


                // curl -X POST -H "Authorization:  AAAAaJcS37I:APA91bF_RiTK8rUHSx5b0zDylDZUl9Gk1k83oBpGef_Cmz4-zqR4fR4FDjriCdSo5b5Bm8wvmO1i88dshV-wlHN8vjs05fEx9ZSxDDFmKxeRElCh5QDH865JoFsIDmChOm2QG7YTKm__" -H "Content-Type: application/json" -d '{
                //  "message":{
                //    "notification": {
                //      "title": "FCM Message",
                //      "body": "This is an FCM Message",
                //    },
                //    "token": "eNtTM6hHv_8:APA91bHQrlFtVkjEnnguK-1748w7M7A0w1RHlRt3VADX_I6Jym4xMt0kOJZlWYHOwQMuePtIpMyTdnkigmzXpxnlp1lyD7ktXJ-fdqRJ75YiDP6mt88b_jgOdBkvwE63RZW9Y22YsX1O"
                //    }
                //  }' "https://fcm.googleapis.com/v1/projects/angulardemo-17478/messages:send"




                // curl -X POST --header "Authorization: key=AAAAaJcS37I:APA91bF_RiTK8rUHSx5b0zDylDZUl9Gk1k83oBpGef_Cmz4-zqR4fR4FDjriCdSo5b5Bm8wvmO1i88dshV-wlHN8vjs05fEx9ZSxDDFmKxeRElCh5QDH865JoFsIDmChOm2QG7YTKm__" \
                // --Header "Content-Type: application/json" \
                // https://fcm.googleapis.com/fcm/send \
                // -d "{\"to\":\"eNtTM6hHv_8:APA91bHQrlFtVkjEnnguK-1748w7M7A0w1RHlRt3VADX_I6Jym4xMt0kOJZlWYHOwQMuePtIpMyTdnkigmzXpxnlp1lyD7ktXJ-fdqRJ75YiDP6mt88b_jgOdBkvwE63RZW9Y22YsX1O\",\"notification\":{\"body\":\"Yellow\"},\"priority\":10}"



                $http({
                  method: 'POST',
                  url: 'https://iid.googleapis.com/iid/v1/eNtTM6hHv_8:APA91bHQrlFtVkjEnnguK-1748w7M7A0w1RHlRt3VADX_I6Jym4xMt0kOJZlWYHOwQMuePtIpMyTdnkigmzXpxnlp1lyD7ktXJ-fdqRJ75YiDP6mt88b_jgOdBkvwE63RZW9Y22YsX1O/rel/topics/push',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'key=AAAAaJcS37I:APA91bF_RiTK8rUHSx5b0zDylDZUl9Gk1k83oBpGef_Cmz4-zqR4fR4FDjriCdSo5b5Bm8wvmO1i88dshV-wlHN8vjs05fEx9ZSxDDFmKxeRElCh5QDH865JoFsIDmChOm2QG7YTKm__'

                  },
                  data: {

                  }
                }).then(function successCallback(res) {
                     // this callback will be called asynchronously
                     // when the response is available
                     console.log("Success: " + res);
                   }, function errorCallback(err) {
                     // called asynchronously if an error occurs
                     // or server returns response with an error status.
                     console.log("Error: " + err);
                   });



                // POST 'https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send HTTP/1.1'
                //
                // Content-Type: application/json
                // Authorization: AAAAaJcS37I:APA91bF_RiTK8rUHSx5b0zDylDZUl9Gk1k83oBpGef_Cmz4-zqR4fR4FDjriCdSo5b5Bm8wvmO1i88dshV-wlHN8vjs05fEx9ZSxDDFmKxeRElCh5QDH865JoFsIDmChOm2QG7YTKm__
                //
                //   "message":{
                //     "token" : "eNtTM6hHv_8:APA91bHQrlFtVkjEnnguK-1748w7M7A0w1RHlRt3VADX_I6Jym4xMt0kOJZlWYHOwQMuePtIpMyTdnkigmzXpxnlp1lyD7ktXJ-fdqRJ75YiDP6mt88b_jgOdBkvwE63RZW9Y22YsX1O",
                //     "notification" : {
                //       "body" : "This is an FCM notification message!",
                //       "title" : "FCM Message",
                //       }
                //    }

              }
            });
        };

        // Get Push Token
        $scope.deviceList.$loaded()
          .then(() => {
            // Permission for notifications, PROMISE
            messaging.requestPermission()
            .then(() => {
              msgEl.innerHTML = 'Notif permission granted';

              // Get token, return PROMISE
              return messaging.getToken();
            })
            .then((token) => {
              tokenEl.innerHTML = ('token: '+ token);

              // Valid token
              if(token) {
                console.log('Sucessfully retrieved token');

                tokenSentToServer = true;

                // Check if token already exists
                var tokenAlreadySaved = false;
                for(var i = 0; i < $scope.deviceList.length; i++){
                  if($scope.deviceList[i].$value == token) {
                    currentTokenKey = $scope.deviceList[i].$id;

                    tokenAlreadySaved = true;
                    console.log(currentTokenKey);
                    break;
                  }
                }

                if(!tokenAlreadySaved){
                  $scope.deviceList.$add(token)
                    .then((item) => {
                      currentTokenKey = item.key;
                      console.log(item.key);
                    });
                }

            }else {
              console.log('No token received');

              tokenSentToServer = false;
            }
          })
          .catch((err) => {
            errEl.innerHTML = 'Error: '+ err;
            // showToken('Error retrieving Instance ID token.' , err);
            tokenSentToServer = false;
          });
        });

          // Obtain refreshed token
          messaging.onTokenRefresh(() => {
            messaging.getToken().then((refreshedToken) => {
              console.log('Token refreshed');
              tokenSentToServer = false;

              $scope.deviceList.$remove($scope.deviceList.$getRecord(currentTokenKey));
              $scope.deviceList.$add(refreshedToken)
                .then((item) => {
                  currentTokenKey = item.key;
                });
            })
            .catch((err) => {
              console.log('Unable to retrieve refreshed token: ', err);
            })
          })


        // const messaging = firebase.messaging();
        // messaging.requestPermission()
        //   .then(() => {
        //     msgEl.innerHTML = 'Notif permission granted';
        //     console.log("Notification permission granted.");
        //
        //     // Get token as promise
        //     return messaging.getToken();
        //   })
        //   .then((token) => {
        //     tokenEl.innerHTML = "Token is: "+token;
        //     // Promise
        //     // $scope.deviceList.$remove(token);
        //     // $scope.addDevice(token);
        //
        //     // This registration token comes from the client FCM SDKs.
        //
        //     // See documentation on defining a message payload.
        //     var message = {
        //       data: {
        //         score: '850',
        //         time: '2:45'
        //       },
        //       token: token
        //     };
        //
        //   })
        //   // .then((ref) => {
        //   //   console.log('removed');
        //   // })
        //   .catch((err) => {
        //     errEl.innerHTML = errEl.innerHTML + ": "+ err;
        //     console.log("Unable to get permission to notify");
        //   });
        //
        //
        // $scope.addDevice = function(token) {
        //   ref.push(token);
    		// };

  }]);


  // const messaging = firebase.messaging(),
  //       database  = firebase.database(),
  //       pushBtn   = document.getElementById('push-button');
  //
  // let userToken     = null,
  //     isSubscribed  = false;
  //
  // window.addEventListener('load', () => {
  //   if('serviceWorker' in navigator) {
  //     navigator.serviceWorker.register('firebase-messaging-sw.js')
  //       .then((reg) => {
  //         messaging.useServiceWorker(reg);
  //         initializePush();
  //       })
  //       .catch((err) => {
  //         console.log('Service worker error: ', err);
  //       });
  //   }else {
  //     pushBtn.textContent = 'Push not supported.';
  //   }
  // });
  //
  // function initializePush() {
  //   userToken = localStorage.getItem('pushToken');
  //
  //   isSubsribed = (userToken !== null);
  //   updateBtn();
  //
  //   pushBtn.addEventListener('click', () => {
  //     pushBtn.disabled = true;
  //
  //     if(isSubscribed) { return unsubscribeUser(); }
  //
  //     return subscribeUser();
  //   })
  // };
  //
  // function updateBtn() {
  //   if(Notification.permission === 'denied') {
  //     pushBtn.textContent = 'Subscription blocked';
  //     return;
  //   }
  //
  //   pushBtn.textContent = isSubscribed ? 'Unsubscribe' : 'Subscribe';
  //   pushBtn.disabled = false;
  // };
  //
  // function subscribeUser() {
  //   messaging.requestPermission()
  //     .then(() => messaging.getToken())
  //     .then((token) => {
  //       updateSubscriptionOnServer(token);
  //       isSubscribed = true;
  //       useerToken = token;
  //       localStorage.setItem('pushToken', token);
  //       updateBtn();
  //     })
  //     .catch((err) => {
  //       console.log('Denied: ', err);
  //     });
  // };
  //
  // function updateSubscriptionOnServer(token) {
  //   if(isSubscribed) {
  //     return database.ref('device_ids')
  //             .equalTo(token)
  //             .on('child_added', snapshot => snapshot.ref.remove());
  //   }
  //
  //   database.ref('device_ids').once('value')
  //     .then(snapshots => {
  //       let deviceExists = false;
  //
  //       snapshots.forEach(childSnapshot => {
  //         if(childSnapshot.val() === token) {
  //           deviceExists = true;
  //           return console.log('Device already registered');
  //         }
  //       });
  //
  //       if(!deviceExists) {
  //         console.log('Device subscribed');
  //         return database.ref('device_ids').push(token);
  //       }
  //
  //     });
  // };
  //
  // function unsubscribeUser() {
  //   messaging.deleteToken(userToken)
  //     .then(() => {
  //       updateSubscriptionOnServer(userToken);
  //       isSubscribed = false;
  //       userToken = null;
  //       localStorage.removeItem('pushToken');
  //       updateBtn();
  //     })
  //     .catch((err) => {
  //       console.log('Error unsubscribing: ', err);
  //     });
  // };
  //
  // messaging.onMessage(payload => {
  //   const snackbarContainer = document.querySelector('#snackbar');
  //
  //   let data = {
  //     message: payload.notification.title,
  //     timeout: 5000,
  //     actionHandler() {
  //       location.reload()
  //     },
  //     actionText: 'Reload'
  //   }
  //
  //   snackbarContainer.MaterialSnackbar.showSnackbar(data);
  //   console.log('onMessage: ', payload);
  // });
  //
  //
  // const admin     = require('firebase-admin'),
  //       functions = require('firebase-functions');

  // curl -X POST -H "Authorization: key=AIzaSyAif6z5dFWTN2KdRgT60e6fkczE9qC2-Gw" -H "Content-Type: application/json" \
  // -d '{
  //   "data": {
  //     "notification": {
  //       "title": "FCM Message",
  //       "body": "This is an FCM Message",
  //       "icon": "/itwonders-web-logo.png",
  //     }
  //   },
  //   "to": "eNtTM6hHv_8:APA91bHQrlFtVkjEnnguK-1748w7M7A0w1RHlRt3VADX_I6Jym4xMt0kOJZlWYHOwQMuePtIpMyTdnkigmzXpxnlp1lyD7ktXJ-fdqRJ75YiDP6mt88b_jgOdBkvwE63RZW9Y22YsX1O"
  // }' https://fcm.googleapis.com/fcm/send
})();
