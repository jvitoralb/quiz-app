import React from 'react';
import Quiz from './components/Quiz';
import Header from './components/Header';
import './components/Styling/index.css';


const App = () => {
    const [mainConfig, setMainConfig] = React.useState({
        status: false,
        category: {
            trivia: [],
            selected: 'any'
        },
        difficulty: {
            all: ['any', 'easy', 'medium', 'hard'],
            selected: 'any'
        }
    });

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
                const categoryRes = await fetch('https://opentdb.com/api_category.php')
                const responseData = await categoryRes.json();
                return saveToGame(responseData)
            } catch(err) {
                console.log(err)
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
// console.log(mainConfig)
    const devHomePage = (
        <React.Fragment>
            <p>Let's Play a really cool Trivia Quiz</p>
            <form id='category-difficulty-form' className='quiz-form'>
                <label>
                    Pick a Category
                    <select value={mainConfig.category.selected} onChange={selectCategory}>
                        <option id={'default'} value={'any'}>Any category</option>
                        {
                            mainConfig.category.trivia.map((item, idx) => (
                                <option key={item.id + idx} id={item.name} value={item.id}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                </label>
                <label>
                    Difficulty
                    <select value={mainConfig.difficulty.selected} onChange={selectDifficulty}>
                        {
                            mainConfig.difficulty.all.map((item, idx) => (
                                <option key={idx + item} id={`level-${idx}`} value={item}>
                                    {item}
                                </option>
                            ))
                        }
                    </select>
                </label>
            </form>
            <button
                className='start-btn'
                onClick={start}
            >
                Start Playing
            </button>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Header />
            <main id='main' className='page-main'>
                <div className='home'>
                    {!mainConfig.status && devHomePage}
                    <Quiz
                        status={mainConfig.status}
                        category={mainConfig.category.selected}
                        level={mainConfig.difficulty.selected}
                        restartStatus={start}
                    />
                </div>
            </main>
        </React.Fragment>
    );
};

export default App;