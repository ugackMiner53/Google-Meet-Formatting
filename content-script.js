// ==UserScript==
// @name         Google Meet Formatting
// @namespace    https://github.com/ugackMiner53/Google-Meet-Formatting/
// @version      0.1
// @description  Adds needed formatting codes to google meet
// @author       ugackMiner
// @match        https://meet.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    var isLoaded = false;
    var checkExist = setInterval(function() {
        if (document.getElementsByClassName("KHxj8b tL9Q4c").length != 0 && !isLoaded) {
            isLoaded = true;
            console.log("Exists!, calling startup");
            clearInterval(checkExist);
            startup();
        }
    }, 100);
    var startup = function() {
     // Inserts some css for spoiler tags
     var styles = `.spoiler { color: black; background-color:black; display:inline-block; transition: background-color 0.3s; } .spoiler:hover { background-color: white; } blockquote { margin: 0; padding: 15px; background: #eee; border-radius: 5px; }`;
     var styleSheet = document.createElement("style");
     styleSheet.type = "text/css";
     styleSheet.innerText = styles;
     document.head.appendChild(styleSheet)
         // Applies an ID to the messagebox used to type in chat because meet uses classes and no ids, which are hard to identify, so here we add an ID to it
     document.getElementsByClassName("KHxj8b tL9Q4c")[0].id = "messagebox"
     // Applies an ID to the messagebox where the messages are shown
     document.getElementsByClassName("z38b6 CnDs7d hPqowe")[0].id = "chatbox";
     // Adds a mutation event to the messagebox to check for messages
     mutationObserver.observe(document.getElementById("chatbox"), {
         // Looks for new messages
         childList: true,
         // Looks for edits to existing messages (i.e a new message right after an old one)
         subtree: true
     });
     console.log("Loaded!");
    };
 })();


var mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        onMessageEvent();
    });
});


var oldMessageId;
function onMessageEvent()
{
    var messageElement = document.getElementsByClassName("oIy2qc")[document.getElementsByClassName("oIy2qc").length - 1];
    var message = messageElement.innerHTML;
    var author = document.getElementsByClassName("YTbUzc")[document.getElementsByClassName("YTbUzc").length - 1].textContent;
    if (document.getElementsByClassName("gYckH").length != 0 || oldMessageId === document.getElementsByClassName("oIy2qc").length - 1)
    {
        return;
    }
    oldMessageId = document.getElementsByClassName("oIy2qc").length - 1;
    
    console.log(author + ": " + message)
    
    // Replace ** with bold
    messageElement.innerHTML = messageElement.innerHTML.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
    // Replace * with italics
    messageElement.innerHTML = messageElement.innerHTML.replace(/\*(.+?)\*/g, "<i>$1</i>");
    // Replace _ with underline
    messageElement.innerHTML = messageElement.innerHTML.replace(/\_(.+?)\_/g, "<u>$1</u>");
    // Replace ~~ with strikethrough
    messageElement.innerHTML = messageElement.innerHTML.replace(/\~\~(.+?)\~\~/g, "<s>$1</s>");
    // Replace ^ with superscript (range of characters)
    messageElement.innerHTML = messageElement.innerHTML.replace(/\^(.+?)\^/g, "<sup>$1</sup>");
    // Replace ^ with superscript (single character)
    messageElement.innerHTML = messageElement.innerHTML.replace(/\^(\d)/g, "<sup>$1</sup>");
    // Replace || with custom spoiler spans
    messageElement.innerHTML = messageElement.innerHTML.replace(/\|\|(.+?)\|\|/g, "<p class='spoiler'>$1</p>");
    // Replace ``` with code blocks
    messageElement.innerHTML = messageElement.innerHTML.replace(/\`\`\`(.+?)\`\`\`/g, "<pre><code>$1</code></pre>");
    // Replace ` with inline code
    messageElement.innerHTML = messageElement.innerHTML.replace(/\`(.+?)\`/g, "<code>$1</code>");
    // Replace "" with a block quote
    messageElement.innerHTML = messageElement.innerHTML.replace(/\"\"(.+?)\"\"/g, "<blockquote><p>$1</p></blockquote>");
    // Replace # with highlighting
    messageElement.innerHTML = messageElement.innerHTML.replace(/\#(.+?)\#/g, "<mark>$1</mark>");
    // Replace $$ with an image src
    
    
    if (message.includes("/tableflip"))
        messageElement.innerHTML = "(╯°□°）╯︵ ┻━┻";
    else if (message.includes("/shrug"))
        messageElement.innerHTML = "¯\\_(ツ)_/¯";
    else if (message.includes("/unflip"))
        messageElement.innerHTML = "┬─┬ ノ( ゜-゜ノ)";
    else if (message.includes("/help"))
        messageElement.innerHTML = "<b><u><i>Google Meet Formatting Help</i></u></b><br><br>Bold: Use **text** to get <b>text</b><br>Italics: Use *text* to get <i>text</i><br>Underline: Use _text_ to get <u>text</u><br>Strikethrough: Use ~~text~~ to get <s>text</s><br>Superscript: Use ^text^ to get <sup>text</sup><br>Spoiler: Use ||text|| to get <p class='spoiler'>text</p><br>Code: Use `text` to get <code>text</code><br>Quote: Use \"\"text\"\" to get <blockquote>text</blockquote><br>Highlighting: Use #text# to get <mark>text</mark>"

    /*
	var port = chrome.runtime.connect({name: "googlemeetchat"});
	port.onMessage.addListener(function(msg) {
        if (msg.sendmessage !== null) {
            console.log("Message should be sent" + msg.sendmessage);
		};
	})
	port.postMessage({message: author + ": " + message});
    */

}