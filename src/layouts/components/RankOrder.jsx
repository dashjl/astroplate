import React, { useState, useEffect, useCallback } from 'react';

/**
 * ValueSorter component for ranking a list of items with optional descriptions.
 *
 * @param {object} props - The component props.
 * @param {Array<Object>} props.itemsToSort - An array of objects, where each object has a `name` (string) and an optional `description` (string).
 * @param {string} props.questionToAsk - The question to display during the comparison phase.
 * @param {string} props.completionText - The text to display when the sorting is complete.
 * @param {string} [props.icon] - An optional emoji or icon string to display with each ranked item.
 */
const RankOrderSorter = ({ itemsToSort, questionToAsk, completionText, icon, onQuizComplete }) => {
    const initialItems = itemsToSort || [];
    const [itemsToSortState, setItemsToSortState] = useState([...initialItems]);
    const [rankedList, setRankedList] = useState([]);
    const [challenger, setChallenger] = useState(null);
    const [opponent, setOpponent] = useState(null);
    const [isSortingComplete, setIsSortingComplete] = useState(false);
    const [totalItems, setTotalItems] = useState(initialItems.length);

    // State for binary search
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(0);

    // Progress bar states
    const [comparisonsMade, setComparisonsMade] = useState(0);
    const [maxComparisons, setMaxComparisons] = useState(0);



    const startNextComparison = useCallback(() => {
        if (itemsToSortState.length === 0 && challenger === null && !isSortingComplete) {
            setIsSortingComplete(true);
            if (onQuizComplete) {
                onQuizComplete(rankedList);
            }
            return;
        }

        if (challenger === null) {
            if (itemsToSortState.length > 0) {
                const newChallenger = itemsToSortState[0];
                setChallenger(newChallenger);
                setItemsToSortState(prev => prev.slice(1));
                setLow(0);
                setHigh(rankedList.length - 1);
            } else {
                setIsSortingComplete(true);
                if (onQuizComplete) {
                    onQuizComplete(rankedList);
                }
                return;
            }
        }

        if (rankedList.length === 0 && challenger !== null) {
            setRankedList([challenger]);
            setChallenger(null);
            return;
        }

        // Binary search comparison logic
        if (challenger !== null && low <= high) {
            const mid = Math.floor((low + high) / 2);
            setOpponent(rankedList[mid]);
        } else if (challenger !== null && low > high) {
            // Challenger has found its place
            const newRankedList = [...rankedList];
            newRankedList.splice(low, 0, challenger); // Insert at 'low'
            setRankedList(newRankedList);
            setChallenger(null);
            setOpponent(null); // Clear opponent after insertion
        }
    }, [itemsToSortState, rankedList, challenger, isSortingComplete, low, high, onQuizComplete]);

    useEffect(() => {
        startNextComparison();
    }, [startNextComparison]);

    useEffect(() => {
        // Calculate maximum comparisons for a more accurate progress bar
        // This is a rough estimate, as binary insertion sort isn't a fixed number of comparisons
        // For N items, it's roughly N * log2(N) comparisons in the worst case.
        // A simpler approach for a visual bar is to track items processed.
        if (initialItems.length > 0) {
            let estimatedMaxComparisons = 0;
            for (let i = 1; i <= initialItems.length; i++) {
                estimatedMaxComparisons += Math.ceil(Math.log2(i));
            }
            setMaxComparisons(estimatedMaxComparisons);
        }
    }, [initialItems.length]);

    const selectItem = (selected) => {
        if (challenger === null) return;

        // Increment comparisons on each choice
        setComparisonsMade(prev => prev + 1);

        const mid = Math.floor((low + high) / 2); // Recalculate mid for the current comparison

        if (selected === 0) { // Challenger was selected (challenger is more important)
            setHigh(mid - 1); // Search in the left half
        } else { // Opponent was selected (opponent is more important)
            setLow(mid + 1); // Search in the right half
        }
    };

    const progress = maxComparisons > 0 ? (comparisonsMade / maxComparisons) * 100 : 0;

    if (isSortingComplete) {
        return null; // Render nothing, as the parent component will handle the display
    }

    //Next comparison Round
    return (
        <div className="mt-5 p-5 border border-gray-200 rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">{questionToAsk || "Which is more important to you?"}</h2>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="flex gap-5 mt-5 justify-center">
                <button
                    onClick={() => selectItem(0)}
                    className="px-6 py-3 text-lg cursor-pointer bg-blue-600 text-white border-none rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                    {challenger?.name || "Loading..."}
                    {challenger?.description && <span className="text-gray-300 text-sm block">{challenger.description}</span>}
                </button>
                <button
                    onClick={() => selectItem(1)}
                    className="px-6 py-3 text-lg cursor-pointer bg-blue-600 text-white border-none rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                    {opponent?.name || "Loading..."}
                    {opponent?.description && <span className="text-gray-300 text-sm block">{opponent.description}</span>}
                </button>
            </div>
        </div>
    );
};

export default RankOrderSorter;
