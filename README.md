# InvokerPractice
Invoker skill practice script

**V0.2**

Changed pretty much everything

**V0.1.1**

Made it easier to test the game in console mode

**V0.1**

Brand new rewritten Invoke script

Does not function graphically

**V0.03**

*Added:*

Initiates page/variables

Array Identical Check

Get Spell

Is Spell Correct

Invoke Spell

Get Invoked Spell

Display Next Spell/Finish

Randomizer

Begin and Loads Classic Game (2 functions)

Starts Game

*To do:*

JQuery stuff 

Broken: ~~keyboard input~~

Broken: ~~Adds spells to a queue~~ (I shouldn't use integers)

Broken: ~~Cast Spell~~

Broken: ~~Cast Spell~~

Queue

**V0.02**

Can start game

Circles now on page

Stats counter on page

**v0.01**

Initial upload of all of the files including templates

Mostly design elements

*To-do:*

Description of DoTA2 and Invoker

Queue of key presses

Item generation and insertion 

Spell generation

Spell compare and reject

Image elements

---

**JSON Format**

	document.getElementById("download").innerHTML = '<a href="data:' + encodeURI("text/json;charset=utf-8," + JSON.stringify(responseData)) + '" download="data.json">download data</a>a>';


	{
	  #### Initial configuration and data
	  'TIMESTAMP': {
		'uuid': UUID,
		'state': ,
		'data': {
		  'finger mappings': ,
		  'player level': ,
		  'task mode': ,
		}
	  },
	  ##### On key press events
	  'TIMESTAMP': {
		'uuid': UUID,
		'state': ,
		'data': {
		  'key event': ,
		  'target queue': ,
		  'current queue': ,
		  'success state': ,
		}
	  },
	  ...
	}
