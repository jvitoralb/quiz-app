import React from 'react';
import Quiz from './components/Quiz';
import Header from './components/Header';
import StartGame from './components/StartGame';
import './components/Styling/index.css';


const App = () => {
    const initialAppConfig = {
        status: false,
        category: 'any',
        difficulty: 'any'
    }
    const [appConfig, setAppConfig] = React.useState(initialAppConfig);

    const start = () => setAppConfig(prevConfig => ({
            ...prevConfig,
            status: !prevConfig.status
        })
    );

    const selectCategory = (e) => setAppConfig(prevConfig => ({
            ...prevConfig,
            category: e.target.value
        })
    );

    const selectDifficulty = (e) => setAppConfig(prevConfig => ({
            ...prevConfig,
            difficulty: e.target.value
        })
    );

    const settingCall = () => {
        const { category, difficulty } = appConfig;
        let categoryLevel = '';

        if (category !== 'any') {
            categoryLevel = `&category=${category}`;
        }
        if (difficulty !== 'any') {
            categoryLevel = `${categoryLevel}&difficulty=${difficulty}`;
        }

        return categoryLevel;
    }

    return (
        <React.Fragment>
            <Header />
            <main id='main' className='page-main'>
                <div className='home'>
                    <StartGame
                        init={start}
                        mainState={appConfig}
                        utility={{selectCategory, selectDifficulty}}
                    />
                    <Quiz
                        status={appConfig.status}
                        settings={settingCall()}
                        restart={start}
                    />
                </div>
            </main>
        </React.Fragment>
    );
};

export default App;