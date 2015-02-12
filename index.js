#!/usr/bin/env node

function runner(file, patterns) {
	'use strict';

	var spawn = require('child_process').fork;
	var gaze = require('gaze');
	var proc;

	var ignoreForFasterWatch = '!**/node_modules/**';
	var matches = [ignoreForFasterWatch].concat(patterns.length ? patterns : ['*.js']);

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

if (process.argv.length) {
	if (process.argv.indexOf('start') > -1) {
		runner(process.argv[3], process.argv.splice(4));
	} else {
		console.log('Usage:  node_modules/guardian-runner start [file] [pattern]...');
		console.log('Default:  node_modules/guardian-runner start test.js \'.*js\'');
		process.exit();
	}
}

module.exports = runner;