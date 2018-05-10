var allMessages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "My name is <font size=\"5\" face=\"arial\" color=\"#FF69B4\">Tara</font>. NICE TO MEET YOU!<br><font size=\"3\" color=\"##00FFFF\">Call me now to start!</font></br>", //var keeps track of what the chatbot is going to say
  botName = 'Chatbot',
  apigClient

apigClient = apigClientFactory.newClient();
allMessages.push("<b>" + botName + ":</b> " + botMessage)
console.log("allmessage" + allMessages)
for (var i = 1; i < 8; i++) {
          if (allMessages[allMessages.length - i])
             document.getElementById("chatlog" + i).innerHTML = allMessages[allMessages.length - i];}




function BotRequest(userMessage) {
    
    var params = {
	};

	var body = {
	"messages": [
    	{
      	"type": "string",
      	"unstructured": {
      		"id": "123",
      		"text": userMessage,
       		"timestamp": new Date().getTime()
      		}
    	}
  	    ]
	};

	var additionalParams = {};

	apigClient.chatbotPost(params, body, additionalParams)
	.then(function(result){
		console.log("Successs")
		completeRequest(result);
	}).catch(function(result) {
		console.log("Failure: ")
	})
	return botMessage
}

function completeRequest(result) {
	console.log(result);
	var data = result["data"];
	var messages = data["messages"]
	var message = messages[0]
	botMessage = message["text"]
	var timestamp = message["timestamp"]
	//display delay
	allMessages.push("<b>" + botName + ":</b> " + botMessage);
	for (var i = 1; i < 8; i++) {
        if (allMessages[allMessages.length - i])
            document.getElementById("chatlog" + i).innerHTML = allMessages[allMessages.length - i];
    }
	
}

function newEntry() {
	if(document.getElementById("chatbox").value != "") {
		userMessage = document.getElementById("chatbox").value;
		if (userMessage == "Tara" || userMessage == "tara")
			userMessageDisplay = "<font size=\"5\" face=\"arial\" color=\"#FF69B4\">Tara</font>"
		else if (userMessage == "play music")
			userMessageDisplay = "<font size=\"5\" face=\"arial\" color=\"#32CD32\">play music</font>"
		else if (userMessage == "recommend music")
			userMessageDisplay = "<font size=\"5\" face=\"arial\" color=\"#32CD32\">recommend music</font>"
		else if (userMessage == "have conversation")
			userMessageDisplay = "<font size=\"5\" face=\"arial\" color=\"#32CD32\">have conversation</font>"
		else
			userMessageDisplay = userMessage
		document.getElementById("chatbox").value = "";
		allMessages.push("<b>" + "Me" + ":</b> " + userMessageDisplay);
		botMessage = BotRequest(userMessage);//3
	}
}
document.onkeypress = keyPress;
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    newEntry();
  }
  if (key == 38) {
    console.log('hi')
  }
}

function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}
