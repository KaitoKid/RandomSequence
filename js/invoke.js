var sectionIDs = ['practice', 'baseline', 'training', 'posttest', 'download'];
var sections = [practice, baseline, training, posttest, downloadJson];
var taskNum = 0;
var bio;
var inputFlag = 1;

function submitMobaForm() {
    $('#btnSubmitMoba').css('display', 'none')
    $('#btnSubmit').css('display', 'block')
    $('#bioForm').css('display', 'block')
    $('#mobaForm').css('display', 'none')
    if ($('#moba').val() == 'League') {
        $('#mmrDesc').text('League MMR (use op.gg to estimate):')
    } else {
        $('#mmrDesc').text('Dota 2 MMR (exact value from profile):')
    }
}

function submitForm() {
    var email = $('#email').val();
    var age = $('#age').val();
    var gender = $('#gender').val();
    var rank = $('#mmr').val();
    var exp = $('#exp').val();
    var game = $('#moba').val();
    var data = {
        'game': game,
        'email': email,
        'age': age,
        'gender': gender,
        'rank': rank,
        'exp': exp,
    }
    bio = data;
    addToResponseData((new Date()).getTime().toString(), 'bio', data);
    $('#btnSubmit').css('display', 'none');
    $('#bioForm').css('display', 'none');
    $('#btnpractice').css('display', 'block');
}

function practice() {
    $("#status").css('display', 'block');
    var combosToDo = ['3', '4', '2', '1'];
    $('#btnpractice').css('display', 'none');
    initialize('practice', combosToDo);
    taskNum++;
}

function baseline() {
    var combosToDo = ['2', '4', '3', '1'];
    $('#btnbaseline').css('display', 'none');
    initialize('baseline', combosToDo);
    taskNum++;
}

function training() {
    var combosToDo = ['4', '2', '3', '1'];
    $('#btntraining').css('display', 'none');
    initialize('training', combosToDo);
    taskNum++;
}

function posttest() {
    var combosToDo = ['1', '2', '3', '4'];
    $('#btnposttest').css('display', 'none');
    initialize('posttest', combosToDo);
    taskNum++;
}

function downloadJson() {
    $('#doneInstructions').css('display', 'block');
}

function Circle(color, letter, url) {
    this.color = color;
    this.letter = letter;
}

function updateCircles() {
    _.each(queue, function(circle, i) {
        $('#' + queueIds[i]).css('background-image', circle.color);
        $('#' + queueIds[i]).text(circle.letter);
    })
}

var queueIds = ['circleOne', 'circleTwo', 'circleThree', 'circleFour', 'circleFive'];
var queueKeys = ['a', 's', 'd', 'f', 'e'];

function initialize(mode, combosToDo) {
    //queue = _.map(queueKeys, function(key) {return new Circle('#FFFFFF', '')});
    queue = _.map(queueKeys, function(key) {return new Circle('https://upload.wikimedia.org/wikipedia/commons/d/d2/Solid_white.png', '')});
    updateCircles();
    $(document).unbind('keydown')
    $(document).unbind('keyup')
    $(document).on('keydown', function(event){
		var keyCode = (event.keyCode ? event.keyCode : event.which);
        execute(keyCode);
    });
    $(document).on('keyup', function(event){
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        addToResponseData((new Date).getTime().toString(), 'key up', {})
    })
    var data = {
        'task mode': mode,
        'combos': combosToDo,
    }
    addToResponseData((new Date).getTime().toString(), 'initialize', data);
    comboList = combosToDo.slice(0);
	comboNumber = comboList.shift();
	console.log("Your first combo is");
	console.log(combos[comboNumber].sequence);
	indicateNextCombo(combos[comboNumber].sequence.toUpperCase());
	console.log("Game begun");
}

function configureFingers(name, key) {
    var response = prompt("Please enter what key you want for " + name, String.fromCharCode(key))
    var value = defaultFingerMapping[key]
    delete defaultFingerMapping[key]
    defaultFingerMapping[response.charCodeAt(0) - (!$.isNumeric(response) * 32)] = value;
}

//var defaultFingerMapping = {68: 5, 49: 9, 81: 1, 87: 2, 69: 3, 82: 4}
var defaultFingerMapping = {65: 'a', 83: 's', 68: 'd', 70: 'f'}
var colorMapping = {'a': 'url("http://i.imgur.com/sBVGPUd.png")', 's': 'url("http://i.imgur.com/Nv0EOah.png")', 'd': 'url("http://i.imgur.com/IbJmDwU.png")', 'f': 'url("http://i.imgur.com/34sLQJ5.png")'}
// Your color history
var queue;
// need function to assign new finger mappings

