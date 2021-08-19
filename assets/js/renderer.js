let sendResponse = document.getElementById("response");
document.getElementById('name-form').addEventListener('submit', (event) => {
    // Prevent the form from actually being "submitted", as that will effectively reload the page.
    event.preventDefault()
  
    // event.target refers to the <form> element that's attached to the submit event.
    const form = event.target
    let tokens_data = {
        consumer_key: form.consumer_key.value,
        consumer_secret: form.consumer_secret.value,
        access_token: form.access_token.value,
        access_token_secret: form.access_token_secret.value
      }

      if (form.consumer_key.value === "" || form.consumer_secret.value === "" || form.access_token.value === "" || form.access_token_secret.value === "") {
        console.log("Au moins un champ non rempli");
        sendResponse.innerHTML = `Error : At least one token missing`;
        sendResponse.classList.add("error");
        setTimeout(function()  {
            sendResponse.innerHTML = "";
            sendResponse.classList.remove("error")
        }, 5000);
    } else {
      sendResponse.innerHTML = "Your tokens have been updated !";
      sendResponse.classList.add("ok");
      window.myAPI.printNameToCLI(tokens_data)
      setTimeout(function()  {
        sendResponse.innerHTML = "";
        sendResponse.classList.remove("ok");
    }, 5000);
    }
  
    // Send the value of the text input box to the main process via the context bridge API
    // defined in the preload script.
  })