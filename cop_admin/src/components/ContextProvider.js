import {createContext, useState} from "react";
import {uploadingFilesActions} from "../store";
import {useDispatch} from "react-redux";
export const Context = createContext();
const ContextProvider = props =>
{
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [clickCreateLink, setClickCreateLink] = useState(false)
    const [isUpload, setIsUpload] = useState(false)
    const [conflict, setConflict] = useState(false)
    const [createLink, setCreateLink] = useState(false)
    const [share, setShare] = useState(false)
    const [isClose, setIsClose] = useState(false)
    const [isOpenPasswordGenerator, setIsOpenPasswordGenerator] = useState(false)
    const dispatch = useDispatch();
    const [users, setUsers] = useState([])
    const handleFiles = (event) =>
    {
        const files = event.target.files;

        for (let i = 0; i < files.length; ++i)
            dispatch(uploadingFilesActions.addFile(files[i]))

        setIsUpload(false)
        setConflict(true)
    };
    const handleClickOutside = () =>
    {
        if (isUpload || conflict)
            setShowContextMenu(!(isUpload || conflict));
        else if (share || createLink)
            setShowContextMenu(!(share || createLink));

        document.removeEventListener("click", handleClickOutside);
    }
    return (
        <Context.Provider value={{
            showContextMenu, setShowContextMenu,
            clickCreateLink, setClickCreateLink,
            isUpload, setIsUpload,
            conflict, setConflict,
            createLink, setCreateLink,
            share, setShare,
            users, setUsers,
            isClose, setIsClose,
            isOpenPasswordGenerator, setIsOpenPasswordGenerator,
            handleFiles, handleClickOutside
        }}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;