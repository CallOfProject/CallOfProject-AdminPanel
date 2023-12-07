import {configureStore, createSlice} from '@reduxjs/toolkit';

// initial states

const initialUserState = {users: []}
const initialProjectState = {projects: []}


// reducers
const closePopupMenu = createSlice({
    name: "closePopupMenu",
    initialState: {popup: false},
    reducers: {
        setClose(state, action) {
            state.popup = action.payload
        },
    }
})


const userTable = createSlice({
    name: 'userTable',
    initialState: initialUserState,
    reducers: {
        addUser(state, action) {
            state.users.push(action.payload);
        },
        removeUser(state, action) {
            const username = action.payload;
            state.users = state.users.filter(usr => usr.username !== username);
        },
        updateUser(state, action) {
            const updatedUser = action.payload;
            const index = state.users.findIndex(usr => usr.username === updatedUser.username);

            if (index !== -1)
                state.users[index] = updatedUser;
        },
        load(state, action) {
            state.users = [...state.users, ...action.payload];
        },
        removeAll(state) {
            state.users = []
        },
        addAll(state, action) {
            state.users = action.payload
        }
    },
});

const projectTable = createSlice({
    name: 'projectTable',
    initialState: initialProjectState,
    reducers: {
        addProject(state, action) {
            state.projects.push(action.payload);
        },
        removeProject(state, action) {
            const projectId = action.payload;
            state.projects = state.projects.filter(project => project.projectId !== projectId);
        },
        updateProject(state, action) {
            const updatedProject = action.payload;
            const index = state.projects.findIndex(project => project.projectId === updatedProject.projectId);

            if (index !== -1)
                state.projects[index] = updatedProject;
        },
        load(state, action) {
            state.projects = [...state.projects, ...action.payload];
        },
        removeAll(state) {
            state.projects = []
        },
        addAll(state, action) {
            state.projects = action.payload
        }
    },
});


// actions
const store = configureStore({
    reducer: {
        userTable: userTable.reducer,
        closePopupMenu: closePopupMenu.reducer,
        projectTable: projectTable.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export const userTableActions = userTable.actions;
export const projectTableActions = projectTable.actions;
export const selectedClosePopupMenuActions = closePopupMenu.actions
export default store;