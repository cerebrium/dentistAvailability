const dentist_a = [{start: 60, end: 300}, {start: 360, end: 1320}];
const dentist_b = [{start: 0, end: 180}, {start: 240, end: 1320}]

type Availability_Map = {
    [key: string]: Availability_Child;
}

type Availability_Child = {
    booked: Set<number>,
    edges: Array<Node>
}


class Node {
    start: number;
    children: Array<Node>;
    no_of_vertices: number = 0;

    constructor(start: number, children: Array<Node> = []) {
        this.start = start;
        this.children = children;
    }
}

class Graph {
    public nodes: Array<Node> = [];
    public time_frames: Array<Array<{start: number, end: number}>>
    public availability_map: Availability_Map = {}

    constructor(time_frames: Array<Array<{start: number, end: number}>>) {
        this.time_frames = time_frames;
    }

    // Break the time frames into increments of 60 minute slots
    public create_availability_map() {
        this.time_frames.forEach((dentist, idx) => {
            this.availability_map[idx] = {
                booked: new Set(),
                edges: []
            }
            dentist.forEach(time => {
                for (let i = time.start; i < time.end; i += 60) {

                    this.availability_map[idx].booked.add(i);
                }
            })
        })
    }

    // Create the graph
    public create_graph() {
        const all_slots = [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1440];

        // Create all nodes
        this.nodes = all_slots.map(slot => {
            return new Node(slot);
        })

        // Create edges
        for( let dentist in this.availability_map) {
            const dentist_slots = this.availability_map[dentist];
            for(let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                if(dentist_slots.booked.has(node.start)) {
                    // For quick checking of if a node is available
                    dentist_slots.edges.push(node);

                    // For checking if time slot is booked
                    node.no_of_vertices++;
                }
            }
        }
    }

    public find_both_available() {
        const available_slots = [];
        for(let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            if(node.no_of_vertices === 0) {
                available_slots.push(node.start);
            }
        }
        return available_slots;
    }

}

export function parse() {
    const graph = new Graph([dentist_a, dentist_b]);
    graph.create_availability_map();
    graph.create_graph();
    return graph;
}