import React, { useState } from 'react';
import RankOrderSorter from './RankOrder.jsx';
import QuizResultsForm from './QuizResultsForm.jsx';

const QuizWrapper = ({ itemsToSort, questionToAsk, completionText }) => {
    const [rankedGoals, setRankedGoals] = useState(null);

    const handleQuizComplete = (results) => {
        setRankedGoals(results);
    };

    return (
        <>
            {!rankedGoals ? (
                <RankOrderSorter client:load
                    itemsToSort={itemsToSort}
                    questionToAsk={questionToAsk}
                    completionText={completionText}
                    onQuizComplete={handleQuizComplete}
                />
            ) : (
                <QuizResultsForm client:load rankedList={rankedGoals} />
            )}
        </>
    );
};

export default QuizWrapper;