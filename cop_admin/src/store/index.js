import {configureStore, createSlice} from '@reduxjs/toolkit';


const initialUserState = {users: []}
const initialFolderViewState = {
    folders: [
        /*    new FolderDto(generateUniqueID(), "My Folder", "deneme", Structure.FOLDER),
            new FolderDto(generateUniqueID(), "Common File System", "deneme", Structure.FOLDER),
            new FolderDto(generateUniqueID(), "Private Network Folder", "deneme", Structure.FOLDER),
            new FolderDto(generateUniqueID(), "Team Folder", "deneme", Structure.FOLDER),
            new FolderDto(generateUniqueID(), "Inbox", "deneme", Structure.FOLDER),
            new FolderDto(generateUniqueID(), "My Shares", "deneme", Structure.FOLDER)*/
    ]
}

const initialBreadcrumbs = {breadcrumbs: []}
//const initialCurrentFolderView = {currentFolder: /*new FolderDto(1, 'root', "nurican")*/}
const initialRightClickPosition = {rightClickPosition: {x: 0, y: 0}}
const initialSelectedFileAndFolders = {fileAndFolders: []}
const initialSharedPeople = {sharedPeople: []}


const rightClickMenu = createSlice({
    name: "rightClickMenu",
    initialState: initialRightClickPosition,
    reducers: {
        setXPosition(state, action) {
            state.rightClickPosition.x = action.payload
        },
        setYPosition(state, action) {
            state.rightClickPosition.y = action.payload
        }
    }
})
const closePopupMenu = createSlice({
    name: "closePopupMenu",
    initialState: {popup: false},
    reducers: {
        setClose(state, action) {
            state.popup = action.payload
        },
    }
})
const breadCrumb = createSlice({
    name: "breadcrumbs",
    initialState: initialBreadcrumbs,
    reducers: {
        addBreadCrumb(state, action) {
            state.breadcrumbs.push(action.payload);
        },
        removeBreadCrumb(state, action) {

            const breadCrumbFolderId = action.payload;
            state.breadcrumbs = state.breadcrumbs.filter(bc => bc.id !== breadCrumbFolderId);
        },
        removeAll(state) {
            state.breadcrumbs = []

        },
        addAll(state, action) {
            state.breadcrumbs = action.payload
        }
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


/*const currentFolderView = createSlice({
    name: 'currentFolderView',
    initialState: initialCurrentFolderView,
    reducers: {
        setCurrentFolder(state, action)
        {
            state.currentFolder = action.payload
        },
    },
})*/

const folderView = createSlice({
    name: 'folderView',
    initialState: initialFolderViewState,
    reducers: {
        addFolder(state, action) {
            state.folders.push(action.payload);
        },
        removeFolder(state, action) {
            const folderIdToRemove = action.payload;
            state.folders = state.folders.filter(folder => folder.id !== folderIdToRemove);
        },
        updateFolder(state, action) {
            const updatedFolder = action.payload;
            const index = state.folders.findIndex(folder => folder.id === updatedFolder.id);

            if (index !== -1)
                state.folders[index] = updatedFolder;
        },
        removeAll(state) {
            state.folders = []
        },
        addAll(state, action) {
            state.folders = action.payload
        }
    },
});
const fileAndFolders = createSlice({
    name: 'fileAndFolders',
    initialState: initialSelectedFileAndFolders,
    reducers: {
        addFileOrFolder(state, action) {
            const structure = action.payload
            if (state.fileAndFolders.length !== 0) {
                const foundItem = state.fileAndFolders.find(ff => ff.id === structure.id) // found
                if (foundItem === undefined || foundItem.id !== structure.id)
                    state.fileAndFolders.push(action.payload);

                else state.fileAndFolders = state.fileAndFolders.filter(fileOrFolder => fileOrFolder.id !== structure.id);
            } else state.fileAndFolders.push(action.payload);
        },
        removeFileOrFolder(state, action) {

            const structure = action.payload;

            const foundItem = state.fileAndFolders.find(ff => ff.name === structure.name) // found

            if (foundItem !== null && foundItem.structureType === structure.structureType)
                state.fileAndFolders = state.fileAndFolders.filter(fileOrFolder => fileOrFolder.id !== structure.id);
        },
        removeAll(state) {
            state.fileAndFolders = []
        },
        addAll(state, action) {
            state.fileAndFolders = action.payload
        }
    },
});

const sharedPeople = createSlice({
    name: 'sharedPeople',
    initialState: initialSharedPeople,
    reducers: {
        addSharedPeople(state, action) {
            if (!state.sharedPeople.includes(action.payload))
                state.sharedPeople.push(action.payload);
        },
        removeSharedPeople(state, action) {
            const removedSharedPeople = action.payload;
            state.sharedPeople = state.sharedPeople.filter(sharedPeople => sharedPeople !== removedSharedPeople);
        },

        removeAll(state) {
            if (state.sharedPeople.length !== 0)
                state.sharedPeople = []
        },
        addAll(state, action) {
            state.sharedPeople = []
            state.sharedPeople = action.payload
        }
    },
});
const initialUploadingFiles = {uploadingFiles: []}

const uploadingFiles = createSlice({
    name: 'uploadingFiles',
    initialState: initialUploadingFiles,
    reducers: {
        addFile(state, action) {
            if (!state.uploadingFiles.includes(action.payload))
                state.uploadingFiles.push(action.payload);
        },
        removeSharedPeople(state, action) {
            const removedSharedPeople = action.payload;
            state.uploadingFiles = state.uploadingFiles.filter(sharedPeople => sharedPeople !== removedSharedPeople);
        },

        removeAll(state) {
            state.uploadingFiles = []
        },
        addAll(state, action) {
            state.uploadingFiles = action.payload
        }
    },
})

const store = configureStore({
    reducer: {
        userTable: userTable.reducer,
        folderView: folderView.reducer,
        //currentFolderView: currentFolderView.reducer,
        breadCrumbView: breadCrumb.reducer,
        rightClickMenu: rightClickMenu.reducer,
        fileAndFolders: fileAndFolders.reducer,
        closePopupMenu: closePopupMenu.reducer,
        sharedPeople: sharedPeople.reducer,
        uploadingFiles: uploadingFiles.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});


export const userTableActions = userTable.actions;
export const folderViewActions = folderView.actions;
export const breadCrumbsActions = breadCrumb.actions;
//export const currentFolderActions = currentFolderView.actions;
export const rightClickMenuActions = rightClickMenu.actions;
export const selectedFileAndFolderActions = fileAndFolders.actions
export const selectedClosePopupMenuActions = closePopupMenu.actions

export const sharedPeopleActions = sharedPeople.actions
export const uploadingFilesActions = uploadingFiles.actions

export default store;