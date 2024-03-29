import axios from "axios";
import { API_URL } from "../config";
import { hideLoader, showLoader } from "../reducers/appReducer";
import { addFile, deleteFileAction, setFiles } from "../reducers/fileReducer";

export function getFiles(dirId, sort) {
    return async dispatch => {
        try {
            dispatch(showLoader());
            let url = `${API_URL}/api/files`;
            if(dirId) {
                url = `${API_URL}/api/files?parent=${dirId}`;
            }
            if(sort) {
                url = `${API_URL}/api/files?sort=${sort}`;
            }
            if(dirId && sort) {
                url = `${API_URL}/api/files?parent=${dirId}&sort=${sort}`;
            }
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(setFiles(response.data))
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(hideLoader());
        }
    }
}

export function createDir(dirId, name) {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}/api/files`, {
                name,
                parent: dirId,
                type: "dir"
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(addFile(response.data));
        } catch (error) {
            console.log(error)
        }
    }
}

export function uploadFile(file, fileName, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', fileName);
            if(dirId) {
                formData.append('parent', dirId);
            }
            const response = await axios.post(`${API_URL}/api/files/upload`, formData , {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(addFile(response.data));
        } catch (error) {
            console.log(error)
        }
    }
}

export async function downloadFile(file, iv, key) {
    const response = await fetch(`${API_URL}/api/files/download?id=${file._id}`, { 
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 200) {
        async function decryptblob(encblob, ivdata, exportedkey) {
            let key = await crypto.subtle.importKey(
                "jwk",
                exportedkey,
                { name: "AES-GCM" },
                true,
                ["encrypt", "decrypt"]
            );

            console.log('ivdata', ivdata);
            let iv = new Uint8Array(ivdata.split(','))

            let algorithm = {
                name: "AES-GCM",
                iv: iv
            }

            let data = await encblob.arrayBuffer();

            let decryptedData = await crypto.subtle.decrypt(algorithm, key, data);

            return new Blob([decryptedData]);
        }
        const blob = await response.blob();
        const result = decryptblob(blob, iv, key);
        result.then((value) => {
            const downloadUrl = window.URL.createObjectURL(value);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
    }
}

export function deleteFile(file) {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}/api/files?id=${file._id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(deleteFileAction(file._id));
            alert(response.data.message);
        } catch (error) {
            console.log(error)
        }
    }
}

export function searchFiles(search) {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/api/files/search?search=${search}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(setFiles(response.data));
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(hideLoader());
        }
    }
}