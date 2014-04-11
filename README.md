# Delaunay Triangulation pattern maker

This project allows you to create beautiful high quality images featuring a nice pattern created from Delaunay triangulation and applying a flat surface shader. These images could be used for:

- Wallpapers
- Blog post headers
- Magazines
- Posters
- And more

The tool provides export to PNG and SVG formats. With SVG format you could create an image of virtually any size, even a billboard.

## Show me some results!

You can see some examples of the patterns made with this tool here:
![0](https://raw.github.com/msurguy/triangles/master/examples/0.jpg)
![1](https://raw.github.com/msurguy/triangles/master/examples/1.jpg)
![2](https://raw.github.com/msurguy/triangles/master/examples/2.jpg)
![3](https://raw.github.com/msurguy/triangles/master/examples/3.jpg)
![4](https://raw.github.com/msurguy/triangles/master/examples/4.jpg)
![5](https://raw.github.com/msurguy/triangles/master/examples/5.jpg)
![6](https://raw.github.com/msurguy/triangles/master/examples/6.jpg)
![7](https://raw.github.com/msurguy/triangles/master/examples/7.jpg)

## Running

Download this repository and run index.html in your browser or open [this link](http://msurguy.github.com/triangles/).

## Building

Install Dependancies:

    npm install uglify-js@2.2.5

Build:

    node build.js

## Inspiration

The iOS game called "[Monument Valley][monument]" by [ustwo][ustwo] served as an inspiration for this project. Specifically the simulation of the ocean in the game.

## Acknowledgments

The shader work was done by Matthew Wagerfield on his MIT-licensed [repository][repository].

## Author

Maksim Surguy [@msurguy][msurguy]

## License

Licensed under [MIT][mit]. Enjoy.

[repository]: https://github.com/wagerfield/flat-surface-shader
[msurguy]: http://twitter.com/msurguy
[mit]: http://www.opensource.org/licenses/mit-license.php
[monument]: http://www.monumentvalleygame.com/
[ustwo]: http://ustwo.com/
