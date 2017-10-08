# Delaunay Triangulation pattern maker

This project allows you to create beautiful high quality images featuring a nice pattern created from Delaunay triangulation and applying a flat surface shader. These images could be used for:

- Wallpapers
- Blog post headers
- Magazines
- Posters
- And more

The tool provides export to PNG and SVG formats. With SVG format you could create an image of virtually any size, even as big as a billboard. Go crazy with it!

## Show me some results!

Here are a few of most obvious uses for the tool:

![three devices](https://raw.github.com/msurguy/triangles/master/examples/three-devices.png)
![two devices](https://raw.github.com/msurguy/triangles/master/examples/two-devices.png)
![billboard](https://raw.github.com/msurguy/triangles/master/examples/billboard.png)

And I made a video on Youtube of the tool in action, creating 11 wallpapers in under 7 minutes:
[![Video demo of the tool](http://img.youtube.com/vi/JbD-HsmBt_0/0.jpg)](http://www.youtube.com/watch?v=JbD-HsmBt_0)

You can also see some examples of the patterns made with this tool in this repository in the examples folder (the first one had text overlay added in Photoshop):

![0](https://raw.github.com/msurguy/triangles/master/examples/0.jpg)
![1](https://raw.github.com/msurguy/triangles/master/examples/1.jpg)
![2](https://raw.github.com/msurguy/triangles/master/examples/2.jpg)
![3](https://raw.github.com/msurguy/triangles/master/examples/3.jpg)
![4](https://raw.github.com/msurguy/triangles/master/examples/4.jpg)
![5](https://raw.github.com/msurguy/triangles/master/examples/5.jpg)
![6](https://raw.github.com/msurguy/triangles/master/examples/6.jpg)
![7](https://raw.github.com/msurguy/triangles/master/examples/7.jpg)

## Using

- To add a new light press Enter key on your keyboard or increase count manually via the slider.
- To "drop" or "pick up" the currently selected light, press Space bar.
- To change colors of the lights, change the ambient and diffuse color controls.
- To export as SVG select SVG in the "renderer" panel and then export the image via "Export big" button. Then navigate to "File -> Save as" in the browser's menu to save the resulting image to your computer.

## Running

Download this repository and run index.html in your browser or open [this link](http://msurguy.github.com/triangles/).

## Building

Install Dependencies:

    npm install uglify-js@2.2.5

Build (cd into 'build' folder first):

    node build.js

## Inspiration

The iOS game called "[Monument Valley][monument]" by [ustwo][ustwo] served as an inspiration for this project. Specifically the simulation of the ocean in the game.

## Acknowledgments

The shader work was done by Matthew Wagerfield on his MIT-licensed [repository][repository].

## Author

Maksim Surguy [@msurguy][msurguy]

## TODO

There are a few things that can be improved to make this tool even better.

- ~~Add varying depth of the vertices of the triangles~~ (Done as of 4/15/2014)
- ~~Add more color variation and presets~~ (Done as of 4/25/2014 with the randomizer functionality)
- Add text overlay and customizer for text

If you can do any of these things - feel free to make a pull request!

## License

Licensed under [MIT][mit]. Enjoy.

[repository]: https://github.com/wagerfield/flat-surface-shader
[msurguy]: http://twitter.com/msurguy
[mit]: http://www.opensource.org/licenses/mit-license.php
[monument]: http://www.monumentvalleygame.com/
[ustwo]: http://ustwo.com/
