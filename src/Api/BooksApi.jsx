import axiosInstance from "../Config/AxiosInstance";

export const addBook =async(bookData)=>{
    try {
    
        const response = await axiosInstance.post('/addbook',bookData,{headers:{
            'Content-Type': 'multipart/form-data' 
    }})
        return response
    } catch (error) {
       console.error(error);
        
    }
}

export const books =async()=>{
    try {
        const response = await axiosInstance.get('/books')
        return response
    } catch (error) {
        console.error(error);

    }
}
export const deleteBooks =async(bookId)=>{
    try {
        const response = await axiosInstance.delete(`/deletebook?bookid=${bookId}`)
        return response
        
    } catch (error) {
        console.error(error);
        
    }
}