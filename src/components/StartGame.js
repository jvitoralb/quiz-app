import './Styling/index.css';


const StartGame = ({ mainState, utility, init }) => {
    const { category, difficulty, status } = mainState;
    const { selectCategory, selectDifficulty } = utility;

    const selectChanges = (e) => {
        const { id } = e.target;
        return id === 'select-category' ? selectCategory(e) : selectDifficulty(e);
    }

    return (
        !status && <section id='welcome-section' className='home-sec'>
            <p>Let's Play a really cool Trivia Quiz?!</p>
            <p>But first...</p>
            <form id='category-difficulty-form' className='quiz-form'>
                <label>Pick a Category</label>
                <select id='select-category' value={category.selected} onChange={selectChanges}>
                    <option id={'default'} value={'any'}>Any Category</option>
                    {
                        category.trivia.map((item, idx) => (
                            <option key={item.id + idx} id={item.name} value={item.id}>
                                {item.name.replace('Entertainment: ', '')}
                            </option>
                        ))
                    }
                </select>
                <label>Difficulty</label>
                <select id='select-difficulty' value={difficulty.selected} onChange={selectChanges}>
                    {
                        difficulty.all.map((item, idx) => (
                            <option key={idx + item} id={`level-${idx}`} value={item}>
                                {item.slice(0, 1).toUpperCase() + item.slice(1)}
                            </option>
                        ))
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