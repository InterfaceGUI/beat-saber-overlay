
const events = {
	score(data) {
		ui.performance(data.scoreEvent);
	},
	mapInfo(data) {
		ui.beatmap(data.mapInfoChanged);
	},
	gameState(data){
		if (data.gameStateChanged =="Menu"){
			ui.timer.stop();
			ui.hide();
		}else if(data.gameStateChanged =="Playing"){
			ui.show();
		}
	},
	pause(data, time){
		ui.timer.pause(data.pauseTime);
	},
	resume(data,time){
		ui.timer.resume(data.resumeTime);
	}
}