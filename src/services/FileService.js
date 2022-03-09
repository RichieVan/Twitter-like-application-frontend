export default class FileService {
  static async blobToArrayBuffer(blobData) {
    const reader = new FileReader();
    reader.onload = (e) => e.target.result;
    reader.readAsArrayBuffer(blobData);
  }
}
