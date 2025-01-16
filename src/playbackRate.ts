/**
 * @title Playback speed
 * @description Change playback speed of video elements to inputted value
 */

(() => {
	const videoElements = Array.from(document.getElementsByTagName("video"));
	if (videoElements.length === 0) return;

	const newPlaybackRateString = window.prompt("Playback rate:", "2");
	if (!newPlaybackRateString) return;

	const newPlaybackRate = Number.parseFloat(newPlaybackRateString);
	if (Number.isNaN(newPlaybackRate)) return;

	for (const e of videoElements) {
		e.playbackRate = newPlaybackRate;
	}
})();
