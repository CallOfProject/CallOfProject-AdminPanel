import {createContext, useState} from "react";
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
            isOpenPasswordGenerator, setIsOpenPasswordGenerator
        }}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;