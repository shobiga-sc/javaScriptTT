// store.js
export const store = {
    state: {
        marks: {
            math: 0,
            science: 0,
            english: 0,
            history: 0,
            computer: 0,
        },
        total: 0,
        average: 0,
    },
    listeners: [],
    
    subscribe(callback) {
        this.listeners.push(callback);
    },
    
    unsubscribe(callback) {
        this.listeners = this.listeners.filter(listener => listener !== callback);
    },
    
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.listeners.forEach(callback => callback());
    }
};
