import axios from "axios";


const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfVVNFUixST0xFX0FETUlOLFJPTEVfUk9PVCIsInN1YiI6ImNvcF9yb290IiwiaWF0IjoxNjk5ODEzODg5LCJleHAiOjE2OTk4MjQ2ODl9.DWlcLIaN5fH4iNDurODLVT76fDmW2ajSIcFgKAaW0Dg";
export const findUsers = async (page) => {
    try {
        const LOGIN_URL = `http://localhost:4141/api/admin/find/all/page?p=${page}`
        const response = await axios.get(LOGIN_URL, {headers: {"Authorization": `Bearer ${token}`}});
        console.log(response)
        return response.data.objects.users
    } catch (error) {
        console.log("error")
    }
}
