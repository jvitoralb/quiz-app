import React from 'react';
import './Styling/index.css';


const StartGame = ({ mainState, utility, init }) => {
    const { category, difficulty, status } = mainState;
    const { selectCategory, selectDifficulty } = utility;

    const initialOpts = {
        categories: [],
        difficulties: [
            'any', 'easy',
            'medium', 'hard'
        ]
    }
    const [ renderOpts, setRenderOpts ] = React.useState(initialOpts);

    React.useEffect(() => {
        const saveToState = (data) => setRenderOpts(prev => ({
                ...prev,
                categories: [
                    ...data.trivia_categories
                ]
            })
        );

        const getAPISettings = async () => {
            // Need to request a Session KEY
            try {
                const categoryRes = await fetch('https://opentdb.com/api_category.php');
                const response = await categoryRes.json();
                return saveToState(response);
            } catch(err) {
                console.error(err)
            }
        }

        getAPISettings()
    }, []);

    const selectChanges = (e) => {
        const { id } = e.target;
        return id === 'select-category' ? selectCategory(e) : selectDifficulty(e);
    }

    const categoriesDrop = renderOpts.categories.map((item, idx) => (
        <option key={item.id + idx} id={item.name} value={item.id}>
            {item.name.replace('Entertainment: ', '')}
        </option>
    ));

    const difficultiesDrop = renderOpts.difficulties.map((item, idx) => (
        <option key={idx + item} id={`level-${idx}`} value={item}>
            {item.slice(0, 1).toUpperCase() + item.slice(1)}
        </option>
    ));

    return (
        !status && <section id='welcome-section' className='home-sec'>
            <p>Let's Play a really cool Trivia Quiz?!</p>
            <p>But first...</p>
            <form id='category-difficulty-form' className='quiz-form'>
                <label>Pick a Category</label>
                <select id='select-category' value={category} onChange={selectChanges}>
                    <option id={'default'} value={'any'}>Any Category</option>
                    {
                        categoriesDrop
                    }
                </select>
                <label>Difficulty</label>
                <select id='select-difficulty' value={difficulty} onChange={selectChanges}>
                    {
                        difficultiesDrop
                    }
                </select>
            </form>
            <button
                className='start-btn'
                onClick={init}
            >
                Start Playing
            </button>
        </section>
    );
}

export default StartGame;