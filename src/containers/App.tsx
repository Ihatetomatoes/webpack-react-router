import * as React from 'react';

interface AppProps {
    name: string
}

const App = (props:AppProps) => {
    const {name} = props;
    return <p>App is working {name}!</p>
}

export default App;