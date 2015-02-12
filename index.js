#!/usr/bin/env node

function runner(file, patterns) {
	'use strict';

	var spawn = require('child_process').fork;
	var gaze = require('gaze');
	var proc;

	var ignoreForFasterWatch = '!**/node_modules/**';
	var matchPatterns = (patterns || []).length ? patterns : ['*.js'];
	var matches = [ignoreForFasterWatch].concat(matchPatterns);

	function spawnProc() {
		if (proc) {
			proc.kill('SIGHUP');
		}
		proc = spawn(file || 'test.js');
	}

	spawnProc();

	gaze(matches, function () {
		this.on('all', function (type, file) {
			spawnProc();
		});
	});
}

module.exports = runner;

if (process.argv.length > 2 && process.argv[1].indexOf('guardian-runner') > -1) {
	if (process.argv.indexOf('start') > -1) {
		runner(process.argv[3], process.argv.splice(4));
	} else {
		console.log('\nUsage:    node_modules/guardian-runner start [file] [pattern]...');
		console.log('Default:  file: test.js, pattern: [\'*.js\']\n');
		process.exit();
	}
}