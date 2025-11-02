// React.createElement("tag-name", attribute of tag like {id: 'heading'}, "content for the tag");
const heading = React.createElement("h1", { id: 'heading', xyz: 1 }, "Hello World from React!");
// Now react DOM will take this heading and place it in the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(heading);



const parent = React.createElement('div', { id: 'parent' },
    [
        React.createElement('div', { id: 'child' },
            [
                React.createElement('h1', {}, 'I am h1 tag div'),
                React.createElement('h2', {}, 'I am h2 tag div')
            ]
        ),
        React.createElement('div', { id: 'child2' },
            [
                React.createElement('h1', {}, 'I am h1 tag div'),
                React.createElement('h2', {}, 'I am h2 tag div')
            ]
        )
    ]
);
root.render(parent);