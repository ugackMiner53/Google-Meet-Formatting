// ==UserScript==
// @name         Google Meet Formatting Development
// @namespace    https://github.com/ugackMiner53/Google-Meet-Formatting/
// @version      0.0.2
// @description  Adds needed formatting codes to google meet
// @author       ugackMiner
// @match        https://meet.google.com/*
// @grant        none
// ==/UserScript==

var chatbox;
var yourName;

function startingStuff()
{
    var isLoaded = false;
    var checkExist = setInterval(function() {
        if (document.getElementsByClassName("z38b6 CnDs7d hPqowe").length != 0 && !isLoaded) {
            isLoaded = true;
            console.log("Exists!, calling startup");
            clearInterval(checkExist);
            // Inserts some css for spoiler tags
            var styles = `.spoiler { color: black; background-color:black; display:inline-block; transition: background-color 0.3s; } .spoiler:hover { background-color: white; } blockquote { margin: 0; padding: 15px; background: #eee; border-radius: 5px; }`;
            var styleSheet = document.createElement("style");
            styleSheet.type = "text/css";
            styleSheet.innerText = styles;
            document.head.appendChild(styleSheet)
            startup();
        }
    }, 100);
    
    var startup = function() {
        // Applies an ID to the messagebox where the messages are shown
        chatbox = document.getElementsByClassName("z38b6 CnDs7d hPqowe")[0];
        chatbox.id = "chatbox";
        // Adds a mutation event to the messagebox to check for messages
        mutationObserver.observe(chatbox, {
            // Looks for new messages
            childList: true,
            // Looks for edits to existing messages (i.e a new message right after an old one)
            subtree: true
        });
        yourName = document.getElementsByClassName("ZjFb7c")[0].innerText;
        console.log("Loaded!");
        // If there are already messages, then loop through them and apply formatting
        if (document.getElementsByClassName("oIy2qc")[0])
        {
            for (let i = 0; i < document.getElementsByClassName("oIy2qc").length; i++) {
                oldMessageId = 0;
                onMessageEvent(document.getElementsByClassName("oIy2qc")[i]);
            }
        }
        // Go in a .5 sec loop to check if the chat window still exists
        var stillExists = setInterval(function () {
            if (!document.getElementsByClassName('z38b6 CnDs7d hPqowe').length) {
              clearInterval(stillExists);
              console.log("Lost connection!");
              startingStuff();
            }
        }, 500);
    };

}

var mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        onMessageEvent();
    });
});


var oldMessageId;
function onMessageEvent(messageElement = null)
{
    if (document.getElementsByClassName("gYckH").length != 0 || oldMessageId === document.getElementsByClassName("oIy2qc").length - 1)
    {
        return;
    }
    if (messageElement === null)
        messageElement = document.getElementsByClassName("oIy2qc")[document.getElementsByClassName("oIy2qc").length - 1];
    var message = messageElement.innerHTML;
    var author = document.getElementsByClassName("YTbUzc")[document.getElementsByClassName("YTbUzc").length - 1].textContent;
    oldMessageId = document.getElementsByClassName("oIy2qc").length - 1;
        
    console.log(author + ": " + message + " - " + oldMessageId);
    

    // Check if message include @
    if (message.match(/@([^\s]+)/))
    {
        var pmName = message.match(/@([^\s]+)/)[1];
        pmName = pmName.replace(/\@(.+?)/g, "");
        // Check if your name includes what they selected
        if (yourName.includes(pmName))
        {
            messageElement.innerHTML = "<mark>" + message + "</mark>";
        }
        else if (author !== "You")
        {
            console.log(yourName + " - " + pmName);
            messageElement.innerHTML = "<sub><i>Private message sent</i></sub>";
        }
    }



    if(new RegExp(/https?:\/\/(www.)?./).test(message)) {
        return;
    }


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

}

startingStuff();
