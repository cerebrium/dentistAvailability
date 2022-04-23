const dentist_a = [{start: 60, end: 300}, {start: 360, end: 1320}];
const dentist_b = [{start: 0, end: 180}, {start: 240, end: 1320}]

type Availability_Map = {
    [key: string]: Availability_Child;
}

type Availability_Child = {
    booked: Set<number>,
    edges: Array<Node>,
    available: Set<number>
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
                edges: [],
                available: new Set([0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1440])
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
                    // Creation of graph structure
                    dentist_slots.edges.push(node);

                    // Remove from available slots
                    dentist_slots.available.delete(node.start);

                    // For checking if time slot is booked
                    node.no_of_vertices++;
                }
            }
        }
    }

    // Find the nodes with 0 edges
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

    // Converts the sets into arrays so can be displayed
    public make_data_visible() {
        const availability_map_copy: any = this.availability_map

        for(let dentist in availability_map_copy) {
            availability_map_copy[dentist].booked = Array.from(availability_map_copy[dentist].booked)
            availability_map_copy[dentist].available = Array.from(availability_map_copy[dentist].available)
        }

        return availability_map_copy
    }

    // The times available for a dentist
    public find_available_slots(dentist: number) {
        return Array.from(this.availability_map[dentist].available);
    }

}

export function parse(schedules: Array<Array<{start: number, end: number}>>) {
    const graph = new Graph(schedules);
    graph.create_availability_map();
    graph.create_graph();
    return graph;
}