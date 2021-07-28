
class UploadAdapter {
  constructor(loader, firebaseContext, onAddedImage) {
    this.loader = loader;
    this.firebaseContext = firebaseContext;
    this.onAddedImage = onAddedImage;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const firebaseContext = this.firebaseContext;

          firebaseContext.addCKEditorImage(file).then((result) => {
            if (result.error) {
              reject(result.error);
            } else if (this.aborted) {
              reject();
              // Delete from storage
            } else {
              this.onAddedImage(file.name);
              resolve(result);
            }
          });
        })
    );
  }

  abort() {
    this.aborted = true;
  }
}

function UploadAdapterPlugin(firebaseContext, onAddedImage, editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new UploadAdapter(loader, firebaseContext, onAddedImage);
  };
}

export default UploadAdapterPlugin;
