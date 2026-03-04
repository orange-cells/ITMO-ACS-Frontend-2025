const apiLink = "http://localhost:3000";

const api = {
    getRecipes: () => fetch(`${apiLink}/recipes`).then(res => res.json()),
    
    updateUser: async (id, data) => {
        const res = await fetch(`${apiLink}/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await res.json();
    }
};
