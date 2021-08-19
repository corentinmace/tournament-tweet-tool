const Twit = require('twit')
const fs = require('fs');
const { send } = require('process');
let sendResponse = document.getElementById("response");

let rawtokkens = fs.readFileSync('tokens.json');
let tokens_file = JSON.parse(rawtokkens);



var T = new Twit({
    consumer_key: tokens_file.consumer_key,
    consumer_secret: tokens_file.consumer_secret,
    access_token: tokens_file.access_token,
    access_token_secret: tokens_file.access_token_secret,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
})


function getData() {
    let player_1 = document.getElementById('player_1').value;
    let player_2 = document.getElementById('player_2').value;
    let player_1_checkbox = document.getElementById('player_1_checkbox');
    let player_2_checkbox = document.getElementById('player_2_checkbox');
    let player_1_has_twitter = "";
    let player_2_has_twitter = "";
    let round = document.getElementById('round').value;
    let twitch = document.getElementById('twitch').value;

    if (player_1_checkbox.checked) {
        player_1_has_twitter = "@";
    }

    if (player_2_checkbox.checked) {
        player_2_has_twitter = "@";
    }

    console.log(player_1);
    console.log(player_2);
    console.log(round);
    console.log(twitch);
    console.log(player_1_has_twitter);
    console.log(player_2_has_twitter);


    if (player_1 === "" || player_2 === "" || round === "" || twitch === "") {
        console.log("Au moins un champ non rempli");
        sendResponse.innerHTML = `Error : Something is missing !`;
        sendResponse.classList.add("error");
        setTimeout(function()  {
            sendResponse.innerHTML = "";
            sendResponse.classList.remove("error")
        }, 5000);
    } else {
        console.log("tout est ok");
        T.post('statuses/update', { status: `${round} : ${player_1_has_twitter}${player_1} vs ${player_2_has_twitter}${player_2} \n https://twitch.tv/${twitch}` }, function(err, data, response) {
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
                sendResponse.innerHTML = "Your tweet has been sent !";
                sendResponse.classList.add("ok");
                setTimeout(function()  {
                    sendResponse.innerHTML = "";
                    sendResponse.classList.remove("ok");
                }, 5000);
            }
        })
    }


}