var combos = [
	{
	"name": "",
    "sequence": "asdfa",
	"image": 'url("http://i.imgur.com/JTlUPwY.png")',
	},
	{
	"name": "",
    "sequence": "fdsaa",
	"image": 'url("http://i.imgur.com/oQS5lTU.png")',
	},
	{
	"name": "",
    "sequence": "dassa",
	"image": 'url("http://i.imgur.com/e2L27wh.png")',
	},
	{
	"name": "",
    "sequence": "safda",
	"image": 'url("http://i.imgur.com/e2L27wh.png")',
	},
	{
	"name": "",
    "sequence": "fasff",
	"image": 'url("http://i.imgur.com/e2L27wh.png")',
	},
];

// This is the list of 10 combo integers that we will use for the challenge
var comboList = new Array();

var comboNumber;
var responseData = {};

function addToResponseData(timestamp, state, data) {
    responseData[timestamp] = {
        'state': state,
        'data': data,
    }
}

// Number of presses
var presses = 0;


function addToQueue(color, letter){
	queue.shift();
	queue.push(new Circle(color, letter));
    updateCircles();
}


// Array shuffler
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}


function execute(keyCode){
    var timestamp = (new Date).getTime().toString();
    var targetQueue = combos[comboNumber].sequence;
    var successState = 'unmatched';
    if (keyCode in defaultFingerMapping && inputFlag == 1) {
        addToQueue(colorMapping[defaultFingerMapping[keyCode]], defaultFingerMapping[keyCode])
        var currentQueue = _.map(queue, function(q) {return q.letter}).join('');
        console.log(targetQueue);
        console.log(currentQueue);
        if (targetQueue == currentQueue) {
            successState = 'matched';
			flashStatus();
            inputFlag = 0;
            if (comboList.length > 0) {
                setTimeout(function() {
                    comboNumber = comboList.shift();
                    console.log("Your next combo is");
                    console.log(combos[comboNumber].sequence);
                    indicateNextCombo(combos[comboNumber].sequence.toUpperCase());
                    queue = _.map(queueKeys, function(key) {return new Circle('', '')});
                    updateCircles();
                    inputFlag = 1;
                }, 1000)
            } else {
                inputFlag = 1;
                endGame(taskNum);
            }
        }
		else {
			resetStatus();
		}
    }
    var data = {
        'key event': keyCode,
        'target queue': targetQueue,
        'current queue': currentQueue,
        'success state': successState,
    };
    addToResponseData(timestamp, 'key down', data);
}

function endGame(nextTask){
    $(document).unbind('keydown')
    $(document).unbind('keyup')
    queue = _.map(queueKeys, function(key) {return new Circle('', '')});
    updateCircles();
    $('#nextComboName').text('');
    $('#nextCombo').text('');
    $('#btn' + sectionIDs[taskNum]).css('display', 'block')
    if (taskNum == sectionIDs.length - 1) {
        $('#btndownload').html('<a href="data:' + encodeURI("text/json;charset=utf-8," + JSON.stringify(responseData)) + '" download="' + bio['email'].replace('@', '_').replace('.', '_') + '.json">Download Json</a>');
        $('#doneInstructions').css('display', 'block');
    }
}

function showHideMenuClick(){
	if ($('#cheatsheet').css('display') == 'block') {
        $('#cheatsheet').css('display', 'none');
        $('#btnShowHide').text('Show Cheat Sheet');
    }
    else {
        $('#cheatsheet').css('display', 'block');
        $('#btnShowHide').text('Hide Cheat Sheet');
    }
}

function showHideMenuClick1(){
	if ($('#thisInfo').css('display') == 'block') {
        $('#thisInfo').css('display', 'none');
        $('#btnShowHide1').text('Show FAQ');
    }
    else {
        $('#thisInfo').css('display', 'block');
        $('#btnShowHide1').text('Hide FAQ');
    }
}

function flashStatus(){
	$("#status").fadeOut(0, function() {
		$(this).css('color', '#00CC66');
		$(this).text("Status: Correct").fadeIn(0);
	});
}

function resetStatus(){
	$("#status").css('color', '#FF0000');
	$("#status").text("Status: Incorrect");
}

function indicateNextCombo(s){
	var a = s.split('').join(' ');
	$("#nextCombo").fadeOut(0, function() {
		$(this).text(a).fadeIn(0);
	});
	
	$("#nextComboName").fadeOut(0, function() {
		$(this).text(combos[comboNumber].name.toUpperCase()).fadeIn(0);
	});	
}
