const MidiPlayer = require('midi-player-js');

// Initialize player and register event handler
const Player = new MidiPlayer.Player(function(event) {
	console.log(event);
});

// Load a MIDI file
Player.loadFile('./src/midi/sheiks-theme.mid');
Player.play();

