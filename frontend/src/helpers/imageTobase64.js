
// This line defines a function named imageToBase64 using the async keyword, indicating that it will return a promise.
const imageTobase64 = async(image) =>{

    // This line creates a new instance of the FileReader object. The FileReader object allows web applications to asynchronously read the contents of files stored on the user's computer.
    const reader = new FileReader()

    // This line initiates the reading of the specified image file (image) as a data URL. When the reading operation is complete, the load event will be triggered.
    reader.readAsDataURL(image)
     
    // This line creates a new Promise instance, which will resolve or reject based on the outcome of the asynchronous operations within it.
    const data = await new Promise((resolve,reject)=>{


        // These lines define event handlers for the load and error events of the FileReader.
        // When the file reading is successful (load event), the resolve function is called with the result of the reading operation (reader.result), which contains the base64-encoded string representing the image data.
        // If an error occurs during reading (error event), the reject function is called with the error object.
         reader.onload = () => resolve(reader.result)

        reader.onerror = error => reject(error)
    })
//    This line returns the promise created inside the function. The function execution will be paused until the promise settles (i.e., until the reading operation completes or encounters an error).
    return data

}

// This line exports the imageToBase64 function as the default export of the module, making it available for use in other parts of the codebase.
export default imageTobase64


// In summary, the imageToBase64 function takes an image file as input, reads it asynchronously using a FileReader, converts it to a base64-encoded string, and returns a promise that resolves with the base64 string when the reading operation is complete.