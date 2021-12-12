export default class FileService {
    static async blobToArrayBuffer (blobData) {
        const reader = new FileReader();
        reader.onload = (e) => {
            return e.target.result; 
        }
        reader.readAsArrayBuffer(blobData);
    }
}
