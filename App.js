// React.createElement("tag-name", attribute of tag like {id: 'heading'}, "content for the tag");
const heading = React.createElement("h1", {id:'heading', xyz: 1}, "Hello World from React!");
// Now react DOM will take this heading and place it in the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(heading);