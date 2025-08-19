
/* frontend/src/App.tsx */

/* Vanligtvis med element createElement() och appendChild() */


import React from "https://esm.sh/react@18";


function App() {
    // Något  fel  nedan
    const appContent = React.createElement('div', null,
        React.createElement('h1', null, 'Shelfwise'),
        React.createElement('p', null, 'Welcome to your inventory management app')
    );

    return appContent;

}

export default App;




