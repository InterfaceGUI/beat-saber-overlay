# Beat Saber Overlay for [BeatSaberPlus (BS+)](https://github.com/hardcpp/BeatSaberPlus)

A web-based overlay for Beat Saber

Because the original repository has been archived.

So I modified the code and used the Song Overlay function of [BeatSaberPlus (BS+)](https://github.com/hardcpp/BeatSaberPlus).


![preview](https://i.imgur.com/pXK8ZjB.png)


## Installation (OBS)

1. Download and install the [BeatSaberPlus (BS+) plugin](https://github.com/hardcpp/BeatSaberPlus)  (DownloadLink in BeatSaberPlus Discord).
2. Create a Browser source

![image](https://i.imgur.com/WyTjdtd.png)

3. Set the URL as `https://interfacegui.github.io/beat-saber-overlay/` and the size equal to your canvas size (1280x720, etc.)

![image](https://i.imgur.com/xxWXGrT.png)

4. (Optional) For 1080p canvases, add the `scale` modifier (ex. `https://interfacegui.github.io/beat-saber-overlay/?modifiers=scale`) to scale the overlay by 1.5x

## Options

Options are added to the URL query as such:

```
https://interfacegui.github.io/beat-saber-overlay/?modifiers=top
```

### `ip` and `port`

Listen to events from another IP and/or port.

### `modifiers`

Multiple modifiers can be seperated with commas.

- `top`
	* Moves the overlay to the top and reverses the layout vertically
- `rtl`
	* Moves the overlay to the right and uses right-to-left text
- `scale`
	* Scales the overlay by 1.5x, for use on 1080p canvases
- `test`
	* Makes the background black, for testing purposes
