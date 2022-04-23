import React, { useContext } from 'react';
import { parse } from '../Parser/parser';

type GraphContextResult = [
    ({ value, schedules}: {value: number, schedules: Array<Array<{start: number, end: number}>>}) => void,
    (id: number) => void,
    {
        graph: any;
        stringifiedGraph: string;
    }
]

const GraphContext = React.createContext<GraphContextResult | undefined>(undefined)

const context_stash: any = {};

export const GraphProvider: React.FC<any> = ({ children }) => {
    const [graph, setGraph] = React.useState<any>()
    const [stringifiedGraph, setStringifiedGraph] = React.useState<string>('')

    const trigger = ({ value, schedules}: {value?: number, schedules?: Array<Array<{start: number, end: number}>>}): void => {
        if (value !== undefined) {
            context_stash[value] = schedules
        }

        // Create matrix
        let schedule_matrix = [];
        for (let key in context_stash) {
            schedule_matrix.push(context_stash[key])
        }

        // Create graph
        const graph = parse(schedule_matrix)

        // Distribute graph
        setGraph(graph)
        setStringifiedGraph(JSON.stringify(graph.make_data_visible(), null, 2))
    }

    const remove_dentist = (id: number) => {
        delete context_stash[id]
        trigger({})
    }

    return (
        <GraphContext.Provider value={[trigger, remove_dentist, {stringifiedGraph, graph}]}>
            {children}
        </GraphContext.Provider>
    )
}

export const useGraphProvider = () => {
    const context = useContext(GraphContext);

    if (context === undefined) {
        throw new Error('useGraphProvider must be used within a GraphProvider')
    }

    return context
}