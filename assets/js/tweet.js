var Twit = require('twit')
var fs = require('fs');
const { send } = require('process');
let sendResponse = document.getElementById("response");

var T = new Twit({
    consumer_key: "ZFqcvm0F1IDBBub0gxLs1KKbj",
    consumer_secret: "PaPWTsKqFuJt2wi5BNS3VaLMH04q9nPn1dEc9Jxa6MgWGKFrle",
    access_token: "2596094331-KEFlHMk3xhwlGy6V6gFCxwYIvPMS82EkbBDas4s",
    access_token_secret: "SAUBZbclIRBKLSMxY5OugCj5GTK8UYRHnOJgbTONsTXpf",
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
})


function getData() {
    let player_1 = document.getElementById('player_1').value;
    let player_2 = document.getElementById('player_2').value;
    let round = document.getElementById('round').value;
    let twitch = document.getElementById('twitch').value;

    console.log(player_1);
    console.log(player_2);
    console.log(round);
    console.log(twitch);

    if (player_1 === "" || player_2 === "" || round === "" || twitch === "") {
        console.log("Au moins un champ non rempli");
        sendResponse.innerHTML = `Error : Merci de remplir toutes les informations`;
        sendResponse.classList.add("error");
        setTimeout(function()  {
            sendResponse.innerHTML = "";
            sendResponse.classList.remove("error")
        }, 5000);
    } else {
        console.log("tout est ok");
        T.post('statuses/update', { status: `${round} : @${player_1} vs @${player_2} \n https://twitch.tv/${twitch}` }, function(err, data, response) {
            console.log(err);
            console.log(data);

            if (err !== undefined) {
                sendResponse.innerHTML = `${err}`;
                sendResponse.classList.add("error");
                setTimeout(function()  {
                    sendResponse.innerHTML = "";
                    sendResponse.classList.remove("error")
                }, 5000);
            } else {
                sendResponse.innerHTML = "Votre Tweet à bien été envoyé !";
                sendResponse.classList.add("ok");
                setTimeout(function()  {
                    sendResponse.innerHTML = "";
                    sendResponse.classList.remove("ok");
                }, 5000);
            }
        })
    }


}