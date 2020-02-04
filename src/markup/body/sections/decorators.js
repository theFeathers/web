const { img, div } = require("mithril-toolset").elements;

const decorators = ["rect", "square", "triangle"].map(name =>
    img[`.decorator-${name}`]({
        src: `/assets/images/${name}.svg`,
        alt: name,
    }),
);

module.exports = div[".decorators"](decorators)