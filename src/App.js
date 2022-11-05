import React from 'react';
import Quiz from './components/Quiz';
import Header from './components/Header';
import './components/Styling/index.css';


const App = () => {
    const initialState = {
        status: false,
        category: {
            trivia: [],
            selected: 'any'
        },
        difficulty: {
            all: ['any', 'easy', 'medium', 'hard'],
            selected: 'any'
        }
    }
    const [mainConfig, setMainConfig] = React.useState(initialState);

    const start = () => setMainConfig(prevConfig => ({
            ...prevConfig,
            status: !prevConfig.status
        })
    );

    React.useEffect(() => {
        const saveToGame = (data) => setMainConfig(prevConfig => ({
                ...prevConfig,
                category: {
                    ...prevConfig.category,
                    trivia: [...data.trivia_categories]
                }
            })
        );

        const getAPISettings = async () => {
            // Need to request a Session KEY yet
            try {
                const categoryRes = await fetch('https://opentdb.com/api_category.php');
                const responseData = await categoryRes.json();
                return saveToGame(responseData);
            } catch(err) {
                console.error(err)
            }
        }

        getAPISettings()
    }, []);

    const selectCategory = (e) => setMainConfig(prevConfig => ({
            ...prevConfig,
            category: {
                ...prevConfig.category,
                selected: e.target.value
            }
        })
    );

    const selectDifficulty = (e) => setMainConfig(prevConfig => ({
            ...prevConfig,
            difficulty: {
                ...prevConfig.difficulty,
                selected: e.target.value
            }
        })
    );

    const settingCall = () => {
        const { category, difficulty } = mainConfig;
        let categoryLevel = '';

        if (category.selected !== 'any') {
            categoryLevel = `&category=${category.selected}`;
        }
        if (difficulty.selected !== 'any') {
            categoryLevel = `${categoryLevel}&difficulty=${difficulty.selected}`;
        }

        return categoryLevel;
    }

    const HomePage = (
        <section id='welcome-section' className='home-sec'>
            <p>Let's Play a really cool Trivia Quiz?!</p>
            <p>But first...</p>
            <form id='category-difficulty-form' className='quiz-form'>
                <label>Pick a Category</label>
                <select value={mainConfig.category.selected} onChange={selectCategory}>
                    <option id={'default'} value={'any'}>Any Category</option>
                    {
                        mainConfig.category.trivia.map((item, idx) => (
                            <option key={item.id + idx} id={item.name} value={item.id}>
                                {item.name.replace('Entertainment: ', '')}
                            </option>
                        ))
                    }
                </select>
                <label>Difficulty</label>
                <select value={mainConfig.difficulty.selected} onChange={selectDifficulty}>
                    {
                        mainConfig.difficulty.all.map((item, idx) => (
                            <option key={idx + item} id={`level-${idx}`} value={item}>
                                {item.slice(0, 1).toUpperCase() + item.slice(1)}
                            </option>
                        ))
                    }
                </select>
            </form>
            <button
                className='start-btn'
                onClick={start}
            >
                Start Playing
            </button>
        </section>
    );

    return (
        <React.Fragment>
            <Header />
            <main id='main' className='page-main'>
                <div className='home'>
                    {!mainConfig.status && HomePage}
                    <Quiz
                        status={mainConfig.status}
                        settings={settingCall()}
                        restart={start}
                    />
                </div>
            </main>
        </React.Fragment>
    );
};

export default App;