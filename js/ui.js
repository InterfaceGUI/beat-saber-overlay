
const ui = (() => {
	var main = document.getElementById("overlay");
	var mapLength;
	const performance = (() => {
		var rank = document.getElementById("rank");
		var percentage = document.getElementById("percentage");
		var score = document.getElementById("score");
		var combo = document.getElementById("combo");

		function format(number) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

		return (data) => {
			score.innerText = format(data.score);
			combo.innerText = data.combo;
			switch (true) {
				case (data.accuracy * 100 >= 90):
					rank.innerText = "SS";
					break;
				case (data.accuracy * 100 >= 80):
					rank.innerText = "S";
					break;
				case (data.accuracy * 100 >= 65):
					rank.innerText = "A";
					break;
				case (data.accuracy * 100 >= 35):
					rank.innerText = "B";
					break;
				case (data.accuracy * 100 >= 20):
					rank.innerText = "C";
					break;
				case (data.accuracy * 100 <= 19):
					rank.innerText = "D";
					break;
				default:
					rank.innerText = "NaN";
					break;
			}
			
			percentage.innerText = (data.accuracy * 100).toFixed(2) + "%";
		}
	})();
	
	const timer = (() => {
		const radius = 30;
		const circumference = radius * Math.PI * 2;

		var bar = document.getElementById("progress");
		var text = document.getElementById("progress-text");

		var active = false;

		var began;
		var duration;

		var display;
		var TimerInterval;
		var timeElapsed=0;
		function format(time) {
			var minutes = Math.floor(time / 60);
			var seconds = time % 60;

			if (seconds < 10) {
				seconds = "0" + seconds;
			}

			return `${minutes}:${seconds}`;
		}

		function update() {
			
			//(100 * timeElapsed) / mapLength
			var progress = Math.trunc((timeElapsed/1000));
			var percentage = Math.min(((100 * timeElapsed) / mapLength)/100, 1);

			bar.setAttribute("style", `stroke-dashoffset: ${(1 - percentage) * circumference}px`);

			// Minor optimization
			if (progress != display) {
				display = progress;
				text.innerText = format(progress);
			}
		}

		function loop() {

		}

		return {
			resume(time){
				active = true;
				timeElapsed =time;

			},
			start(time, length) {
				active = true;
				TimerInterval =  setInterval(() => {
					if (active){
						timeElapsed = timeElapsed + 100; 
						update();
					}
				}, 100);
				
			},

			pause(time) {
				active = false;

				update(time);
			},

			stop() {
				clearInterval(TimerInterval);
				began = undefined;
				duration = undefined;
			}
		}
	})();

	const beatmap = (() => {
		var cover = document.getElementById("image");

		var title = document.getElementById("title");
		var subtitle = document.getElementById("subtitle");
		var artist = document.getElementById("artist");

		var difficulty = document.getElementById("difficulty");
		var bpm = document.getElementById("bpm");
		var njs = document.getElementById("njs");
		
		function format(number) {
			if (Number.isNaN(number)) {
				return "NaN";
			}

			if (Math.floor(number) !== number) {
				return number.toFixed(2);
			} 

			return number.toString();
		}
		
		return (data, time) => {
			if (data.difficulty === "ExpertPlus") {
				data.difficulty = "Expert+";
			}

			cover.setAttribute("src", `data:image/png;base64,${data.coverRaw}`);

			title.innerText = data.name;
			subtitle.innerText = data.sub_name;
			
			if (data.mapper) {
				artist.innerText = `${data.artist} [${data.mapper}]`;
			} else {
				artist.innerText = data.artist;
			}
			
			
			
			async function dataMap(){
				response = await fetch("https://api.beatsaver.com/" + "maps/hash/" + data.level_id.substring(13), {
					method: "GET"
				});
				return await response.json()
			}
			dataMap().then(data => updateMapId(data)); ;

			difficulty.innerText = data.difficulty;
			bpm.innerText = `${format(data.BPM)} BPM`;

			function updateMapId(mapid){
				if (mapid.id) {
					njs.innerText = "!bsr " + mapid.id;
				} else {
					njs.innerText = "";
				}
			}
			
			mapLength = data.duration;
			timer.start(Date.now(), data.duration);
		}
	})();

	return {
		hide() {
			main.classList.add("hidden");
		},

		show() {
			main.classList.remove("hidden");
		},

		performance,
		timer,
		beatmap
	}
})();
